defmodule Api.RefreshToken do
  use Joken.Config,
    default_signer: Joken.Signer.create("HS256", Application.get_env(:api, :refresh_token_secret))

  # 30 days
  def token_config, do: default_claims(default_exp: 60 * 60 * 24 * 30)
end
