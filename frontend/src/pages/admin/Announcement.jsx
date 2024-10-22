import React, { useEffect } from 'react';
import useAnnouncementStore from '../../store/AnnouncementStore';

const AnnouncementList = () => {
  const { announcements, fetchAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, loading, error } = useAnnouncementStore();

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleCreate = () => {
    const newAnnouncement = { name: 'New Announcement', message: 'This is a new announcement', expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }; // Example data
    createAnnouncement(newAnnouncement);
  };

  const handleUpdate = (id) => {
    const updatedData = { name: 'Updated Announcement', message: 'This announcement has been updated' }; // Example data
    updateAnnouncement(id, updatedData);
  };

  const handleDelete = (id) => {
    deleteAnnouncement(id);
  };

  if (loading) return <p>Loading announcements...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Announcements</h1>
      <button onClick={handleCreate}>Create Announcement</button>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement._id}>
            <h2>{announcement.name}</h2>
            <p>{announcement.message}</p>
            <button onClick={() => handleUpdate(announcement._id)}>Update</button>
            <button onClick={() => handleDelete(announcement._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementList;
