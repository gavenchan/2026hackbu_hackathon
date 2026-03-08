import { CATEGORIES } from "../data/recipes";

interface CategoryRowProps {
  active: string;
  onSelect: (label: string) => void;
}

export default function CategoryRow({ active, onSelect }: CategoryRowProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {CATEGORIES.map(cat => {
        const isActive = active === cat.label;
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(cat.label)}
            className={`
              flex flex-col items-center gap-2 px-5 py-3 shrink-0
              bg-transparent border-0 border-b-2 cursor-pointer transition-colors
              ${isActive ? "border-lime-400" : "border-transparent"}
            `}
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-lime-400" : "text-gray-500"}`}>
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
