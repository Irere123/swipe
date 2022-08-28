defmodule Router.Routes.DevOnly do
  import Plug.Conn

  # alias Schemas.User
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/test-info" do
    send_resp(conn, 200, "testing")
  end
end
