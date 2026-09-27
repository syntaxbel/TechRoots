import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";
import ProgressBar from "@/components/ProgressBar";
import { findEra } from "@/data/eras";
import { usePlayer } from "@/data/player";

export const Route = createFileRoute("/quiz/$eraId")({
  head: () => ({
    meta: [
      { title: "Era quiz — TechRoots" },
      { name: "description", content: "Answer questions about this era to earn XP and Bits." },
      { property: "og:title", content: "Era quiz — TechRoots" },
      {
        property: "og:description",
        content: "Answer questions about this era to earn XP and Bits.",
      },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { eraId } = useParams({ from: "/quiz/$eraId" });
  const navigate = useNavigate();
  const { isEraUnlocked, finishQuiz } = usePlayer();

  const era = findEra(eraId);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  if (!era) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <PixelCard>
          <p className="font-bold">This era does not exist.</p>
          <div className="mt-4">
            <PixelButton onClick={() => navigate({ to: "/home" })}>Back to eras</PixelButton>
          </div>
        </PixelCard>
      </main>
    );
  }

  if (!isEraUnlocked(era.requiredLevel)) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <PixelCard>
          <p className="font-display text-[12px] leading-relaxed">Era locked 🔒</p>
          <p className="mt-3 text-sm">
            Reach level {era.requiredLevel} to open {era.name}. Finish quizzes in your unlocked eras
            to earn more XP.
          </p>
          <div className="mt-4">
            <PixelButton onClick={() => navigate({ to: "/home" })}>Back to eras</PixelButton>
          </div>
        </PixelCard>
      </main>
    );
  }

  const question = era.questions[questionIndex]!;
  const isAnswered = selected !== null;
  const isLast = questionIndex === era.questions.length - 1;

  function handleAnswer(optionIndex: number) {
    if (isAnswered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setCorrectCount((current) => current + 1);
    }
  }

  function handleNext() {
    if (isLast) {
      finishQuiz(era!.id, correctCount, era!.questions.length);
      navigate({ to: "/rewards" });
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelected(null);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-4 py-6">
      <button
        onClick={() => navigate({ to: "/home" })}
        className="mb-4 text-sm font-bold text-muted-foreground"
      >
        ← Leave quiz
      </button>

      <h1 className="font-display text-[13px] leading-relaxed">{era.name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Question {questionIndex + 1} of {era.questions.length}
      </p>

      <div className="mt-3">
        <ProgressBar
          value={(questionIndex / era.questions.length) * 100}
          color={era.accent}
        />
      </div>

      <PixelCard className="mt-5">
        <p className="text-base font-bold">{question.prompt}</p>

        <ul className="mt-4 flex flex-col gap-3">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctIndex;
            const isPicked = index === selected;

            let style = "bg-ivory";
            if (isAnswered && isCorrect) style = "bg-aqua";
            else if (isAnswered && isPicked) style = "bg-destructive/60";

            return (
              <li key={option}>
                <button
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`${style} press min-h-14 w-full rounded-xl border-2 border-ink px-4 py-3 text-left text-sm font-bold text-ink shadow-solid-sm`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>

        {isAnswered ? (
          <div className="mt-4 rounded-xl border-2 border-ink bg-yellow p-3">
            <p className="text-sm font-bold text-ink">
              {selected === question.correctIndex ? "Correct! +20 XP" : "Not this time."}
            </p>
            <p className="mt-1 text-sm text-ink/80">{question.funFact}</p>
          </div>
        ) : null}
      </PixelCard>

      {isAnswered ? (
        <div className="mt-5">
          <PixelButton color="pink" full onClick={handleNext}>
            {isLast ? "See rewards" : "Next question"}
          </PixelButton>
        </div>
      ) : null}
    </main>
  );
}
