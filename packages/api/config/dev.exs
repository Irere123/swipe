import Config


config :logger, level: :info

database_url =
  System.get_env("DATABASE_URL") ||
    "postgres://postgres:postgres@localhost/swipe_repo"


config :api, Repo, url: database_url

config :api,
  web_url: System.get_env("WEB_URL") || "http://localhost:3000",
  api_url: System.get_env("API_URL") || "http://localhost:4000",
  access_token_secret:
    System.get_env("ACCESS_TOKEN_SECRET") ||
      raise("""
      environment variable ACCESS_TOKEN_SECRET is missing.
      type some random characters to create one
      """),
  refresh_token_secret:
    System.get_env("REFRESH_TOKEN_SECRET") ||
      raise("""
      environment variable REFRESH_TOKEN_SECRET is missing.
      type some random characters to create one
      """)


config :joken,
access_token_secret: System.fetch_env!("ACCESS_TOKEN_SECRET"),
refresh_token_secret: System.fetch_env!("REFRESH_TOKEN_SECRET")
