import { useState } from "react";
import type{ Recipe } from "../types";

interface RecipeCardProps {
  name: string;
  recipe: Recipe;
  onSelect: (name: string) => void;
  onSave: (name: string) => void;
  isSaved: boolean;
}

export default function RecipeCard({ name, recipe, onSelect, onSave, isSaved }: RecipeCardProps) {
  const [hovered, setHovered] = useState(false);

  const minCost = Math.min(
    recipe.walmart.reduce((s, i) => s + i.price, 0),
    recipe.sams.reduce((s, i) => s + i.price, 0)
  );

  return (
    <div
      onClick={() => onSelect(name)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        rounded-2xl overflow-hidden cursor-pointer
        bg-gray-900 border border-white/5
        transition-all duration-200
        ${hovered ? "-translate-y-1 shadow-2xl shadow-black/50" : "shadow-md shadow-black/30"}
      `}
    >
      {/* Hero image area — gradient is arbitrary so we keep inline style */}
      <div
        className="h-40 flex items-center justify-center text-6xl relative"
        style={{ background: recipe.gradient }}
      >
        {/* Badge */}
        {recipe.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
            {recipe.badge}
          </span>
        )}

        {/* Emoji */}
        <span className="drop-shadow-lg">{recipe.emoji}</span>

        {/* Save button */}
        <button
          onClick={e => { e.stopPropagation(); onSave(name); }}
          className={`
            absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
            bg-black/40 border-0 text-base cursor-pointer transition-colors
            ${isSaved ? "text-lime-400" : "text-white hover:text-lime-300"}
          `}
        >
          {isSaved ? "★" : "☆"}
        </button>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Recipe name */}
        <p className="font-semibold text-[15px] text-gray-100 leading-snug mb-1.5">
          {name}
        </p>

        {/* Rating · time · difficulty */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
          <span className="text-amber-400">★</span>
          <span className="text-gray-200 font-semibold">{recipe.rating}</span>
          <span>({(recipe.reviews / 1000).toFixed(1)}k+)</span>
          <span className="text-gray-700">·</span>
          <span>{recipe.time}</span>
          <span className="text-gray-700">·</span>
          <span>{recipe.difficulty}</span>
        </div>

        {/* Tag + price */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-md">
            {recipe.tag}
          </span>
          <span className="text-sm text-lime-400 font-bold">
            from ${minCost.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
