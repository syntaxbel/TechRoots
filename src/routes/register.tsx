import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";
import { usePlayer } from "@/data/player";
import { register } from "@/services/api";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — TechRoots" },
      { name: "description", content: "Create your TechRoots player and start earning XP." },
      { property: "og:title", content: "Create account — TechRoots" },
      {
        property: "og:description",
        content: "Create your TechRoots player and start earning XP.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { setUsername } = usePlayer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in every field.");
      return;
    }

    // Mock register. Later this will call the FastAPI backend.
    const response = register(name, email, password);
    setUsername(response.username);
    navigate({ to: "/home" });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="font-display text-xl leading-relaxed">New player</h1>
        <p className="mt-2 text-sm text-muted-foreground">Choose your handle and boot up 🖥️</p>
      </div>

      <PixelCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-bold">
            Username
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="pixelpioneer"
              className="mt-1 min-h-12 w-full rounded-xl border-2 border-ink bg-ivory px-3 text-base font-medium outline-none focus:shadow-solid-sm"
            />
          </label>

          <label className="text-sm font-bold">
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@retro.net"
              className="mt-1 min-h-12 w-full rounded-xl border-2 border-ink bg-ivory px-3 text-base font-medium outline-none focus:shadow-solid-sm"
            />
          </label>

          <label className="text-sm font-bold">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="mt-1 min-h-12 w-full rounded-xl border-2 border-ink bg-ivory px-3 text-base font-medium outline-none focus:shadow-solid-sm"
            />
          </label>

          {error ? <p className="text-sm font-bold text-destructive">{error}</p> : null}

          <PixelButton type="submit" color="aqua" full>
            Create account
          </PixelButton>
        </form>
      </PixelCard>

      <p className="text-center text-sm text-muted-foreground">
        Already a player?{" "}
        <Link to="/login" className="font-bold text-yellow underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
