import { useState } from "react"

function App() {
  const [query, setQuery] = useState("")

  function handleSearch() {
    console.log("Search for:", query)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">
        Recipe Finder
      </h1>

      <div className="flex gap-2">
        <input
          className="border p-3 rounded-lg w-80"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default App