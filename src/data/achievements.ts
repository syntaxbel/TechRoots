import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "first-quiz",
    name: "Inicializando...",
    description: "Termine seu primeiro quiz.",
    emoji: "⚡",
    check: (player) => player.quizzesTaken >= 1,
  },
  {
    id: "three-quizzes",
    name: "Viajante do Tempo de Processamento",
    description: "Termine três quizzes.",
    emoji: "🕰️",
    check: (player) => player.quizzesTaken >= 3,
  },
  {
    id: "ten-correct",
    name: "Latência Zero",
    description: "Responda 10 perguntas corretamente.",
    emoji: "🧠",
    check: (player) => player.correctAnswers >= 10,
  },
  {
    id: "first-purchase",
    name: "Vitrine.exe",
    description: "Compre seu primeiro item da loja.",
    emoji: "🛒",
    check: (player) => player.ownedItems.length >= 1,
  },
  {
    id: "rich-bits",
    name: "Colecionador de Bits",
    description: "Guarde 200 Bits ao mesmo tempo.",
    emoji: "🪙",
    check: (player) => player.bits >= 200,
  },
  {
    id: "era-master",
    name: "Mestre das Eras",
    description: "Complete uma era com 100%.",
    emoji: "🏆",
    check: (player) => Object.values(player.completion).some((value) => value === 100),
  },
];
