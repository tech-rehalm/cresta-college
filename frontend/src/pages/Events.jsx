import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useEventStore from '../store/useEventStore';
import { Calendar, Users, Book, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';

const Events = () => {
  const { events, fetchEvents, loading, error } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-800 text-white mt-[50px]"
    >
      {/* Hero Section */}
      <motion.section
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-center"
            variants={itemVariants}
          >
            Cresta College Events
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-center mb-12"
            variants={itemVariants}
          >
            Discover and participate in our exciting campus events
          </motion.p>
        </div>
      </motion.section>

      {/* College Info Grid */}
      <section className="py-16 bg-slate-800 relative">
        <div className="absolute left-[20%] z-[0] w-[60%] h-[60%] -top-0 rounded-full blue__gradient bottom-40" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-10 text-center"
            variants={itemVariants}
          >
            Cresta College at a Glance
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              { icon: Users, title: "5,000+ Students", description: "Diverse community from all walks of life" },
              { icon: Book, title: "100+ Programs", description: "Wide range of academic disciplines" },
              { icon: GraduationCap, title: "95% Graduation Rate", description: "Committed to student success" },
              { icon: Award, title: "#1 in Innovation", description: "Leading the way in educational excellence" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-slate-700 p-6 rounded-lg shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-12 h-12 mb-4 text-info" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-16 relative">
        <div className="absolute left-[20%] z-[0] w-[60%] h-[30%] top-[30%] rounded-full blue__gradient bottom-40" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-10 text-center text-green-600 lg:mb-10 lg:text-4xl"
            variants={itemVariants}
          >
            Upcoming Events
          </motion.h2>
          {loading && <p className="text-center">Loading events...</p>}
          {error && <p className="text-center text-error">{error}</p>}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {events.map((event) => (
              <motion.div 
                key={event._id} 
                className="backdrop-blur-md shadow-inner shadow-slate-900 rounded-lg bg-[#26222897] overflow-hidden bg-grid-white/[0.05]"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{event.Name}</h3>
                  <p className="text-gray-400 mb-4">{event.Description}</p>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-info" />
                    <span>{new Date(event.Date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-info" />
                    <span>{event.EventLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-info" />
                    <span>{event.EventAudience}</span>
                  </div>
                </div>
                <div className="bg-green-700 px-6 py-4">
                  <p className="text-sm">Organized by: {event.Organizer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-slate-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Cresta College</h3>
              <p className="mb-4">Empowering minds, shaping futures.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-info hover:text-info-content transition-colors duration-200">Facebook</a>
                <a href="#" className="text-info hover:text-info-content transition-colors duration-200">Twitter</a>
                <a href="#" className="text-info hover:text-info-content transition-colors duration-200">Instagram</a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-info transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-info transition-colors duration-200">Programs</a></li>
                <li><a href="#" className="hover:text-info transition-colors duration-200">Admissions</a></li>
                <li><a href="#" className="hover:text-info transition-colors duration-200">Campus Life</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-info" />
                  info@crestacollege.edu
                </p>
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-info" />
                  (123) 456-7890
                </p>
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-info" />
                  123 College Ave, City, State 12345
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p>&copy; 2024 Cresta College. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Events;