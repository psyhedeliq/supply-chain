import { Event, Item } from '../types/item';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export async function fetchItem(id: string) {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch item');
    }
    return response.json();
}

export async function createItem(item: Omit<Item, 'events'>) {
    const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Failed to create item');
    }
    return response.json();
}

export async function addEvent(
    itemId: string,
    event: Omit<Event, 'timestamp'>
) {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        throw new Error('Failed to add event');
    }
    return response.json();
}

export async function searchItemsByName(name: string) {
    const response = await fetch(
        `${API_BASE_URL}/items/search?name=${encodeURIComponent(name)}`
    );
    if (!response.ok) {
        throw new Error('Failed to search items');
    }
    return response.json();
}

// Add these functions after the existing ones

export async function updateItem(
    id: string,
    item: Partial<Omit<Item, 'events'>>
) {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error('Failed to update item');
    }
    return response.json();
}

export async function getItemEvents(id: string) {
    const response = await fetch(`${API_BASE_URL}/items/${id}/events`);
    if (!response.ok) {
        throw new Error('Failed to fetch item events');
    }
    return response.json();
}
