// All the shapes used across TechRoots. Keeping them in one file makes the
// project easy to read for beginners.

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  funFact: string;
};

export type Era = {
  id: string;
  name: string;
  years: string;
  icon: string; // pixel-ish emoji used as icon
  description: string;
  requiredLevel: number;
  collectibles: number;
  accent: "pink" | "aqua" | "yellow" | "orange";
  questions: Question[];
};

export type ShopItem = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  kind: "avatar" | "frame" | "title";
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  // how we check if the player unlocked it
  check: (player: Player) => boolean;
};

export type Player = {
  username: string;
  avatar: string;
  xp: number;
  bits: number;
  // era id -> percentage completed (0 - 100)
  completion: Record<string, number>;
  ownedItems: string[];
  quizzesTaken: number;
  correctAnswers: number;
};

export type QuizResult = {
  eraId: string;
  eraName: string;
  correct: number;
  total: number;
  xpEarned: number;
  bitsEarned: number;
};
