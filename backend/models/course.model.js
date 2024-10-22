import mongoose from "mongoose";

// Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    semesters: {
        type: Number,
        required: true
    },
    pricePerSemester: {
        type: Number,
        required: true
    },
    examPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, {timestamps: true});

// Exporting models
export const Course = mongoose.model("Course", courseSchema);
