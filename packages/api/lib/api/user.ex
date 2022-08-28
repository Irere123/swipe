defmodule Api.User do
  alias Contexts.Users

  def edit_profile(user_id, data) do
    case Users.edit_profile(user_id, data) do
      {:error, %Ecto.Changeset{errors: [{_, {"has already been taken", _}}]}} ->
        :username_taken

      {:ok, %{displayName: displayName, username: username, avatarUrl: avatarUrl}} ->
        Api.UserSession.set_state(
          user_id,
          %{display_name: displayName, username: username, avatar_url: avatarUrl}
        )

        :ok

      _ ->
        :ok
    end
  end
end
