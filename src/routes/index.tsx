import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import logo from "../assets/LOGO_TECHROOTS_PNG.png";

import PixelButton from "@/components/PixelButton";

export const Route = createFileRoute("/")({
  component: SplashPage,
});

function SplashPage() {
  const navigate = useNavigate();


  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="grid h-28 w-28 place-items-center rounded-3xl text-5xl box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);">
        <img src={logo} alt="TechRoots Logo" className="h-24 w-26" />
      </div>
      <h1 className="font-display text-2xl leading-relaxed">TechRoots</h1>
      <p className="max-w-xs text-sm text-muted-foreground">
        Uma visão dinamica sobre a história da tecnologia.
      </p>
      <div className="flex gap-2 text-2xl" aria-hidden="true">
        <span>💾</span>
        <span>🖥️</span>
        <span>🕹️</span>
        <span>📱</span>
      </div>
      <PixelButton color="yellow" onClick={() => navigate({ to: "/home" })}>
        Press Start
      </PixelButton>
    </main>
  );
}
