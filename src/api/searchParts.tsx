export const searchParts = async (query: string) => {
    const res = await fetch ('https://www.api.buildcores.com/api/official/database/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            filters: [],
            limit: 20,
            parts_category: 'PCCase',
            search_query: query,
            show_disabled_interactive_models: true,
            show_interactive_first: false,
            skip: 0,
            sort: 0,
        }),
    });
    if (!res.ok) {
        console.error('Failed to fetch:', res.status);
        throw new Error('API request failed');
    }
    return res.json();
};