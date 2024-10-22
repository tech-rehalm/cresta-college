import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/users" : "/api/users";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
            isCheckingAuth: true,
            message: null,
            users: [],

            // Signup action
            signup: async (name, email, password, role) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/signup`, {
                        name,
                        email,
                        password,
                        role,
                    });
                    set({
                        user: response.data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ error: error.response.data.message || "Error signing up", isLoading: false });
                    throw error;
                }
            },
            create: async (name, email, password, role) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/create`, {
                        name,
                        email,
                        password,
                        role,
                    });
                    set({
                        isLoading: false,
                    });
                } catch (error) {
                    set({ error: error.response.data.message || "Error creating the user", isLoading: false });
                    throw error;
                }
            },

            // Get all users
            allUsers:async()=>{
                try {
                    const response = await axios.get(`${API_URL}/all`)
                    set({users:response.data,isLoading:false})
                } catch (error) {
                    set({ error: "Error fetching the users", isLoading: false });
                    throw error;
                }
            },

            // Login action
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/login`, { email, password });
                    set({
                        isAuthenticated: true,
                        user: response.data.user,
                        error: null,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
                    throw error;
                }
            },

            // Logout action
            logout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await axios.post(`${API_URL}/logout`);
                    set({ user: undefined, isAuthenticated: false, error: null, isLoading: false });
                } catch (error) {
                    set({ error: "Error logging out", isLoading: false });
                    throw error;
                }
            },

            // Check authentication
            checkAuth: async () => {
                set({ isCheckingAuth: true, error: null });
                try {
                    const response = await axios.get(`${API_URL}/check-auth`);
                    set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
                } catch (error) {
                    set({ error: null, isCheckingAuth: false, isAuthenticated: false });
                }
            },

            // Edit user by ID
            editUser: async (id, updatedData) => {
                set({ isLoading: true });
                try {
                    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
                    set({
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    set({ error: error.response?.data?.message || "Error updating user", isLoading: false });
                    throw error;
                }
            },

            // Delete user by ID
            deleteUser: async (id) => {
                set({ isLoading: true });
                try {
                    await axios.delete(`${API_URL}/${id}`);
                    set({ message: "User deleted successfully", isLoading: false });
                } catch (error) {
                    set({ error: "Error deleting user", isLoading: false });
                    throw error;
                }
            },
        }),
        {
            name: "auth",
        }
    )
);