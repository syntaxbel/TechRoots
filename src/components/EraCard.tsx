import { Link } from "@tanstack/react-router";

import PixelCard from "@/components/PixelCard";
import ProgressBar from "@/components/ProgressBar";
import type { Era } from "@/types";

type Props = {
  era: Era;
  unlocked: boolean;
  completion: number;
};

export default function EraCard({ era, unlocked, completion }: Props) {
  const content = (
    <PixelCard className={unlocked ? "" : "opacity-70"}>
      <div className="flex items-start gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink text-2xl"
          style={{ backgroundColor: `var(--${era.accent})` }}
          aria-hidden="true"
        >
          {unlocked ? era.icon : "🔒"}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-[13px] leading-snug">{era.name}</h2>
            <span className="shrink-0 rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold">
              {unlocked ? `${completion}%` : `LV ${era.requiredLevel}`}
            </span>
          </div>
          <p className="mt-1 text-xs text-card-foreground/70">{era.years}</p>
          <p className="mt-2 text-sm">{era.description}</p>

          <div className="mt-3">
            <ProgressBar value={unlocked ? completion : 0} color={era.accent} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
            <span className="rounded-full border-2 border-ink bg-ivory px-2 py-0.5">
              💎 {era.collectibles} collectibles
            </span>
            <span className="rounded-full border-2 border-ink bg-ivory px-2 py-0.5">
              ⚡ up to {era.questions.length * 20} XP
            </span>
          </div>

          {unlocked ? (
            <p className="mt-3 text-sm font-bold text-ink">Tap to start the quiz →</p>
          ) : (
            <p className="mt-3 text-sm font-medium text-card-foreground/70">
              Reach level {era.requiredLevel} to unlock this era. Earn XP in the eras you already
              have!
            </p>
          )}
        </div>
      </div>
    </PixelCard>
  );

  if (!unlocked) {
    // Locked eras are not links, so navigation is blocked.
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link to="/quiz/$eraId" params={{ eraId: era.id }} className="press block">
      {content}
    </Link>
  );
}
