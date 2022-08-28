defmodule Repo.Migrations.Users do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";", "")

    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :username, :text, null: false
      add :displayName, :text, null: false
      add :schoolName, :text, null: false
      add :gender, :text, null: false
      add :genderToShow, :text, null: false
      add :bio, :text, null: false
      add :avatarUrl, :text, null: false
      add :location, :text, default: ""
      add :lastOnline, :naive_datetime
      add :online, :boolean, default: false
      add :tokenVersion, :integer, default: 1
      add :shadowBanned, :boolean, default: false
      add :instagramId, :text, null: true
      add :instagramAccessToken, :text, null: true
      add :facebookId, :text, null: true
      add :twitterId, :text, null: true
      add :twitterAccessToken, :text, null: true

      timestamps()
    end
  end
end
