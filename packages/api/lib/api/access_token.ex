defmodule Api.AccessToken do
  use Joken.Config,
    default_signer: Joken.Signer.create("HS256", Application.get_env(:api, :access_token_secret))

  # 1 hour
  def token_config, do: default_claims(default_exp: 60 * 60)
end
