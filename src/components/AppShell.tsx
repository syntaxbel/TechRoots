import type { ReactNode } from "react";

import BottomNav from "@/components/BottomNav";
import StatPill from "@/components/StatPill";
import { usePlayer } from "@/data/player";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showStats?: boolean;
};

// Shared mobile layout: header with player stats, page content, bottom tabs.
export default function AppShell({ title, subtitle, children, showStats = true }: Props) {
  const { player, level } = usePlayer();

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-4 pb-28 pt-6">
      <header className="mb-5">
        <h1 className="font-display text-xl leading-relaxed text-foreground">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
        {showStats ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <StatPill icon="⭐" label="LV" value={level} />
            <StatPill icon="⚡" label="XP" value={player.xp} />
            <StatPill icon="🪙" label="Bits" value={player.bits} />
          </div>
        ) : null}
      </header>

      {children}
      <BottomNav />
    </div>
  );
}
