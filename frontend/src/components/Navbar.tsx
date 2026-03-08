interface NavbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  savedCount: number;
}

export default function Navbar({ query, onQueryChange, savedCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center gap-6 h-14 px-6 bg-gray-950/95 backdrop-blur border-b border-white/5">

      {/* Logo */}
      <span className="text-xl font-extrabold whitespace-nowrap shrink-0 tracking-tight">
        🥬 <span className="text-lime-400">mise</span>enplace
      </span>

      {/* Browse / My Lists */}
      <div className="flex gap-1 shrink-0">
        <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-900 cursor-pointer">
          Browse
        </button>
        <button className="px-4 py-1.5 rounded-full text-sm font-semibold border border-white/15 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer">
          My Lists
        </button>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-gray-400 shrink-0">
        <span>📍</span>
        <span className="font-medium text-gray-300">Binghamton, NY</span>
        <span className="text-xs">▾</span>
      </div>

      {/* Search bar */}
      <div className="relative flex-1 max-w-lg">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Search recipes or ingredients..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-100 text-sm placeholder-gray-500 outline-none focus:border-lime-400/50 transition-colors"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto shrink-0">
        {savedCount > 0 && (
          <span className="px-3 py-1 rounded-lg bg-lime-400/10 border border-lime-400/25 text-lime-400 text-sm font-semibold">
            ★ {savedCount} saved
          </span>
        )}
        <button className="px-4 py-1.5 rounded-lg border border-white/15 text-sm text-gray-400 hover:text-gray-200 transition-colors cursor-pointer">
          Log in
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-lime-400 text-gray-900 text-sm font-bold hover:bg-lime-300 transition-colors cursor-pointer">
          Sign up
        </button>
      </div>

    </header>
  );
}
