import { createFileRoute } from "@tanstack/react-router";

import AppShell from "@/components/AppShell";
import EraCard from "@/components/EraCard";
import PixelCard from "@/components/PixelCard";
import ProgressBar from "@/components/ProgressBar";
import { eras } from "@/data/eras";
import { XP_PER_LEVEL, usePlayer } from "@/data/player";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Your timeline — TechRoots" },
      {
        name: "description",
        content: "Travel era by era through computing history and level up as you go.",
      },
      { property: "og:title", content: "Your timeline — TechRoots" },
      {
        property: "og:description",
        content: "Travel era by era through computing history and level up as you go.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { player, level, xpIntoLevel, isEraUnlocked } = usePlayer();

  const unlockedCount = eras.filter((era) => isEraUnlocked(era.requiredLevel)).length;

  return (
    <AppShell
      title={`Hi, ${player.username}`}
      subtitle="Pick an era and travel through computing history."
    >
      <PixelCard className="mb-5">
        <p className="font-display text-[12px] leading-relaxed">Level {level}</p>
        <p className="mt-2 text-sm">
          {xpIntoLevel} / {XP_PER_LEVEL} XP to level {level + 1}
        </p>
        <div className="mt-3">
          <ProgressBar value={(xpIntoLevel / XP_PER_LEVEL) * 100} color="pink" />
        </div>
        <p className="mt-3 text-sm text-card-foreground/70">
          {unlockedCount} of {eras.length} eras unlocked
        </p>
      </PixelCard>

      <ul className="flex flex-col gap-4">
        {eras.map((era) => (
          <li key={era.id}>
            <EraCard
              era={era}
              unlocked={isEraUnlocked(era.requiredLevel)}
              completion={player.completion[era.id] ?? 0}
            />
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
