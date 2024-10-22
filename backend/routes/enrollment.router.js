import express from 'express';
import {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
} from "../controllers/enrollment.controller.js";

const router = express.Router();

// POST: Create a new enrollment
router.post('/', createEnrollment);

// GET: Fetch all enrollments
router.get('/', getAllEnrollments);

// GET: Fetch a single enrollment by ID
router.get('/:id', getEnrollmentById);

// PUT: Update an enrollment by ID
router.patch('/:id', updateEnrollment);

// DELETE: Delete an enrollment by ID
router.delete('/:id', deleteEnrollment);

export default router;
