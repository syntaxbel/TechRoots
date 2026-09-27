import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "first-quiz",
    name: "Booting Up",
    description: "Finish your first quiz.",
    emoji: "⚡",
    check: (player) => player.quizzesTaken >= 1,
  },
  {
    id: "three-quizzes",
    name: "Time Traveller",
    description: "Finish three quizzes.",
    emoji: "🕰️",
    check: (player) => player.quizzesTaken >= 3,
  },
  {
    id: "ten-correct",
    name: "Sharp Memory",
    description: "Answer 10 questions correctly.",
    emoji: "🧠",
    check: (player) => player.correctAnswers >= 10,
  },
  {
    id: "first-purchase",
    name: "Window Shopper",
    description: "Buy your first shop item.",
    emoji: "🛒",
    check: (player) => player.ownedItems.length >= 1,
  },
  {
    id: "rich-bits",
    name: "Bit Collector",
    description: "Hold 200 Bits at once.",
    emoji: "🪙",
    check: (player) => player.bits >= 200,
  },
  {
    id: "era-master",
    name: "Era Master",
    description: "Complete one era with 100%.",
    emoji: "🏆",
    check: (player) => Object.values(player.completion).some((value) => value === 100),
  },
];
