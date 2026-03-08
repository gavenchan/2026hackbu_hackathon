import { SIDEBAR_LINKS } from "../data/recipes";

interface SidebarProps {
  activeLink: string;
  onLinkClick: (label: string) => void;
}

export default function Sidebar({ activeLink, onLinkClick }: SidebarProps) {
  return (
    <aside className="w-52 shrink-0 border-r border-white/5 py-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      {SIDEBAR_LINKS.map(link => {
        const isActive = activeLink === link.label;
        return (
          <button
            key={link.label}
            onClick={() => onLinkClick(link.label)}
            className={`
              flex items-center gap-3 w-full px-6 py-2.5 text-sm text-left
              border-l-[3px] transition-all cursor-pointer
              ${isActive
                ? "border-lime-400 text-gray-100 font-semibold bg-white/[0.03]"
                : "border-transparent text-gray-500 font-normal hover:text-gray-300 hover:bg-white/[0.02]"
              }
            `}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </button>
        );
      })}
    </aside>
  );
}
