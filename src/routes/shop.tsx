import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import AppShell from "@/components/AppShell";
import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";
import { usePlayer } from "@/data/player";
import { shopItems } from "@/data/shopItems";
import type { ShopItem } from "@/types";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — TechRoots" },
      { name: "description", content: "Spend your Bits on retro avatars, frames and titles." },
      { property: "og:title", content: "Shop — TechRoots" },
      {
        property: "og:description",
        content: "Spend your Bits on retro avatars, frames and titles.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { player, purchase, setAvatar } = usePlayer();
  const [message, setMessage] = useState("");

  function handleBuy(item: ShopItem) {
    const response = purchase(item.id, item.price);
    setMessage(response);
  }

  return (
    <AppShell title="Bit Shop" subtitle="Cosmetic items only — no real money here.">
      {message ? (
        <PixelCard className="mb-4 bg-aqua">
          <p className="text-sm font-bold">{message}</p>
        </PixelCard>
      ) : null}

      <ul className="grid grid-cols-2 gap-3">
        {shopItems.map((item) => {
          const owned = player.ownedItems.includes(item.id);
          const affordable = player.bits >= item.price;

          return (
            <li key={item.id}>
              <PixelCard className="flex h-full flex-col items-center text-center">
                <span className="text-3xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <p className="mt-2 text-sm font-bold">{item.name}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-card-foreground/60">
                  {item.kind}
                </p>
                <p className="mt-2 text-sm font-bold">🪙 {item.price}</p>

                <div className="mt-3 w-full">
                  {owned ? (
                    item.kind === "avatar" ? (
                      <PixelButton color="yellow" full onClick={() => setAvatar(item.emoji)}>
                        Use
                      </PixelButton>
                    ) : (
                      <p className="text-sm font-bold text-card-foreground/70">Owned ✓</p>
                    )
                  ) : (
                    <PixelButton
                      color={affordable ? "pink" : "ivory"}
                      full
                      disabled={!affordable}
                      onClick={() => handleBuy(item)}
                    >
                      {affordable ? "Buy" : "Need Bits"}
                    </PixelButton>
                  )}
                </div>
              </PixelCard>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
