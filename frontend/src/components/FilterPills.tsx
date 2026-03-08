import { FILTERS } from "../data/recipes";

interface FilterPillsProps {
  active: string | null;
  onSelect: (filter: string | null) => void;
}

export default function FilterPills({ active, onSelect }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(f => {
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onSelect(isActive ? null : f)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-all
              ${isActive
                ? "bg-lime-400 text-gray-900 border border-lime-400"
                : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-200"
              }
            `}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
