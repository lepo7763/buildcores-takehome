// searchParts.ts
export const searchParts = async (query: string, category: string, skip: number = 0) => {
    const payload = {
      filters: [],
      limit: 20,
      part_category: category,
      search_query: query.trim(),
      show_disabled_interactive_models: true,
      show_interactive_first: false,
      skip,       // <-- use the skip parameter passed in
      sort: 0
    };
  
    const res = await fetch('https://www.api.buildcores.com/api/official/database/parts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`API request failed: ${res.status}`);
    }
  
    return res.json();
  };
  