defmodule Router.SocketHandler do
  @moduledoc """
  Socket Handler
  """

  require Logger

  alias Api.UserSession

  defstruct awaiting_init: true,
            user_id: nil,
            encoding: nil,
            compression: nil,
            callers: []

  @behaviour :cowboy_websocket

  def init(request, _state) do
    props = :cowboy_req.parse_qs(request)

    compression =
      case :proplists.get_value("compression", props) do
        p when p in ["zlib_json", "zlib"] -> :zlib
        _ -> nil
      end

    encoding =
      case :proplists.get_value("encoding", props) do
        "etf" -> :etf
        _ -> :json
      end

    state = %__MODULE__{
      awaiting_init: true,
      user_id: nil,
      encoding: encoding,
      compression: compression,
      callers: get_callers(request)
    }

    {:cowboy_websocket, request, state}
  end

  if Mix.env() == :test do
    defp get_callers(request) do
      request_bin = :cowboy_req.header("user-agent", request)

      List.wrap(
        if is_binary(request_bin) do
          request_bin
          |> Base.decode16!()
          |> :erlang.binary_to_term()
        end
      )
    end
  else
    defp get_callers(_), do: []
  end

  @auth_timeout Application.compile_env(:api, :websocket_auth_timeout)

  def websocket_init(state) do
    Process.send_after(self(), {:finish_awaiting}, @auth_timeout)
    Process.put(:"$callers", state.callers)

    {:ok, state}
  end

  def websocket_info({:finish_awaiting}, state) do
    if state.awaiting_init do
      {:stop, state}
    else
      {:ok, state}
    end
  end

  def websocket_info({:remote_send, message}, state) do
    {:reply, construct_socket_msg(state.encoding, state.compression, message), state}
  end

  # @todo when we swap this to new design change this to 1000
  def websocket_info({:kill}, state) do
    {:reply, {:close, 4003, "killed_by_server"}, state}
  end

  # needed for Task.async not to crash things
  def websocket_info({:EXIT, _, _}, state) do
    {:ok, state}
  end

  def websocket_info({:send_to_linked_session, message}, state) do
    send(state.linked_session, message)
    {:ok, state}
  end

  def websocket_handle({:text, "ping"}, state) do
    {:reply, construct_socket_msg(state.encoding, state.compression, "pong"), state}
  end

  def websocket_handle({:ping, _}, state) do
    {:reply, construct_socket_msg(state.encoding, state.compression, "pong"), state}
  end

  def websocket_handle({:text, json}, state) do
    with {:ok, json} <- Jason.decode(json) do
      case json["op"] do
        "auth" ->
          %{
            "accessToken" => accessToken,
            "refreshToken" => refreshToken
          } = json["d"]

          case Api.Utils.TokenUtils.tokens_to_user_id(accessToken, refreshToken) do
            {nil, nil} ->
              {:reply, {:close, 4001, "invalid_authentication"}, state}

            x ->
              {user_id, tokens, user} =
                case x do
                  {user_id, tokens} ->
                     {user_id, tokens, Contexts.Users.get_by_id(user_id)}
                  y -> y
                end

              if user do
                UserSession.start_supervised(
                  user_id: user_id,
                  username: user.username,
                  avatar_url: user.avatarUrl,
                  display_name: user.displayName
                )

                UserSession.set_pid(user_id, self())

                if tokens do
                  UserSession.new_tokens(user_id, tokens)
                end

                {:reply,
                 construct_socket_msg(state.encoding, state.compression, %{
                   op: "auth-good",
                   d: %{user: user}
                 }), %{state | user_id: user_id, awaiting_init: false}}
              else
                {:reply, {:close, 4001, "invalid_authentication"}, state}
              end
          end

        _ ->
          if not is_nil(state.user_id) do
            try do
              case json do
                %{"op" => op, "d" => d, "fetchId" => fetch_id} ->
                  {:reply,
                   prepare_socket_msg(
                     %{
                       op: "fetch_done",
                       d: f_handler(op, d, state),
                       fetchId: fetch_id
                     },
                     state
                   ), state}

                %{"op" => op, "d" => d} ->
                  handler(op, d, state)
              end
            rescue
              e ->
                err_msg = Exception.message(e)

                IO.inspect(e)
                Logger.error(err_msg)
                Logger.error(Exception.format_stacktrace())
                op = Map.get(json, "op", "")
                IO.puts("error for op: " <> op)

                {:reply,
                 construct_socket_msg(state.encoding, state.compression, %{
                   op: "error",
                   d: err_msg
                 }), state}
            end
          else
            {:reply, {:close, 4004, "not_authenticated"}, state}
          end
      end
    end
  end

  def handler("hello", _, state) do
    %{state: state}
  end

  def f_handler("get_user_profile", %{"username"  => username}, _state) do
    user =  Contexts.Access.Users.get_by_username(username)
    %{user: user}
  end

  def f_handler("edit_profile", %{"data" => data}, state) do
    Api.User.edit_profile(state.user_id, data)
    %{}
  end

  defp construct_socket_msg(encoding, compression, data) do
    data =
      case encoding do
        :etf ->
          data

        _ ->
          data |> Jason.encode!()
      end

    case compression do
      :zlib ->
        z = :zlib.open()
        :zlib.deflateInit(z)

        data = :zlib.deflate(z, data, :finish)

        :zlib.deflateEnd(z)

        {:binary, data}

      _ ->
        {:text, data}
    end
  end

  defp prepare_socket_msg(data, %{compression: compression, encoding: encoding}) do
    data
    |> encode_data(encoding)
    |> compress_data(compression)
  end

  defp encode_data(data, :etf) do
    data
  end

  defp encode_data(data, _encoding) do
    data |> Jason.encode!()
  end

  defp compress_data(data, :zlib) do
    z = :zlib.open()

    :zlib.deflateInit(z)
    data = :zlib.deflate(z, data, :finish)
    :zlib.deflateEnd(z)

    {:binary, data}
  end

  defp compress_data(data, _compression) do
    {:text, data}
  end
end
