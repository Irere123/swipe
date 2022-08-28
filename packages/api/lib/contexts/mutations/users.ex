defmodule Contexts.Mutations.Users do
  alias Schemas.User
  alias Contexts.Queries.Users, as: Query

  def edit_profile(user_id, data) do
    user_id
    |> Contexts.Users.get_by_id()
    |> User.edit_changeset(data)
    |> Repo.update()
  end


  def bulk_insert(users) do
    Repo.insert_all(
      User,
      users,
      on_conflict: :nothing
    )
  end

  def set_online(user_id) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_online_true()
    |> Repo.update_all([])
  end

  def set_offline(user_id) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_online_false()
    |> Query.update_set_last_online_to_now()
    |> Repo.update_all([])
  end
end
