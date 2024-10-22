import { Router } from 'express';
const router = Router();
import { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById } from '../controllers/events.controller.js';

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getAllEvents);

// Get a single event by ID
router.get('/:id', getEventById);

// Update an event by ID
router.put('/:id', updateEventById);

// Delete an event by ID
router.delete('/:id', deleteEventById);

export default router;
