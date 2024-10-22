import express from "express";
import { 
    createCourse, 
    getCourses, 
    getCourseById, 
    editCourseById, 
    deleteCourseById 
} from "../controllers/course.controller.js";

const router = express.Router();

// Route to create a new course
router.post("/create", createCourse);

// Route to get all courses
router.get("/get", getCourses);

// Route to get a course by ID
router.get("/get/:id", getCourseById);

// Route to update a course by ID
router.put("/edit/:id", editCourseById);

// Route to delete a course by ID
router.delete("/delete/:id", deleteCourseById);

export default router;
