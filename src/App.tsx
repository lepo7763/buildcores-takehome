import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import { searchParts } from './api/searchParts';
import './App.css';

function ComparisonChart({ items, onRemoveItem }: { items: any[], onRemoveItem: (id: string) => void }) {
  if (items.length === 0) return null;

  return (
    <div className='comparison-chart'>
      <h2 className="text-lg font-bold mt-6 mb-2">Comparison</h2>
      <div className="table-container">
        <table className="parts-table">
          <thead>
            <tr>
              <th>Specs</th>
              {items.map((item) => (
                <th key={item.id}>
                  <div className="flex items-center justify-between gap-2">
                    <span>{item.name}</span>
                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500">✕</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              {items.map((item) => (
                <td key={item.id}>{item.price ? `$${item.price}` : '—'}</td>
              ))}
            </tr>
            <tr>
              <td>Form Factor</td>
              {items.map((item) => (
                <td key={item.id}>{item.v2Fields?.form_factor ?? '—'}</td>
              ))}
            </tr>
            {/* Add more spec rows here as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [results, setResults] = useState<any[]>([]);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [lastQuery, setLastQuery] = useState('');
  const [lastCategory, setLastCategory] = useState('');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (rowIndex: number) => {
    setExpandedRows((prev) =>
      prev.includes(rowIndex) ? prev.filter((i) => i !== rowIndex) : [...prev, rowIndex]
    );
  };

  const handleSearch = async (query: string, category: string) => {
    setLastQuery(query);
    setLastCategory(category);
    setPage(0);
  };

  const fetchPageData = async () => {
    if (!lastCategory) return;

    try {
      const skipValue = page * 20;
      const res = await searchParts(lastQuery, lastCategory, skipValue);
      setResults(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleAddToCompare = (item: any) => {
    if (!compareList.find((compItem) => compItem.id === item.id)) {
      setCompareList((prev) => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemId: string) => {
    setCompareList((prev) => prev.filter((compItem) => compItem.id !== itemId));
  };

  useEffect(() => {
    if (lastCategory) {
      fetchPageData();
    }
  }, [page, lastQuery, lastCategory]);

  const getMainSpecForCategory = (item: any) => {
    const category = item.part_category || '';
    const f = item.v2Fields || {};

    switch (category) {
      case 'PCCase':
        return f.form_factor || '—';
      case 'CPU':
        return `${f.cores?.total || '—'} Cores`;
      case 'Motherboard':
        return f.chipset || '—';
      case 'GPU':
        return `${f.memory || '—'} VRAM`;
      case 'RAM':
        return `${f.capacity || '—'} ${f.ram_type || ''}`;
      case 'CPUCooler':
        return item.airCooled ? 'Air' : item.waterCooled ? 'Water' : '—';
      case 'Storage':
        return `${f.capacity || '—'} ${f.type || ''}`;
      case 'PSU':
        return `${f.wattage || '—'}W`;
      case 'CaseFan':
        return `${f.size || '—'}mm`;
      default:
        return '—';
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Compare Buildcores PC Components</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="table-container">
        <table className="parts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Form</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => {
              const formFactor = getMainSpecForCategory(item);
              const price = item.price !== undefined ? `$${item.price}` : '—';
              const isExpanded = expandedRows.includes(idx);

              return (
                <React.Fragment key={idx}>
                  <tr>
                    <td className="td-name">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="product-image"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{formFactor}</td>
                    <td>{price}</td>
                    <td>
                      <button onClick={() => handleToggleRow(idx)} className="add-button">
                        {isExpanded ? 'Hide' : 'Details'}
                      </button>
                      <button onClick={() => handleAddToCompare(item)} className="add-button ml-2">
                        Compare
                      </button>
                    </td>
                  </tr>
                  <tr data-expanded={isExpanded ? 'true' : 'false'}>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <div className="collapsible-container">
                        {/* you can optionally render full spec details here */}
                        <span className="text-sm text-gray-400 pl-2">Specs go here</span>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls" style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </button>
        <span style={{ margin: '0 1rem' }}>
          Showing {page * 20 + 1} - {page * 20 + results.length}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={results.length > 20}
        >
          Next
        </button>
      </div>

      {/* Render the comparison chart */}
      <ComparisonChart items={compareList} onRemoveItem={handleRemoveFromCompare} />
    </div>
  );
}

export default App;
