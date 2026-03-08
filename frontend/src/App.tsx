import { useState } from "react";
import { RECIPES } from "./data/recipes";
import Navbar from "./components/Navbar";
import CategoryRow from "./components/CategoryRow";
import FilterPills from "./components/FilterPills";
import RecipeGrid from "./components/RecipeGrid";
import DetailPanel from "./components/DetailPanel";

export default function App() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [query,          setQuery]          = useState("");
  const [selected,       setSelected]       = useState<string | null>(null);
  const [saved,          setSaved]          = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter,   setActiveFilter]   = useState<string | null>(null);
  const [activeSideLink, setActiveSideLink] = useState("Home");

  // ── Helpers ───────────────────────────────────────────────────────────────
  const toggleSave = (name: string) =>
    setSaved(p => p.includes(name) ? p.filter(r => r !== name) : [...p, name]);

  // ── Filtered list (search + category + filter pill) ───────────────────────
  const filtered = Object.entries(RECIPES).filter(([name, r]) => {
    const matchQ   = !query || name.toLowerCase().includes(query.toLowerCase());
    const matchCat =
      activeCategory === "All"
      || r.tag === activeCategory
      || (activeCategory === "Quick" && parseInt(r.time) <= 20)
      || (activeCategory === "Vegan" && r.ingredients.some(i => i.swaps["Vegan"]));
    const matchF   =
      !activeFilter
      || (activeFilter === "Under 30 min" && parseInt(r.time) < 30)
      || (activeFilter === "Top Rated"    && r.rating >= 4.8)
      || (activeFilter === "Easy"         && r.difficulty === "Easy");
    return matchQ && matchCat && matchF;
  });

  // ── Pre-sorted section lists ──────────────────────────────────────────────
  const topRated   = [...Object.entries(RECIPES)].sort(([, a], [, b]) => b.rating - a.rating);
  const quickMeals = Object.entries(RECIPES).filter(([, r]) => parseInt(r.time) <= 20);
  const budgetPicks = [...Object.entries(RECIPES)].sort(([, a], [, b]) => {
    const minA = Math.min(...a.walmart.map(i => i.price), ...a.sams.map(i => i.price));
    const minB = Math.min(...b.walmart.map(i => i.price), ...b.sams.map(i => i.price));
    return minA - minB;
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">

      {/* Top nav */}
      <Navbar
        query={query}
        onQueryChange={setQuery}
        savedCount={saved.length}
      />

      {/* Body: sidebar + main + optional detail panel */}
      <div className="flex flex-1">

        {/* Main content */}
        <main className="flex-1 min-w-0 px-8 py-7 overflow-y-auto h-[calc(100vh-3.5rem)]">

          {/* Category row */}
          <CategoryRow active={activeCategory} onSelect={setActiveCategory} />
          <hr className="border-white/5 my-5" />

          {/* Filter pills */}
          <div className="mb-8">
            <FilterPills active={activeFilter} onSelect={setActiveFilter} />
          </div>

          {/* Search results OR home sections */}
          {query ? (
            <RecipeGrid
              title={`Results for "${query}"`}
              recipes={filtered}
              onSelect={setSelected}
              onSave={toggleSave}
              savedRecipes={saved}
            />
          ) : (
            <>
              <RecipeGrid
                title="Student Favorites"
                recipes={topRated}
                onSelect={setSelected}
                onSave={toggleSave}
                savedRecipes={saved}
              />
              <RecipeGrid
                title="⚡ Quick & Easy"
                recipes={quickMeals}
                onSelect={setSelected}
                onSave={toggleSave}
                savedRecipes={saved}
              />
              <RecipeGrid
                title="💸 Budget Picks"
                recipes={budgetPicks}
                onSelect={setSelected}
                onSave={toggleSave}
                savedRecipes={saved}
              />
            </>
          )}
        </main>

        {/* Right detail panel — mounts fresh each time a new card is clicked */}
        {selected && RECIPES[selected] && (
          <DetailPanel
            key={selected}
            name={selected}
            recipe={RECIPES[selected]}
            isSaved={saved.includes(selected)}
            onClose={() => setSelected(null)}
            onSave={toggleSave}
          />
        )}

      </div>
    </div>
  );
}
