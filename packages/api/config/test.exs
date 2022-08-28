import Config

database_url =
  System.get_env("DATABASE_URL") || "postgres://postgres:postgres@localhost/swipe_repo_test"

config :api, Repo,
  url: database_url,
  pool: Ecto.Adapters.SQL.Sandbox

config :logger, level: :error
