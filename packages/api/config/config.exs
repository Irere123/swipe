import Config

config :api, websocket_auth_timeout: 10_000
config :api, ecto_repos: [Repo]

import_config("#{Mix.env()}.exs")
