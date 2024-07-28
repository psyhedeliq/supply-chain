import { Request, Response } from 'express';
import { Item, Event } from '../models/item';

// In-memory storage for items (replace with database in production)
const items: Map<string, Item> = new Map();

// Create a new supply chain item
export const createItem = (req: Request, res: Response) => {
    const { id, name, color, price } = req.body;

    if (items.has(id)) {
        return res
            .status(400)
            .json({ error: 'Item with this ID already exists' });
    }

    const newItem: Item = { id, name, color, price, events: [] };
    items.set(id, newItem);
    console.log('Created item:', newItem);
    console.log('All items:', Array.from(items.entries()));

    res.status(201).json(newItem);
};

// Update supply chain item reference data
export const updateItem = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, color, price } = req.body;

    const item = items.get(id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    item.name = name || item.name;
    item.color = color || item.color;
    item.price = price || item.price;

    res.json(item);
};

// Add a new event to an item
export const addEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    const { location, custodian, timestamp } = req.body;

    const item = items.get(id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    const newEvent: Event = {
        location,
        custodian,
        timestamp: timestamp || new Date(),
    };
    item.events.push(newEvent);

    res.status(201).json(newEvent);
};

export const getItem = (req: Request, res: Response) => {
    const { id } = req.params;
    const item = items.get(id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
};

// Get all events of an item
export const getEvents = (req: Request, res: Response) => {
    const { id } = req.params;

    const item = items.get(id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item.events);
};

// Get the last event of an item
export const getLastEvent = (req: Request, res: Response) => {
    const { id } = req.params;

    const item = items.get(id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    const lastEvent = item.events[item.events.length - 1];
    if (!lastEvent) {
        return res.status(404).json({ error: 'No events found for this item' });
    }

    res.status(200).json(lastEvent);
};

// Search for an item by name
export const searchItemByName = (req: Request, res: Response) => {
    const { name } = req.query;
    if (typeof name !== 'string') {
        return res.status(400).json({ error: 'Name must be a string' });
    }
    const foundItems = Array.from(items.values()).filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(foundItems);
};
