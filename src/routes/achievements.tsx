import { createFileRoute } from "@tanstack/react-router";

import AppShell from "@/components/AppShell";
import PixelCard from "@/components/PixelCard";
import { achievements } from "@/data/achievements";
import { usePlayer } from "@/data/player";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — TechRoots" },
      { name: "description", content: "Collect retro badges as you master each era." },
      { property: "og:title", content: "Achievements — TechRoots" },
      { property: "og:description", content: "Collect retro badges as you master each era." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const { unlockedAchievements } = usePlayer();

  return (
    <AppShell
      title="Badges"
      subtitle={`${unlockedAchievements.length} of ${achievements.length} unlocked`}
    >
      <ul className="flex flex-col gap-3">
        {achievements.map((achievement) => {
          const unlocked = unlockedAchievements.includes(achievement.id);

          return (
            <li key={achievement.id}>
              <PixelCard className={unlocked ? "" : "opacity-70"}>
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink text-2xl ${
                      unlocked ? "bg-yellow" : "bg-muted/20"
                    }`}
                    aria-hidden="true"
                  >
                    {unlocked ? achievement.emoji : "🔒"}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{achievement.name}</p>
                    <p className="mt-1 text-sm text-card-foreground/70">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </PixelCard>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
