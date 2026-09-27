import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  color?: "pink" | "aqua" | "yellow" | "orange" | "ivory";
  disabled?: boolean;
  full?: boolean;
};

const colors = {
  pink: "bg-pink",
  aqua: "bg-aqua",
  yellow: "bg-yellow",
  orange: "bg-orange",
  ivory: "bg-ivory",
};

export default function PixelButton({
  children,
  onClick,
  type = "button",
  color = "pink",
  disabled = false,
  full = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${colors[color]} ${full ? "w-full" : ""} press shadow-solid min-h-14 rounded-xl border-2 border-ink px-5 py-3 text-base font-bold text-ink disabled:opacity-50 disabled:shadow-solid-sm`}
    >
      {children}
    </button>
  );
}
