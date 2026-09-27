type Props = {
  value: number; // 0 - 100
  color?: "pink" | "aqua" | "yellow" | "orange";
  label?: string;
};

const colors = {
  pink: "bg-pink",
  aqua: "bg-aqua",
  yellow: "bg-yellow",
  orange: "bg-orange",
};

export default function ProgressBar({ value, color = "aqua", label }: Props) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label ? (
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-card-foreground/70">
          {label}
        </p>
      ) : null}
      <div className="h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-purple-deep/20">
        <div
          className={`h-full ${colors[color]} transition-all duration-500`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
