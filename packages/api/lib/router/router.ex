defmodule Router do
  @moduledoc """
   These are are routes which don't use websocket instead use http
  """
  use Plug.Router

  alias Router.Routes.DevOnly

  plug(Plug.Parsers, parsers: [:json], json_decoder: Jason)
  plug(Router.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end

  forward("/dev", to: DevOnly)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
