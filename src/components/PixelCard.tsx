import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// Ivory rounded card with a dark outline and a solid shadow.
export default function PixelCard({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border-2 border-ink bg-card p-4 text-card-foreground shadow-solid ${className}`}
    >
      {children}
    </div>
  );
}
