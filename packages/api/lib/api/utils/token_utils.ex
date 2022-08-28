defmodule Api.Utils.TokenUtils do
  alias Api.AccessToken
  alias Api.RefreshToken
  alias Schemas.User

 def create_tokens(user) do
  %{
    accessToken: AccessToken.generate_and_sign!(%{"userId" => user.id}),
    refreshToken: RefreshToken.generate_and_sign!(%{
      "userId" => user.id,
      "tokenVersion" => user.tokenVersion
    })
  }
 end

 def tokens_to_user_id(accessToken, refreshToken) do
  accessToken =  if is_nil(accessToken), do: "", else: accessToken
  refreshToken =  if is_nil(refreshToken), do: "", else: refreshToken

  case AccessToken.verify_and_validate(accessToken) do
    {:ok, claims} ->
      {claims["userId"], nil}
    _ ->
      case RefreshToken.verify_and_validate(refreshToken) do
        {:ok, refreshClaims} ->
          user = User |> Repo.get(refreshClaims["userId"])

          if is_nil(user) or not user.shadowBanned or user.tokenVersion != refreshClaims["refreshToken"] do
            {nil, nil}
          else
            {user.id, create_tokens(user), user}
          end
        _ ->
          {nil, nil}
      end
  end
 end
end
