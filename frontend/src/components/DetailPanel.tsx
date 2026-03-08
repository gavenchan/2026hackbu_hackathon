import { useState } from "react";
import type { Recipe } from "../types";
import { DIETARY, CAT_COLOR } from "../data/recipes";

interface DetailPanelProps {
  name: string;
  recipe: Recipe;
  isSaved: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

type Tab   = "shop" | "pantry" | "diet" | "nutrition";
type Store = "both" | "walmart" | "sams";

const TAB_LABELS: Record<Tab, string> = {
  shop: "🛒 Shop", pantry: "✓ Pantry", diet: "🌿 Diet", nutrition: "🥗 Nutrition",
};

export default function DetailPanel({ name, recipe, isSaved, onClose, onSave }: DetailPanelProps) {
  const [owned,       setOwned]       = useState<Record<number, boolean>>({});
  const [portions,    setPortions]    = useState(recipe.servings);
  const [dietary,     setDietary]     = useState<string[]>([]);
  const [activeStore, setActiveStore] = useState<Store>("both");
  const [activeTab,   setActiveTab]   = useState<Tab>("shop");

  const neededIngredients = recipe.ingredients.filter(i => !owned[i.id]);
  const scale = portions / recipe.servings;

  const getSwappedName = (ing: typeof recipe.ingredients[0]) => {
    for (const d of dietary) if (ing.swaps[d]) return ing.swaps[d];
    return ing.name;
  };

  const calcTotal = (prices: typeof recipe.walmart) =>
    neededIngredients.reduce((sum, ing) => {
      const p = prices.find(p => p.id === ing.id);
      return sum + (p ? p.price * scale : 0);
    }, 0);

  const wTotal = calcTotal(recipe.walmart);
  const sTotal = calcTotal(recipe.sams);

  return (
    <aside className="w-[420px] shrink-0 bg-gray-950 border-l border-white/5 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">

      {/* ── Hero ── */}
      <div
        className="h-52 flex items-center justify-center text-8xl relative"
        style={{ background: recipe.gradient }}
      >
        {recipe.badge && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
            {recipe.badge}
          </span>
        )}
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white text-xl border-0 cursor-pointer hover:bg-black/60 transition-colors">
          ×
        </button>
        {/* Save */}
        <button onClick={() => onSave(name)} className={`absolute top-16 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-lg border-0 cursor-pointer hover:bg-black/60 transition-colors ${isSaved ? "text-lime-400" : "text-white"}`}>
          {isSaved ? "★" : "☆"}
        </button>
        <span className="drop-shadow-2xl">{recipe.emoji}</span>
      </div>

      {/* ── Title + meta ── */}
      <div className="px-6 pt-5">
        <h2 className="text-2xl font-extrabold text-gray-100 mb-2">{name}</h2>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-5">
          <span><span className="text-amber-400">★</span> <span className="text-gray-200 font-semibold">{recipe.rating}</span> ({recipe.reviews.toLocaleString()}+)</span>
          <span>⏱ {recipe.time}</span>
          <span>📊 {recipe.difficulty}</span>
        </div>

        {/* Portion scaler */}
        <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 mb-5">
          <span className="text-sm text-gray-400">Servings</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setPortions(p => Math.max(1, p - 1))} className="w-8 h-8 rounded-lg bg-white/[0.08] border-0 text-white text-lg flex items-center justify-center cursor-pointer hover:bg-white/[0.15] transition-colors">−</button>
            <span className="text-lg font-bold text-gray-100 w-6 text-center">{portions}</span>
            <button onClick={() => setPortions(p => p + 1)} className="w-8 h-8 rounded-lg bg-lime-400 border-0 text-gray-900 text-lg flex items-center justify-center cursor-pointer hover:bg-lime-300 transition-colors">+</button>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-white/[0.07] px-6">
        {(Object.keys(TAB_LABELS) as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 py-3 text-xs font-semibold border-b-2 -mb-px cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0 whitespace-nowrap transition-colors
              ${activeTab === tab ? "border-lime-400 text-lime-400" : "border-transparent text-gray-600 hover:text-gray-400"}
            `}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="px-6 py-5 pb-12">

        {/* ════ SHOP ════ */}
        {activeTab === "shop" && (
          <div className="space-y-4">
            {/* Store toggle */}
            <div className="flex gap-2">
              {(["both", "walmart", "sams"] as Store[]).map(s => (
                <button
                  key={s}
                  onClick={() => setActiveStore(s)}
                  className={`
                    flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer border transition-colors
                    ${activeStore === s
                      ? "bg-lime-400/10 border-lime-400/30 text-lime-400"
                      : "bg-white/[0.04] border-white/[0.08] text-gray-500 hover:text-gray-300"
                    }
                  `}
                >
                  {s === "both" ? "Both" : s === "walmart" ? "🔵 Walmart" : "🟠 Sam's"}
                </button>
              ))}
            </div>

            {/* Store totals */}
            <div className={`grid gap-2.5 ${activeStore === "both" ? "grid-cols-2" : "grid-cols-1"}`}>
              {(activeStore === "both" || activeStore === "walmart") && (
                <div className={`relative rounded-2xl p-4 border ${wTotal <= sTotal ? "bg-blue-600/10 border-blue-400/30" : "bg-white/[0.04] border-white/[0.08]"}`}>
                  {wTotal <= sTotal && <span className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">BEST</span>}
                  <p className="text-[11px] text-gray-500 mb-1">🔵 Walmart</p>
                  <p className={`text-3xl font-extrabold ${wTotal <= sTotal ? "text-blue-400" : "text-gray-100"}`}>${wTotal.toFixed(2)}</p>
                  <p className="text-[11px] text-gray-600">${(wTotal / portions).toFixed(2)}/serving</p>
                </div>
              )}
              {(activeStore === "both" || activeStore === "sams") && (
                <div className={`relative rounded-2xl p-4 border ${sTotal < wTotal ? "bg-orange-500/10 border-orange-400/30" : "bg-white/[0.04] border-white/[0.08]"}`}>
                  {sTotal < wTotal && <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">BEST</span>}
                  <p className="text-[11px] text-gray-500 mb-1">🟠 Sam's Club</p>
                  <p className={`text-3xl font-extrabold ${sTotal < wTotal ? "text-orange-400" : "text-gray-100"}`}>${sTotal.toFixed(2)}</p>
                  <p className="text-[11px] text-gray-600">${(sTotal / portions).toFixed(2)}/serving</p>
                </div>
              )}
            </div>

            {/* Savings tip */}
            {activeStore === "both" && Math.abs(wTotal - sTotal) > 0.5 && (
              <div className="bg-lime-400/5 border border-lime-400/15 rounded-xl px-3.5 py-2.5 text-sm text-gray-300">
                💡 Save{" "}
                <strong className="text-lime-400">${Math.abs(wTotal - sTotal).toFixed(2)}</strong>{" "}
                by shopping at {wTotal < sTotal ? "Walmart" : "Sam's Club"}
              </div>
            )}

            {/* Items */}
            <p className="text-[11px] text-gray-600 font-semibold uppercase tracking-wider">
              {neededIngredients.length} items needed
            </p>
            <div className="space-y-2">
              {neededIngredients.map(ing => {
                const wp = recipe.walmart.find(p => p.id === ing.id);
                const sp = recipe.sams.find(p => p.id === ing.id);
                const wP = wp ? wp.price * scale : 0;
                const sP = sp ? sp.price * scale : 0;
                return (
                  <div key={ing.id} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-3.5">
                    <div className="mb-2.5">
                      <p className="font-medium text-sm text-gray-100">{getSwappedName(ing)}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-600">{(ing.amount * scale).toFixed(0)} {ing.unit}</span>
                        {/* Category dot — color is data-driven, must be inline */}
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: CAT_COLOR[ing.category] + "33", color: CAT_COLOR[ing.category] }}
                        >
                          {ing.category}
                        </span>
                      </div>
                    </div>
                    <div className={`grid gap-2 ${activeStore === "both" ? "grid-cols-2" : "grid-cols-1"}`}>
                      {(activeStore === "both" || activeStore === "walmart") && (
                        <div className={`rounded-lg p-2 ${wP <= sP ? "bg-blue-600/10" : "bg-white/[0.03]"}`}>
                          <p className="text-[10px] text-gray-600 mb-0.5">🔵 Walmart</p>
                          <p className={`font-bold text-sm ${wP <= sP ? "text-blue-400" : "text-gray-100"}`}>${wP.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-600">{wp?.unitPrice}</p>
                          {!wp?.inStock && <p className="text-[10px] text-red-500 mt-0.5">Out of stock</p>}
                        </div>
                      )}
                      {(activeStore === "both" || activeStore === "sams") && (
                        <div className={`rounded-lg p-2 ${sP < wP ? "bg-orange-500/10" : "bg-white/[0.03]"}`}>
                          <p className="text-[10px] text-gray-600 mb-0.5">🟠 Sam's Club</p>
                          <p className={`font-bold text-sm ${sP < wP ? "text-orange-400" : "text-gray-100"}`}>${sP.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-600">{sp?.unitPrice}</p>
                          {!sp?.inStock && <p className="text-[10px] text-red-500 mt-0.5">Out of stock</p>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ PANTRY ════ */}
        {activeTab === "pantry" && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 mb-4">Check off what you already have — they won't count toward your total.</p>
            {recipe.ingredients.map(ing => (
              <div
                key={ing.id}
                onClick={() => setOwned(p => ({ ...p, [ing.id]: !p[ing.id] }))}
                className={`
                  flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border transition-all
                  ${owned[ing.id]
                    ? "bg-lime-400/[0.06] border-lime-400/20 opacity-60"
                    : "bg-white/[0.04] border-white/[0.07] hover:border-white/15"
                  }
                `}
              >
                <div className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-colors ${owned[ing.id] ? "bg-lime-400" : "bg-white/[0.08]"}`}>
                  {owned[ing.id] && <span className="text-gray-900 text-xs font-bold">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium text-gray-100 ${owned[ing.id] ? "line-through" : ""}`}>{ing.name}</p>
                  <p className="text-[11px] text-gray-600">{ing.amount} {ing.unit}</p>
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-600 mt-4">
              {Object.values(owned).filter(Boolean).length} of {recipe.ingredients.length} owned
            </p>
          </div>
        )}

        {/* ════ DIET ════ */}
        {activeTab === "diet" && (
          <div>
            <p className="text-sm text-gray-500 mb-4">Select restrictions to auto-swap ingredients.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {DIETARY.map(d => (
                <button
                  key={d}
                  onClick={() => setDietary(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])}
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border transition-colors
                    ${dietary.includes(d)
                      ? "bg-lime-400/10 border-lime-400/35 text-lime-400"
                      : "bg-white/[0.05] border-white/10 text-gray-400 hover:text-gray-200"
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {recipe.ingredients.filter(ing => dietary.some(d => ing.swaps[d])).map(ing => (
                <div key={ing.id} className="bg-amber-500/[0.06] border border-amber-500/20 rounded-xl px-4 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 line-through">{ing.name}</p>
                    <p className="text-sm font-semibold text-amber-300">{getSwappedName(ing)}</p>
                  </div>
                  <span className="text-xl">🔄</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ NUTRITION ════ */}
        {activeTab === "nutrition" && (
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
              {[
                { label: "Cal",    value: recipe.nutrition.calories, unit: "kcal", color: "text-amber-400"  },
                { label: "Protein",value: recipe.nutrition.protein,  unit: "g",    color: "text-red-400"    },
                { label: "Carbs",  value: recipe.nutrition.carbs,    unit: "g",    color: "text-blue-400"   },
                { label: "Fat",    value: recipe.nutrition.fat,       unit: "g",    color: "text-purple-400" },
                { label: "Fiber",  value: recipe.nutrition.fiber,     unit: "g",    color: "text-green-400"  },
              ].map(n => (
                <div key={n.label} className="text-center">
                  <p className={`text-lg font-extrabold ${n.color}`}>{n.value}</p>
                  <p className="text-[10px] text-gray-600">{n.unit}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{n.label}</p>
                </div>
              ))}
            </div>
            {recipe.ingredients.map(ing => (
              <div key={ing.id} className="flex justify-between items-center px-3 py-2 bg-white/[0.03] rounded-lg text-sm">
                <span className="text-gray-300">{ing.name}</span>
                <span className="text-gray-600">{ing.amount} {ing.unit}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </aside>
  );
}
