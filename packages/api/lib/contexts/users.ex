defmodule Contexts.Users do
  @moduledoc """
    Context(Context are dedicated modules that expose and group related functionality.) for Users
    This module acts as a "gateway" module defining
    the "boundary" for Users database access.  Consider Beef.Users.* modules
    to be "private modules".
  """

  # ACCESS FUNCTIONS
  defdelegate get_by_id(user_id), to: Contexts.Access.Users
  defdelegate get_by_username(username), to: Contexts.Access.Users

  # MUTATION FUNCTIONS
  defdelegate bulk_insert(users), to: Contexts.Mutations.Users
  defdelegate set_online(user_id), to: Contexts.Mutations.Users
  defdelegate set_offline(user_id), to: Contexts.Mutations.Users
end
