defmodule Schemas.User do
  use Ecto.Schema

  import Ecto.Changeset

  @derive {Jason.Encoder, ~w(
    id username displayName bio avatarUrl schoolName gender
    birthday class
  )a}
  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:username, :string)
    field(:displayName, :string)
    field(:bio, :string)
    field(:avatarUrl, :string)
    field(:schoolName, :string)
    field(:class, :string)
    field(:gender, :string)
    field(:birthday, :naive_datetime)
  end

  def insert_changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :displayName, :avatarUrl])
    |> validate_length(:username, min: 6, max: 50)
    |> validate_required([:username, :avatarUrl, :bio])
  end
end
