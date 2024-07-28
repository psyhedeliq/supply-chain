'use client';

import React, { useState } from 'react';
import { Item } from '../types/item';
import ItemDetails from '../components/ItemDetails';
import ItemSearch from '../components/ItemSearch';
import AddItemForm from '../components/AddItemForm';
import AddEventForm from '../components/AddEventForm';
import { fetchItem, searchItemsByName } from '@/lib/api';

export default function Home() {
    const [item, setItem] = useState<Item | null>(null);
    const [message, setMessage] = useState<{
        text: string;
        type: 'success' | 'error';
    }>({ text: '', type: 'success' });
    const [searchResults, setSearchResults] = useState<Item[]>([]);

    const handleSearch = async (query: string) => {
        try {
            if (query.startsWith('#')) {
                const data = await fetchItem(query.slice(1));
                setItem({ ...data, events: [] });
                setSearchResults([]);
            } else {
                const results = await searchItemsByName(query);
                setSearchResults(results);
                setItem(null);
            }
            setMessage({ text: '', type: 'success' });
        } catch (err) {
            setItem(null);
            setSearchResults([]);
            setMessage({ text: 'Error fetching item details', type: 'error' });
        }
    };

    const handleItemAdded = () => {
        setMessage({ text: 'Item added successfully', type: 'success' });
    };

    const handleEventAdded = async () => {
        if (item) {
            const updatedItem = await fetchItem(item.id);
            setItem(updatedItem);
        }
        setMessage({ text: 'Event added successfully', type: 'success' });
    };

    const handleItemUpdated = (updatedItem: Item) => {
        setItem(updatedItem);
        setMessage({ text: 'Item updated successfully', type: 'success' });
    };

    return (
        <main className="container">
            <h1 className="text-4xl font-bold mb-8 text-center">
                Supply Chain Track and Trace
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                    <div className="card mb-8">
                        <h2 className="section-title">Search Item</h2>
                        <ItemSearch onSearch={handleSearch} />
                    </div>
                    <div className="card">
                        <h2 className="section-title">Add New Item</h2>
                        <AddItemForm onItemAdded={handleItemAdded} />
                    </div>
                </div>
                <div>
                    {message.text && (
                        <div
                            className={`message ${
                                message.type === 'success'
                                    ? 'message-success'
                                    : 'message-error'
                            } mb-4`}
                        >
                            {message.text}
                        </div>
                    )}
                    {searchResults.length > 0 && (
                        <div className="card mb-8">
                            <h2 className="section-title mb-4">
                                Search Results
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {searchResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="p-4 border rounded-lg shadow-sm bg-white"
                                    >
                                        <button
                                            onClick={() =>
                                                handleSearch(`#${result.id}`)
                                            }
                                            className="btn btn-secondary"
                                        >
                                            {result.name}{' '}
                                            <span className="text-gray-500">
                                                (ID: {result.id})
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {item && (
                        <div className="card">
                            <h2 className="section-title mb-4">Item Details</h2>
                            <ItemDetails
                                key={item.id}
                                item={item}
                                onItemUpdated={handleItemUpdated}
                            />
                            <AddEventForm
                                itemId={item.id}
                                onEventAdded={handleEventAdded}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
