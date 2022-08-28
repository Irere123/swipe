defmodule Schemas.User do
  use Ecto.Schema

  import Ecto.Changeset

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
    field(:gender, :string)
    field(:genderToShow, :string)
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

  def edit_changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :bio])
    |> validate_required([:bio, :username])
  end


  defimpl Jason.Encoder do
    @fields ~w(
      id username displayName bio avatarUrl schoolName gender
      birthday class genderToShow location shadowBanned
    )a

    def encode(user, opts) do
      user
      |> Map.take(@fields)
      |> Jason.Encoder.encode(opts)
    end
  end
end
