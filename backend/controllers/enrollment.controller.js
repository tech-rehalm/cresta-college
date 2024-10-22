import {Enrollment} from "../models/enrollment.model.js"
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

// Create a new enrollment
// Create a new enrollment
export const createEnrollment = async (req, res) => {
    const { studentId, courseId, coursePricePerSemester, courseTotalPrice, examDate, startDate, endDate } = req.body;

    try {
        // Check if the course and student exist
        const course = await Course.findById(courseId);
        const student = await User.findById(studentId);

        if (!course || !student) {
            return res.status(404).json({ message: "Course or student not found" });
        }

        // Check if the student is already enrolled in the course
        if (!course.students.includes(studentId)) {
            course.students.push(studentId);  // Append the student to the course's students array
            await course.save();  // Save the updated course
        }

        // Create the enrollment
        const newEnrollment = new Enrollment({
            student: studentId,
            course: courseId,
            coursePricePerSemester,
            courseTotalPrice,
            examDate,
            startDate,
            endDate
        });

        await newEnrollment.save();  // Save the new enrollment
        res.status(201).json(newEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all enrollments
export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student course');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single enrollment by ID
export const getEnrollmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const enrollment = await Enrollment.findById(id).populate('student course');
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an enrollment
export const updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedEnrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an enrollment
export const deleteEnrollment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
        if (!deletedEnrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
