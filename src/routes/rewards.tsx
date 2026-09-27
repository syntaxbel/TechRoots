import { createFileRoute, useNavigate } from "@tanstack/react-router";

import AppShell from "@/components/AppShell";
import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";
import ProgressBar from "@/components/ProgressBar";
import { eras } from "@/data/eras";
import { usePlayer } from "@/data/player";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — TechRoots" },
      { name: "description", content: "See the XP and Bits you earned in each era." },
      { property: "og:title", content: "Rewards — TechRoots" },
      { property: "og:description", content: "See the XP and Bits you earned in each era." },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const navigate = useNavigate();
  const { player, lastResult } = usePlayer();

  const playedEras = eras.filter((era) => player.completion[era.id] !== undefined);

  return (
    <AppShell title="Rewards" subtitle="Everything you collected so far.">
      {lastResult ? (
        <PixelCard className="mb-5 bg-yellow">
          <p className="font-display text-[12px] leading-relaxed">Quiz complete!</p>
          <p className="mt-3 text-sm font-bold">{lastResult.eraName}</p>
          <p className="mt-1 text-sm">
            {lastResult.correct} / {lastResult.total} correct answers
          </p>
          <div className="mt-3 flex gap-2 text-sm font-bold">
            <span className="rounded-full border-2 border-ink bg-ivory px-3 py-1">
              ⚡ +{lastResult.xpEarned} XP
            </span>
            <span className="rounded-full border-2 border-ink bg-ivory px-3 py-1">
              🪙 +{lastResult.bitsEarned} Bits
            </span>
          </div>
          <div className="mt-4">
            <PixelButton color="pink" onClick={() => navigate({ to: "/shop" })}>
              Spend Bits
            </PixelButton>
          </div>
        </PixelCard>
      ) : (
        <PixelCard className="mb-5">
          <p className="text-sm">
            No rewards yet. Finish a quiz in any unlocked era to earn XP and Bits.
          </p>
          <div className="mt-4">
            <PixelButton color="aqua" onClick={() => navigate({ to: "/home" })}>
              Choose an era
            </PixelButton>
          </div>
        </PixelCard>
      )}

      <h2 className="mb-3 font-display text-[12px] leading-relaxed">Era results</h2>

      {playedEras.length === 0 ? (
        <p className="text-sm text-muted-foreground">Your finished eras will appear here.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {playedEras.map((era) => (
            <li key={era.id}>
              <PixelCard>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold">
                    <span aria-hidden="true">{era.icon}</span> {era.name}
                  </p>
                  <span className="rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold">
                    {player.completion[era.id]}%
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={player.completion[era.id] ?? 0} color={era.accent} />
                </div>
              </PixelCard>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
