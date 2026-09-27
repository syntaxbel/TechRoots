import { Link } from "@tanstack/react-router";

const tabs = [
  { to: "/home", label: "Eras", icon: "🗺️" },
  { to: "/rewards", label: "Rewards", icon: "🎁" },
  { to: "/shop", label: "Shop", icon: "🛍️" },
  { to: "/achievements", label: "Badges", icon: "🏅" },
  { to: "/profile", label: "Profile", icon: "🙂" },
] as const;

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-2 border-ink bg-ivory">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {tabs.map((tab) => (
          <li key={tab.to} className="flex-1">
            <Link
              to={tab.to}
              className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-ink/60"
              activeProps={{ className: "bg-yellow border-2 border-ink text-ink font-bold" }}
            >
              <span className="text-lg" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="text-[11px]">{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
