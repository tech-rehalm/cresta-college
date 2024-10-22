'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowBigRight, CheckCircle, CircleSlash2, Clock, Timer, Users, VideoIcon, ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { people, professors } from "../lib/data"

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState(null)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  }

  const stagger = {
    visible: { 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } 
    }
  }

  return (
    <div className='w-full min-h-screen bg-slate-800'>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="container mx-auto px-4 py-12 lg:py-20"
      >
        <motion.section variants={fadeInUp} className="flex flex-col md:flex-row mb-20 items-center ">
          <div className="w-full md:w-1/2 p-3 flex flex-col">
            <motion.div variants={fadeInUp} className="text-xl opacity-60 mb-4 text-white">Welcome to Cresta College</motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-6xl font-bold text-info mb-6">Education is the key for success.</motion.h1>
            <motion.p variants={fadeInUp} className="mb-6 font-light opacity-50 text-white">We embark on a mission to build a bright future for every student enrolled in our institution. We stand to support children shape their future.</motion.p>
            <motion.div variants={fadeInUp} className="flex mb-6 border-2 border-gray-800 bg-gray-700 rounded-3xl p-4 items-center justify-between">
              <div className="text-info text-sm md:font-bold flex items-center">
                Enroll now and shape your future <ArrowBigRight className="ml-2"/>
              </div>
              <a href='/courses' className="bg-gray-800 btn rounded-3xl border border-slate-800 text-info px-6 py-2">View Courses</a>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-lg text-white mb-4 opacity-50 font-bold">Shape your future with our professional lectures.</motion.h2>
            <motion.div variants={fadeInUp} className="flex flex-row items-center mb-6">
              <div className="flex items-center space-x-2">
                {people.slice(0, 5).map((person, index) => (
                  <div key={person.name} className="relative group">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {person.name}
                    </div>
                  </div>
                ))}
                {people.length > 3 && (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">
                    +{people.length - 3}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="w-full md:w-1/2 mt-6 md:mt-0 hidden md:block">
            <img src="/p2.webp" alt="Students" className='w-full md:w-4/5 l rounded-t-3xl md:ml-6 lg:ml-20' />
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-info text-center mb-12">Our Programs</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Certificate', 'Diploma', 'Degree'].map((program, index) => (
              <motion.div key={program} variants={fadeInUp} className="bg-gray-700 rounded-xl overflow-hidden shadow-lg">
                <img src={program === "Certificate" && "/cet.jpg" || program === "Diploma" && "/dip.webp" || program === "Degree" && "/gra.jpg"} alt={program} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-info mb-4">{program} Programs</h3>
                  <div className="flex items-center mb-2">
                    <Users className='text-info mr-2' size={16} />
                    <span className="text-white opacity-80 text-sm">Over {75 - index * 15} Students enrolled</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <VideoIcon className='text-info mr-2' size={16} />
                    <span className="text-white opacity-80 text-sm">Live videos</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className='text-info mr-2' size={16} />
                    <span className="text-white opacity-80 text-sm">Duration: {16 + index * 8} months</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <CircleSlash2 className='text-info mr-2' size={16} />
                    <span className="text-white opacity-80 text-sm">From ${220 + index * 30}/semester</span>
                  </div>
                  <a href={`/courses/#${program.toLowerCase()}`} className="btn btn-info btn-block">Enroll now</a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-20 p-5 lg:p-10"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-info text-center mb-12">Why Choose Cresta College</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              {[
                { icon: CheckCircle, title: "Daily Course Worksheets", description: "We provide everyday lessons for each course and quality notes. Assignments are given to test your progress." },
                { icon: Users, title: "Online Group Discussions", description: "Engage in collaborative learning through our online platforms, enhancing your understanding through peer interactions." },
                { icon: Timer, title: "Measurable Learning Outcomes", description: "Our experienced professors ensure you not only pass exams but also enhance your capabilities and skills." }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-info" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-info mb-2">{item.title}</h3>
                    <p className="text-white opacity-70">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="relative md:w-7/10">
              <img src="/fl1.jpg" alt="Teaching" className='rounded-lg shadow-2xl' />
              <img src="/fl2.jpg" alt="Students" className='absolute top-1/2 -right-12 transform -translate-y-1/2 -rotate-12 w-2/3 rounded-lg shadow-2xl' />
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-info text-center mb-12">Our Professional & Experienced Mentors</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {professors.slice(0, 8).map((pro) => (
              <motion.div key={pro.name} variants={fadeInUp} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <img src={pro.image} alt={pro.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-info mb-1">{pro.name}</h3>
                  <p className="text-white opacity-80 text-sm mb-1">{pro.course}</p>
                  <p className="text-info text-sm">{pro.exp} experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-info text-center mb-12">Frequently Asked Questions</motion.h2>
          <div className="space-y-4">
            {[
              { question: "What programs does Cresta College offer?", answer: "Cresta College offers a variety of programs including Certificate, Diploma, and Degree courses in various fields such as Business, Technology, and Civil Service." },
              { question: "Are online courses available?", answer: "Yes, we offer both online and offline courses to accommodate different learning preferences and situations." },
              { question: "How long do the programs typically last?", answer: "Program duration varies. Certificate programs typically last 16 months, Diploma programs about 2 years, and Degree programs 3 years." },
              { question: "Is financial aid available?", answer: "Yes, we offer various scholarships and financial aid options. Please contact our admissions office for more information." },
              { question: "What support services are available for students?", answer: "We provide various support services including academic advising, career counseling, online group discussions, and access to learning resources." }
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp} className="collapse collapse-plus bg-gray-700">
                <input 
                  type="radio" 
                  name="my-accordion-3" 
                  checked={activeAccordion === index} 
                  onChange={() => setActiveAccordion(activeAccordion === index ? null : index)}
                /> 
                <div className="collapse-title text-xl font-medium text-info flex justify-between items-center">
                  {faq.question}
                  {activeAccordion === index ? <ChevronUp className="text-info" /> : <ChevronDown className="text-info" />}
                </div>
                <div className="collapse-content"> 
                  <p className="text-white opacity-80">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-info mb-4">Cresta College</h3>
              <p className="opacity-80 mb-4">Shaping futures through quality education and innovation.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-info hover:text-white transition-colors"><Facebook /></a>
                <a href="#" className="text-info hover:text-white transition-colors"><Twitter /></a>
                <a href="#" className="text-info hover:text-white transition-colors"><Instagram /></a>
                <a href="#" className="text-info hover:text-white transition-colors"><Linkedin /></a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-info mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-info transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-info transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-info transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-info transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-info mb-4">Programs</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-info transition-colors">Certificate Programs</a></li>
                <li><a href="#" className="hover:text-info transition-colors">Diploma Programs</a></li>
                <li><a href="#" className="hover:text-info transition-colors">Degree Programs</a></li>
                <li><a href="#" className="hover:text-info transition-colors">Online Courses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-info mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center"><Mail className="mr-2 text-info" /> info@crestacollege.com</li>
                <li className="flex items-center"><Phone className="mr-2  text-info" /> +1 (123) 456-7890</li>
                <li className="flex items-center"><MapPin className="mr-2 text-info" /> 123 Education St, Knowledge City</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Cresta College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}