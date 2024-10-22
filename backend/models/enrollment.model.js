import mongoose from "mongoose";

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to Course model
        required: true
    },
    coursePricePerSemester: {
        type: Number,
        required: true
    },
    courseTotalPrice: {
        type: Number,
        required: true
    },
    examDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, {timestamps: true});

// Exporting Enrollment model
export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
