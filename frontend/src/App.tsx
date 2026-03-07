import { useState } from "react"
import SearchBar from "./SearchBar"

function App() {
  const [query, setQuery] = useState("")

  function handleSearch() {
    console.log("Search for:", query)
  }

  return (
    <SearchBar />
  )
}

export default App