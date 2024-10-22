import create from 'zustand';

const useAnnouncementStore = create((set) => ({
  announcements: [],
  loading: false,
  error: null,

  // Fetch all announcements
  fetchAnnouncements: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/announcements'); // Adjust the API endpoint as needed
      const data = await response.json();
      set({ announcements: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch announcements', loading: false });
    }
  },

  // Create a new announcement
  createAnnouncement: async (announcement) => {
    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcement),
      });
      const newAnnouncement = await response.json();
      set((state) => ({
        announcements: [...state.announcements, newAnnouncement.announcement],
      }));
    } catch (error) {
      set({ error: 'Failed to create announcement' });
    }
  },

  // Update an announcement
  updateAnnouncement: async (id, updatedData) => {
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const updatedAnnouncement = await response.json();
      set((state) => ({
        announcements: state.announcements.map((ann) =>
          ann._id === id ? updatedAnnouncement.announcement : ann
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update announcement' });
    }
  },

  // Delete an announcement
  deleteAnnouncement: async (id) => {
    try {
      await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        announcements: state.announcements.filter((ann) => ann._id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete announcement' });
    }
  },
}));

export default useAnnouncementStore;
