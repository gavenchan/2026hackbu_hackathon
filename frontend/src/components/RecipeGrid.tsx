import RecipeCard from "./RecipeCard";
import type { Recipe } from "../types";

interface RecipeGridProps {
  title: string;
  recipes: [string, Recipe][];
  onSelect: (name: string) => void;
  onSave: (name: string) => void;
  savedRecipes: string[];
}

export default function RecipeGrid({ title, recipes, onSelect, onSave, savedRecipes }: RecipeGridProps) {
  if (recipes.length === 0) return null;

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-100">{title}</h2>
        <button className="text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors cursor-pointer bg-transparent border-0">
          See all →
        </button>
      </div>

      {/* Responsive card grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
        {recipes.map(([name, recipe]) => (
          <RecipeCard
            key={name}
            name={name}
            recipe={recipe}
            onSelect={onSelect}
            onSave={onSave}
            isSaved={savedRecipes.includes(name)}
          />
        ))}
      </div>
    </section>
  );
}
