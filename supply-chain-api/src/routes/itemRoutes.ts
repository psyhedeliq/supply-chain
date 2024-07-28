import { Router } from 'express';
import {
    createItem,
    updateItem,
    addEvent,
    getEvents,
    getLastEvent,
    getItem,
    searchItemByName,
} from '../controllers/itemController';
import {
    validateEventInput,
    validateItemInput,
    validateItemUpdateInput,
    validatePayload,
} from '../schemas/schema';

const router = Router();

// Route to search for an item by name
router.get('/search', searchItemByName);

// Route to create a new supply chain item
router.post('/', validatePayload(validateItemInput), createItem);

// Route to update supply chain item reference data
router.put('/:id', validatePayload(validateItemUpdateInput), updateItem);

// Route to add a new event to an item
router.post('/:id/events', validatePayload(validateEventInput), addEvent);

// Route to get a single item by ID
router.get('/:id', getItem);

// Route to get all events of an item
router.get('/:id/events', getEvents);

// Route to get the last event of an item
router.get('/:id/events/last', getLastEvent);

export default router;
