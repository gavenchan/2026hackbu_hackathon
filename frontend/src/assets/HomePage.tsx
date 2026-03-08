import SearchBar from "../SearchBar"

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      <h1 className="text-4xl font-bold mb-6">
        Recipe Finder
      </h1>

      <p className="text-gray-600 mb-6">
        Find recipes and compare ingredient prices
      </p>

      <SearchBar />

    </div>
  )
}

export default HomePage