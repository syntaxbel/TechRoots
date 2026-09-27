// All future backend calls live here. For now every function returns mock data.
// Later these bodies will be replaced by fetch() calls to a FastAPI REST API.

import { eras } from "@/data/eras";
import type { Player, QuizResult } from "@/types";

export function login(email: string, _password: string) {
  return {
    ok: true,
    token: "mock-token",
    username: email.split("@")[0] || "player",
  };
}

export function register(username: string, _email: string, _password: string) {
  return { ok: true, token: "mock-token", username };
}

export function getProfile(): Player {
  return {
    username: "player",
    avatar: "👾",
    xp: 0,
    bits: 60,
    completion: {},
    ownedItems: [],
    quizzesTaken: 0,
    correctAnswers: 0,
  };
}

export function getProgress() {
  return eras.map((era) => ({ eraId: era.id, completion: 0 }));
}

// Turns raw answers into XP and Bits. 20 XP and 8 Bits per correct answer.
export function submitQuiz(eraId: string, correct: number, total: number): QuizResult {
  const era = eras.find((item) => item.id === eraId);
  return {
    eraId,
    eraName: era ? era.name : "Unknown era",
    correct,
    total,
    xpEarned: correct * 20,
    bitsEarned: correct * 8,
  };
}

export function buyItem(itemId: string, price: number, bits: number) {
  if (bits < price) {
    return { ok: false, message: "Not enough Bits yet." };
  }
  return { ok: true, message: `Item ${itemId} unlocked!` };
}
