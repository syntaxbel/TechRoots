import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import PixelButton from "@/components/PixelButton";

export const Route = createFileRoute("/")({
  component: SplashPage,
});

// Splash screen: shows the logo for a moment, then goes to Login.
function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate({ to: "/login" }), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="grid h-28 w-28 place-items-center rounded-3xl border-2 border-ink bg-ivory text-5xl shadow-solid">
        🌱
      </div>
      <h1 className="font-display text-2xl leading-relaxed">TechRoots</h1>
      <p className="max-w-xs text-sm text-muted-foreground">
        Travel through the history of technology, one era at a time.
      </p>
      <div className="flex gap-2 text-2xl" aria-hidden="true">
        <span>💾</span>
        <span>🖥️</span>
        <span>🕹️</span>
        <span>📱</span>
      </div>
      <PixelButton color="yellow" onClick={() => navigate({ to: "/login" })}>
        Press Start
      </PixelButton>
    </main>
  );
}
