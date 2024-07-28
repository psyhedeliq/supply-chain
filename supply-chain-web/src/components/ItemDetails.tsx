import React, { useEffect, useState } from 'react';
import { Item, Event } from '../types/item';
import { updateItem, getItemEvents } from '@/lib/api';

interface ItemDetailsProps {
    item: Item;
    onItemUpdated: (updatedItem: Item) => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onItemUpdated }) => {
    const [color, setColor] = useState(item.color);
    const [price, setPrice] = useState(item.price.toString());
    const [events, setEvents] = useState<Event[]>([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    useEffect(() => {
        setColor(item.color);
        setPrice(item.price.toString());
        setEvents([]);
        setEventsLoaded(false);
    }, [item]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedItem = await updateItem(item.id, {
                color,
                price: parseFloat(price),
            });
            onItemUpdated(updatedItem);
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    const fetchAllEvents = async () => {
        try {
            const allEvents = await getItemEvents(item.id);
            setEvents(allEvents);
            setEventsLoaded(true);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setEventsLoaded(true);
        }
    };

    return (
        <div>
            <h2 className="section-title">{item.name}</h2>
            <p className="mb-4">ID: {item.id}</p>
            <form onSubmit={handleUpdate} className="flex flex-col gap-2 mb-4">
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color"
                    className="input"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="input"
                />
                <button type="submit" className="btn btn-secondary">
                    Update Item
                </button>
            </form>
            <h3 className="font-semibold mb-2">Events:</h3>
            <button onClick={fetchAllEvents} className="btn btn-primary mb-4">
                Fetch All Events
            </button>
            {eventsLoaded ? (
                events.length > 0 ? (
                    <>
                        <ul className="list-disc pl-5 mb-4">
                            {events.map((event, index) => (
                                <li key={index} className="mb-2">
                                    Location: {event.location}, Custodian:{' '}
                                    {event.custodian}, Time:{' '}
                                    {new Date(event.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <h4 className="font-semibold mb-2">
                                Current Location/Custodian:
                            </h4>
                            <p>
                                Location: {events[events.length - 1].location}
                            </p>
                            <p>
                                Custodian: {events[events.length - 1].custodian}
                            </p>
                        </div>
                    </>
                ) : (
                    <p>No events found for this item.</p>
                )
            ) : (
                <p>
                    No events fetched yet. Click &quot;Fetch All Events&quot; to
                    load events.
                </p>
            )}
        </div>
    );
};

export default ItemDetails;
