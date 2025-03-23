import React, {useState} from 'react';
import './searchBar.css';

type Props = {
    onSearch: (query: string, category: string) => void;
    warnOnCategorySwitch: boolean;
    setWarnOnCategorySwitch: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar: React.FC<Props> = ({onSearch, warnOnCategorySwitch, setWarnOnCategorySwitch}) => {
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('PCCase');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value, category);
    };

    return (
        <form onSubmit = {handleSubmit} className='p-4 flex items-center gap-4'>
            <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='p-2 border rounded'
            >
                <option value="PCCase">Case</option>
                <option value="CPU">CPU</option>
                <option value="Motherboard">Motherboard</option>
                <option value="GPU">GPU</option>
                <option value="RAM">RAM</option>
                <option value="CPUCooler">CPU Cooler</option>
                <option value="Storage">Storage</option>
                <option value="PSU">Power Supply</option>
                <option value="CaseFan">Case Fan</option>
            </select>

            <input 
                type="text"
                placeholder="Search PC Parts..." 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="p-2 border rounded w-64"
            />
            
            <button type="submit" className='ml-2 p-2 bg-blue-500 text-white rounded'>
                Search
            </button>

            <button 
                onClick={() => setWarnOnCategorySwitch((prev) => !prev)}
                style={{margin: '1rem', padding: '0.5rem 1rem'}}
            >
                {warnOnCategorySwitch ? 'Disable Category Switch Warning' : 'Enable Category Switch Warning'}
            </button>
        </form>
    );
};

export default SearchBar