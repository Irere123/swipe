defmodule Contexts.Access.Users do
  alias Contexts.Queries.Users, as: Query

  def get_by_id(user_id) do
    Repo.get(User, user_id)
  end

  def get_by_username(username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> Repo.one()
  end
end
