defmodule Api.MixProject do
  use Mix.Project

  def project do
    [
      app: :api,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env()),
      aliases: aliases()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    dev_only_apps = List.wrap(if Mix.env() == :dev, do: :remix)

    [
      mod: {Api, []},
      extra_applications:
        [:logger] ++
          dev_only_apps
    ]
  end

  defp deps do
    [
      {:plug_cowboy, "~> 2.5"},
      {:ecto_sql, "~> 3.0"},
      {:ecto_enum, "~> 1.4"},
      {:jason, "~> 1.2"},
      {:joken, "~> 2.0"},
      {:postgrex, ">= 0.0.0"},
      {:remix, "~> 0.0.1", only: :dev},
      {:timex, "~> 3.6"},
      {:httpoison, "~> 1.8"},
      {:elixir_uuid, "~> 1.2"}
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/_support"]
  defp elixirc_paths(_), do: ["lib"]

  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
