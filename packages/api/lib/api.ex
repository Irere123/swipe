defmodule Api do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Starts a worker by calling: Api.Worker.start_link(arg)
      # {Api.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Api.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def hello do
    :world
  end
end
