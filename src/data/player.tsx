// The whole progression system lives here: XP, level, Bits and era completion.
// A single small Context is used so every screen can read the same player.

import { createContext, useContext, useState, type ReactNode } from "react";

import { achievements } from "@/data/achievements";
import { eras } from "@/data/eras";
import { buyItem, getProfile, submitQuiz } from "@/services/api";
import type { Player, QuizResult } from "@/types";

export const XP_PER_LEVEL = 100;

export function levelFromXp(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

type PlayerContextValue = {
  player: Player;
  level: number;
  xpIntoLevel: number;
  lastResult: QuizResult | null;
  isEraUnlocked: (requiredLevel: number) => boolean;
  finishQuiz: (eraId: string, correct: number, total: number) => QuizResult;
  purchase: (itemId: string, price: number) => string;
  setUsername: (name: string) => void;
  setAvatar: (emoji: string) => void;
  unlockedAchievements: string[];
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player>(getProfile);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  const level = levelFromXp(player.xp);
  const xpIntoLevel = player.xp % XP_PER_LEVEL;

  function isEraUnlocked(requiredLevel: number) {
    return level >= requiredLevel;
  }

  function finishQuiz(eraId: string, correct: number, total: number) {
    const result = submitQuiz(eraId, correct, total);
    const percentage = Math.round((correct / total) * 100);

    setPlayer((current) => ({
      ...current,
      xp: current.xp + result.xpEarned,
      bits: current.bits + result.bitsEarned,
      quizzesTaken: current.quizzesTaken + 1,
      correctAnswers: current.correctAnswers + correct,
      completion: {
        ...current.completion,
        // keep the best score for the era
        [eraId]: Math.max(current.completion[eraId] ?? 0, percentage),
      },
    }));

    setLastResult(result);
    return result;
  }

  function purchase(itemId: string, price: number) {
    const response = buyItem(itemId, price, player.bits);
    if (!response.ok) return response.message;

    setPlayer((current) => ({
      ...current,
      bits: current.bits - price,
      ownedItems: [...current.ownedItems, itemId],
    }));
    return response.message;
  }

  function setUsername(name: string) {
    setPlayer((current) => ({ ...current, username: name }));
  }

  function setAvatar(emoji: string) {
    setPlayer((current) => ({ ...current, avatar: emoji }));
  }

  const unlockedAchievements = achievements
    .filter((achievement) => achievement.check(player))
    .map((achievement) => achievement.id);

  return (
    <PlayerContext.Provider
      value={{
        player,
        level,
        xpIntoLevel,
        lastResult,
        isEraUnlocked,
        finishQuiz,
        purchase,
        setUsername,
        setAvatar,
        unlockedAchievements,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}

// Handy for the profile screen.
export function unlockedEraNames(level: number) {
  return eras.filter((era) => era.requiredLevel <= level).map((era) => era.name);
}
