defmodule Schemas.User do
  use Ecto.Schema

  import Ecto.Changeset

  @derive {Jason.Encoder, ~w(
    id username displayName bio avatarUrl schoolName gender
    birthday class genderToShow location shadowBanned
  )a}
  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:username, :string)
    field(:displayName, :string)
    field(:bio, :string)
    field(:instagramId, :string)
    field(:instagramAccessToken, :string)
    field(:facebookId, :string)
    field(:twitterId, :string)
    field(:twitterAccessToken, :string)
    field(:avatarUrl, :string)
    field(:schoolName, :string)
    field(:class, :string)
    field(:gender, :string)
    field(:birthday, :naive_datetime)
    field(:genderToShow, :map)
    field(:location, :string)
    field(:lastOnline, :utc_datetime_usec)
    field(:online, :boolean)
    field(:tokenVersion, :integer, default: 1)
    field(:shadowBanned, :boolean, default: false)

    timestamps()
  end

  def insert_changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :displayName, :avatarUrl])
    |> validate_length(:username, min: 6, max: 50)
    |> validate_required([:username, :avatarUrl, :bio])
  end
end
