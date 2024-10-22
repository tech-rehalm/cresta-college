import { create } from 'zustand';
import axios from 'axios';

const apiURL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/events" : "/api/events";
const useEventStore = create((set) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${apiURL}`);
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createEvent: async (newEvent) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${apiURL}`, newEvent);
      set((state) => ({
        events: [...state.events, response.data],
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateEvent: async (id, updatedEvent) => {
    set({ loading: true });
    try {
      const response = await axios.put(`${apiURL}/${id}`, updatedEvent);
      set((state) => ({
        events: state.events.map((event) =>
          event._id === id ? response.data : event
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${apiURL}/${id}`);
      set((state) => ({
        events: state.events.filter((event) => event._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useEventStore;
