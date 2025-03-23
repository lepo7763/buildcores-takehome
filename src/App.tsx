import { useState } from 'react';
import SearchBar from './components/searchBar';
import { searchParts } from './api/searchParts';

function App() {
  const [results, setResults] = useState<any[]>([]);
  const handleSearch = async (query: string) => {
    const res = await searchParts(query);
    setResults(res.data);

  };

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Buildcores Compare</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-2 gap-4 p-4">
        {results.map((item, idx) => (
          <div key={idx} className="border p-2 rounded shadow">
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Dimensions: {item.dimensions}</p>
            {/* add more */}
            <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
              Add to Compare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;