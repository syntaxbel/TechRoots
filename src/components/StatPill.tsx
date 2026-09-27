type Props = {
  icon: string;
  label: string;
  value: string | number;
};

export default function StatPill({ icon, label, value }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-full border-2 border-ink bg-ivory px-3 py-1.5 shadow-solid-sm">
      <span aria-hidden="true">{icon}</span>
      <span className="text-sm font-bold text-ink">
        {value} <span className="font-medium text-ink/60">{label}</span>
      </span>
    </div>
  );
}
