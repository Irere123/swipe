defmodule Router.Routes.DevOnly do
  import Plug.Conn

  alias Schemas.User
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/test-info" do
    env = Application.fetch_env!(:api, :env)

    if env do
      username = fetch_query_params(conn).query_params["username"]
      user = Contexts.Users.get_by_username(username)

      conn
      |> put_resp_content_type("application/json")
      |> send_resp(
        200,
        Jason.encode!(
          Api.Utils.TokenUtils.create_tokens(
            if is_nil(user),
              do:
                Repo.insert!(
                  %User{
                    username: username,
                    facebookId: "id:" <> username,
                    displayName: String.capitalize(username),
                    gender: "Male",
                    genderToShow: "Male",
                    schoolName: "Elixir",
                    location: "Musanze, Rwanda",
                    avatarUrl: "https://placekitten.com/200/200",
                    bio:
                      "This is some interesting info about the ex-founder of nothing, welcome to the bio of such a cool person!"
                  },
                  returning: true
                ),
              else: user
          )
        )
      )
    else
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(400, Jason.encode!(%{"error" => "no"}))
    end
  end
end
