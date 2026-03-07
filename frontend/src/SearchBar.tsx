import { useState } from "react";


function SearchBar() {
  const [query, setQuery] = useState(""); //stores what user types in serach bar

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} //updates state as user types
      />
      <button onClick={handleSearch}>Search</button> 
    </div>
  );
}

export default SearchBar;