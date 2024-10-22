import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/enrollments" : "/api/enrollments";
export const useEnrollmentStore = create((set) => ({
    enrollments: [],
    isLoading: false,
    error: null,
    
    fetchEnrollments: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}`);
            set({ enrollments: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createEnrollment: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}`, data);
            set((state) => ({ enrollments: [...state.enrollments, response.data], isLoading: false }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateEnrollment: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.patch(`${API_URL}/${id}`, data);
            set((state) => ({
                enrollments: state.enrollments.map(enrollment =>
                    enrollment._id === id ? response.data : enrollment
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    deleteEnrollment: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
                enrollments: state.enrollments.filter(enrollment => enrollment._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
