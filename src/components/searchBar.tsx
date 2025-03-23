import React, {useState} from 'react';

type Props = {
    onSearch: (query: string) => void;
};

const searchBar: React.FC<Props> = ({onSearch}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value);
    };

    return (
        <form onSubmit = {handleSubmit} className='p-4'>
            <input type="text" placeholder="Search PC Parts..." value={value} onChange={(e) => setValue(e.target.value)} className="p-2 border rounded w-64"/>
            <button type="submit" className='ml-2 p-2 bg-blue-500 text-white rounded'>
                Search
            </button>
        </form>
    );
};

export default searchBar