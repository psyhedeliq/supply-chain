import React, { useState } from 'react';
import { addEvent } from '@/lib/api';

interface AddEventFormProps {
    itemId: string;
    onEventAdded: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
    itemId,
    onEventAdded,
}) => {
    const [location, setLocation] = useState('');
    const [custodian, setCustodian] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addEvent(itemId, { location, custodian });
            onEventAdded();
            setLocation('');
            setCustodian('');
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
            <h3 className="font-semibold mb-2">Add New Event</h3>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="input"
            />
            <input
                type="text"
                value={custodian}
                onChange={(e) => setCustodian(e.target.value)}
                placeholder="Custodian"
                className="input"
            />
            <button type="submit" className="btn btn-primary">
                Add Event
            </button>
        </form>
    );
};

export default AddEventForm;
