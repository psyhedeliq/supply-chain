import React, { useState } from 'react';

interface ItemSearchProps {
    onSearch: (itemId: string) => void;
}

const ItemSearch: React.FC<ItemSearchProps> = ({ onSearch }) => {
    const [itemId, setItemId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemId.trim() === '') {
            setError('Please enter an Item ID (prefixed with #) or Name');
        } else {
            setError('');
            onSearch(itemId);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
        >
            <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter Item ID or Name"
                className="input flex-grow"
            />
            <button type="submit" className="btn btn-primary">
                Search
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default ItemSearch;
