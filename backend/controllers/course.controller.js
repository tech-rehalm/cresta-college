import { Course } from "../models/course.model.js";

// Create a new course
export const createCourse = async (req, res) => {
  const { name, description, semesters, pricePerSemester, examPrice, image, duration } = req.body;
  if (!name || !description || !semesters || !pricePerSemester || !examPrice || !image || !duration) {
    return res.status(400).json({ message: "Please fill in all the fields", success: false });
  }

  const courseAlreadyExist = await Course.findOne({ name });
  if (courseAlreadyExist) {
    return res.status(400).json({ message: "Course already exists", success: false });
  }

  try {
    const course = new Course({
      name,
      description,
      semesters,
      pricePerSemester,
      examPrice,
      image,
      duration,
    });

    await course.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error creating course", success: false });
  }
};

// Fetch all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching courses", success: false });
  }
};

// Fetch a single course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found", success: false });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching course", success: false });
  }
};

// Edit an existing course by ID
export const editCourseById = async (req, res) => {
  const { id } = req.params;
  const { name, description, semesters, pricePerSemester, examPrice, image, duration } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        name,
        description,
        semesters,
        pricePerSemester,
        examPrice,
        image,
        duration,
      },
      { new: true } // Return the updated course document
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error updating course", success: false });
  }
};

// Delete a course by ID
export const deleteCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting course", success: false });
  }
};
