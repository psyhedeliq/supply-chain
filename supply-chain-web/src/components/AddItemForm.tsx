import React, { useState } from 'react';
import { createItem } from '@/lib/api';

interface AddItemFormProps {
    onItemAdded: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onItemAdded }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!id || !name || !color || !price) {
            setError('All fields are required');
            return;
        }

        try {
            await createItem({ id, name, color, price: parseFloat(price) });
            onItemAdded();
            setId('');
            setName('');
            setColor('');
            setPrice('');
        } catch (err) {
            setError('Failed to add item');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID"
                className="input"
                required
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="input"
                required
            />
            <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color"
                className="input"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="input"
                required
                step="0.01"
            />
            <button type="submit" className="btn btn-primary">
                Add Item
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default AddItemForm;
