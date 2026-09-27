import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";
import { usePlayer } from "@/data/player";
import { login } from "@/services/api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — TechRoots" },
      { name: "description", content: "Log in to continue your journey through tech history." },
      { property: "og:title", content: "Log in — TechRoots" },
      {
        property: "og:description",
        content: "Log in to continue your journey through tech history.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { setUsername } = usePlayer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      setError("Fill in your e-mail and password.");
      return;
    }

    // Mock login. Later this will call the FastAPI backend.
    const response = login(email, password);
    setUsername(response.username);
    navigate({ to: "/home" });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="font-display text-xl leading-relaxed">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Insert disk to continue 💾</p>
      </div>

      <PixelCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <PixelButton type="submit" color="pink" full>
            Log in
          </PixelButton>
        </form>
      </PixelCard>

      <p className="text-center text-sm text-muted-foreground">
        No account yet?{" "}
        <Link to="/register" className="font-bold text-aqua underline">
          Create one
        </Link>
      </p>
    </main>
  );
}
