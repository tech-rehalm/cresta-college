// store/courseStore.js
import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/courses" : "/api/courses";

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get`); // Update this to match your API
      set({ courses: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  createCourse: async (courseData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/creat`, courseData); // Update this to match your API
      set((state) => ({ courses: [...state.courses, response.data.course], loading: false }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  editCourse: async (id, courseData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/edit/${id}`, courseData); // Update this to match your API
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === id ? response.data.course : course
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/delete/${id}`); // Update this to match your API
      set((state) => ({
        courses: state.courses.filter((course) => course._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useCourseStore;
