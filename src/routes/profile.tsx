import { createFileRoute, useNavigate } from "@tanstack/react-router";

import AppShell from "@/components/AppShell";
import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";
import ProgressBar from "@/components/ProgressBar";
import { achievements } from "@/data/achievements";
import { eras } from "@/data/eras";
import { XP_PER_LEVEL, unlockedEraNames, usePlayer } from "@/data/player";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — TechRoots" },
      { name: "description", content: "Your level, XP, Bits, badges and unlocked eras." },
      { property: "og:title", content: "Profile — TechRoots" },
      { property: "og:description", content: "Seu nível, XP, Bits, medalhas e eras desbloqueadas." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { player, level, xpIntoLevel, unlockedAchievements } = usePlayer();

  const unlocked = unlockedEraNames(level);
  const accuracy =
    player.quizzesTaken === 0
      ? 0
      : Math.round((player.correctAnswers / (player.quizzesTaken * 3)) * 100);

  return (
    <AppShell title="Perfil" subtitle="Sua jornada até agora." showStats={false}>
      <PixelCard className="mb-4">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-ink bg-pink text-3xl">
            {player.avatar}
          </span>
          <div>
            <p className="font-display text-[13px] leading-relaxed">{player.username}</p>
            <p className="mt-2 text-sm font-bold">Level {level}</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar
            value={(xpIntoLevel / XP_PER_LEVEL) * 100}
            color="aqua"
            label={`${xpIntoLevel} / ${XP_PER_LEVEL} XP`}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold">
          <p className="rounded-xl border-2 border-ink bg-ivory px-3 py-2">⚡ {player.xp} XP</p>
          <p className="rounded-xl border-2 border-ink bg-ivory px-3 py-2">🪙 {player.bits} Bits</p>
        </div>
      </PixelCard>

      <PixelCard className="mb-4">
        <h2 className="font-display text-[12px] leading-relaxed">Estatísticas</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li>Quizzes finalizados: {player.quizzesTaken}</li>
          <li>Respostas corretas: {player.correctAnswers}</li>
          <li>Acurácia: {accuracy}%</li>
          <li>
            Eras desbloqueadas: {unlocked.length} / {eras.length}
          </li>
          <li>Items comprados: {player.ownedItems.length}</li>
        </ul>
      </PixelCard>

      <PixelCard className="mb-4">
        <h2 className="font-display text-[12px] leading-relaxed">Eras desbloqueadas</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {unlocked.map((name) => (
            <li
              key={name}
              className="rounded-full border-2 border-ink bg-aqua px-3 py-1 text-xs font-bold"
            >
              {name}
            </li>
          ))}
        </ul>
      </PixelCard>

      <PixelCard className="mb-5">
        <h2 className="font-display text-[12px] leading-relaxed">
          Medalhas ({unlockedAchievements.length}/{achievements.length})
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2 text-2xl">
          {achievements.map((achievement) => (
            <li
              key={achievement.id}
              title={achievement.name}
              className={`grid h-12 w-12 place-items-center rounded-xl border-2 border-ink ${
                unlockedAchievements.includes(achievement.id) ? "bg-yellow" : "bg-muted/20"
              }`}
            >
              {unlockedAchievements.includes(achievement.id) ? achievement.emoji : "🔒"}
            </li>
          ))}
        </ul>
      </PixelCard>

    </AppShell>
  );
}
