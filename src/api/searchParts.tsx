export const searchParts = async (query: string) => {
    const res = await fetch('https://www.api.buildcores.com/api/official/database/parts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: [],
        limit: 20,
        part_category: "PCCase",           
        search_query: "nzxt",               
        show_disabled_interactive_models: true,
        show_interactive_first: false,
        skip: 0,
        sort: 0
      }),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`API request failed: ${res.status}`);
    }
  
    return res.json();
  };
  