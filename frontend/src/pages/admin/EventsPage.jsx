import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useEventStore from '../../store/useEventStore';
import { Calendar, MapPin, Users, User, FileText, Plus, Edit, Trash, Save, X } from 'lucide-react';
import UserCard from '../../components/UserCard';

const EventsPage = () => {
  const {
    events,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    loading,
    error
  } = useEventStore();

  const [newEvent, setNewEvent] = useState({
    Name: '',
    Date: '',
    EventLocation: '',
    EventAudience: 'All',
    Organizer: '',
    Description: '',
  });

  const [editing, setEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateEvent(currentEventId, newEvent);
        toast.success('Event updated successfully!');
      } else {
        await createEvent(newEvent);
        toast.success('Event created successfully!');
      }
      setNewEvent({
        Name: '',
        Date: '',
        EventLocation: '',
        EventAudience: 'All',
        Organizer: '',
        Description: '',
      });
      setEditing(false);
      setCurrentEventId(null);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setCurrentEventId(event._id);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully!');
    } catch (error) {
      toast.error('An error occurred while deleting the event.');
    }
  };

  const handleCancel = () => {
    setNewEvent({
      Name: '',
      Date: '',
      EventLocation: '',
      EventAudience: 'All',
      Organizer: '',
      Description: '',
    });
    setEditing(false);
    setCurrentEventId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-900 text-white p-6 mt-[50px]"
    >
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-500">School Events Management</h1>

        {/* Event Form */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className=" bg-red-800 overflow-hidden rounded-lg shadow-lg  flex flex-col md:flex-row  relative"
        >
           <img src="/bgm.png" alt="" className="w-full h-full absolute -z-10" />
           <div className="flex flex-col md:w-1/2 p-5">
           <h1 className="text-info text-xl font-extrabold lg:text-4xl">Cresta College</h1>
           <b className="text-xl font-bold lg:text-2xl my-4 text-info">Specify The event location</b>
           <div className="flex flex-col gap-5">
            <UserCard type="Conference" cl="bg-green-600 text-slate-900 md:mr-2" />
            <UserCard type="Sport" cl="bg-yellow-400 text-slate-900" />
           </div>
           </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-slate-800 w-full md:w-1/2">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4 ">
                <label className="block text-sm font-bold text-blue-500 mb-1">Event Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newEvent.Name}
                    onChange={(e) => setNewEvent({ ...newEvent, Name: e.target.value })}
                    className="input input-bordered w-full pl-10 bg-slate-700"
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-bold text-blue-500 mb-1">Event Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={newEvent.Date}
                    onChange={(e) => setNewEvent({ ...newEvent, Date: e.target.value })}
                    className="input input-bordered w-full pl-10 bg-slate-700"
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-bold text-blue-500 mb-1">Event Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newEvent.EventLocation}
                    onChange={(e) => setNewEvent({ ...newEvent, EventLocation: e.target.value })}
                    className="input input-bordered w-full pl-10 bg-slate-700"
                    required
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-bold text-blue-500 mb-1">Audience</label>
                <div className="relative">
                  <select
                    value={newEvent.EventAudience}
                    onChange={(e) => setNewEvent({ ...newEvent, EventAudience: e.target.value })}
                    className="select select-bordered w-full pl-10 bg-slate-700"
                    required
                  >
                    <option value="All">All</option>
                    <option value="Staff">Staff</option>
                    <option value="Students">Students</option>
                    <option value="Parents">Parents</option>
                    <option value="Public">Public</option>
                  </select>
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-blue-500 mb-1">Organizer</label>
              <div className="relative">
                <input
                  type="text"
                  value={newEvent.Organizer}
                  onChange={(e) => setNewEvent({ ...newEvent, Organizer: e.target.value })}
                  className="input input-bordered w-full pl-10 bg-slate-700"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-blue-500 mb-1">Description</label>
              <div className="relative">
                <textarea
                  value={newEvent.Description}
                  onChange={(e) => setNewEvent({ ...newEvent, Description: e.target.value })}
                  className="textarea textarea-bordered w-full pl-10 bg-slate-700"
                  rows={3}
                />
                <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {editing && (
                <button type="button" onClick={handleCancel} className="btn btn-outline btn-error">
                  <X size={18} className="mr-2" /> Cancel
                </button>
              )}
              <button type="submit" className={`btn ${editing ? 'btn-info' : 'btn-primary'}`}>
                {editing ? <><Save size={18} className="mr-2" /> Update Event</> : <><Plus size={18} className="mr-2" /> Create Event</>}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Event List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 lg:text-4xl text-green-500 my-5 lg:my-10">Event List</h2>
          {loading && <p className="text-center">Loading events...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full bg-slate-800">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Audience</th>
                    <th>Organizer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>{event.Name}</td>
                      <td>{new Date(event.Date).toLocaleDateString()}</td>
                      <td>{event.EventLocation}</td>
                      <td>{event.EventAudience}</td>
                      <td>{event.Organizer}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info mr-2"
                          onClick={() => handleEdit(event)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(event._id)}
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">No events found. Create one to get started!</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventsPage;