import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Odometer from 'react-odometerjs';
import { Briefcase, ChevronDownSquare, CircleDollarSign, Laptop2 } from 'lucide-react';

export default function About() {
    const [students, setStudents] = useState(2043);
    const [Awards, setAwards] = useState(2043);
    const [Courses, setCourses] = useState(2043);
    const [Professors, setProfessors] = useState(2043);
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setStudents(300);
            setAwards(5);
            setCourses(26);
            setProfessors(30);
        }, 3000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const faqs = [
        { 
            question: 'What programs does Cresta College offer?',
            answer: 'Cresta College offers a wide range of programs in Technology, Business, Management, and Tourism and Hospitality. We provide both online and offline courses to suit various learning preferences.'
        },
        {
            question: 'Are there any scholarship opportunities available?',
            answer: 'Yes, Cresta College offers scholarship programs for eligible students. These scholarships are based on academic merit, financial need, and other criteria. Please contact our admissions office for more information on how to apply.'
        },
        {
            question: 'Can I take courses online?',
            answer: 'We offer a variety of online courses in addition to our traditional on-campus programs. Our online courses provide flexibility for students who need to balance their education with other commitments.'
        },
        {
            question: 'What career services does Cresta College provide?',
            answer: 'Our career services include resume workshops, job fairs, internship placements, and one-on-one career counseling. We are committed to helping our students succeed both during their studies and after graduation.'
        },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    function AnimatedSection({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
        });

        useEffect(() => {
            if (inView) {
                controls.start('visible');
            }
        }, [controls, inView]);

        return (
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={fadeInUp}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className='w-full min-h-screen flex items-center flex-col p-5 lg:p-20 text-gray-200 bg-slate-800 mt-[50px] lg:mt-[10px]'>
            <AnimatedSection>
                <div className="rounded-xl w-full h-full bg-gradient-to-b from-slate-700 to-slate-800 px-3 lg:px-8 shadow-xl relative">
                <div className="absolute left-0 z-[0] w-[30%] h-[20%] -top-0 rounded-full pink__gradient bottom-40" />
                    <div className="flex flex-col md:flex-row p-2 md:p-5 md:justify-around">
                        <div className="w-full md:w-2/5 flex flex-col">
                            <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-gray-100">About Us <br />Cresta College <br /><div className="flex my-2">Professional Body</div></h1>
                            <p className="text-lg font-bold text-blue-400">Our goal is to create future business leaders and masterminds.</p>
                            <div className="grid grid-cols-2 my-5">
                                {['Learning', 'Exams', 'Experience', 'Success'].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="py-2 px-4 border-2 border-gray-600 rounded-lg text-gray-300 font-bold text-sm m-1 transition duration-500 hover:bg-slate-700 cursor-pointer text-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <motion.img
                            src="/pro.png"
                            alt=""
                            className='w-5/6 md:w-1/2 rounded-e-3xl rounded-tl-full'
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 p-2 gap-4 lg:gap-10 mt-10">
                    {[
                        { value: students, label: 'Students enrolled' },
                        { value: Courses, label: 'Courses' },
                        { value: Awards, label: 'Awards' },
                        { value: Professors, label: 'Professors' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="rounded-xl font-bold text-xl text-gray-200 bg-slate-700 flex flex-col items-center justify-center p-5 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Odometer value={item.value} format="(.ddd),dd" className='text-3xl font-extrabold flex items-center justify-center rounded-xl'/>
                            <span className="lg:font-bold text-sm my-2">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <h1 className="text-3xl font-extrabold text-gray-100 w-full text-center lg:my-10 mt-16">OUR COURSES</h1>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 p-2 gap-4 lg:gap-10 relative bg-grid-white/[0.05]">
                <div className="absolute right-0 z-[0] w-[40%] h-[50%] -top-0 rounded-full pink__gradient bottom-40" />

                    {[
                        { icon: Laptop2, label: 'Technology and Networking' },
                        { icon: Briefcase, label: 'Business & Management' },
                        { icon: CircleDollarSign, label: 'Accounting & Finance' },
                        { icon: ChevronDownSquare, label: 'Tourism & Hospitality' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="rounded-xl font-bold text-xl text-gray-200 bg-slate-700 flex flex-col items-center justify-center p-5 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center justify-center border-2 border-blue-400 p-1 rounded-full w-10 h-10 text-blue-400">
                                <item.icon />
                            </span>
                            <span className="lg:font-bold text-sm my-2 text-center">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <section className="mb-12 bg-slate-700 p-3 text-gray-200 mt-16 rounded-lg w-full">
                    <h2 className="text-2xl font-semibold mb-4 ml-4 mt-4">Privacy Policy</h2>
                    <div className="card shadow-xl bg-slate-600">
                        <div className="card-body">
                            <p>
                                Cresta College is committed to protecting the privacy of our students, faculty, and staff. We collect and use personal information solely for educational and administrative purposes. Our full privacy policy details how we collect, use, and protect your data in compliance with relevant data protection laws.
                            </p>
                            <div className="card-actions justify-end">
                                <motion.button
                                    className="btn btn-info"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Read Full Policy
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection>
                <section className="mb-12 mt-5 md:mt-8 lg:mt-20 w-full relative">
                <div className="absolute left-0 z-[0] w-[50%] h-[50%] -bottom-0 rounded-full blue__gradient " />

                    <h2 className="text-2xl font-semibold text-blue-400 mb-4">Frequently Asked Questions</h2>
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="collapse collapse-arrow bg-slate-700 text-gray-200 mb-2 shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <input 
                                type="radio" 
                                name="faq-accordion" 
                                checked={expandedFAQ === `faq-${index}`}
                                onChange={() => setExpandedFAQ(expandedFAQ === `faq-${index}` ? null : `faq-${index}`)}
                            />
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content font-light">
                                <p>{faq.answer}</p>
                            </div>
                        </motion.div>
                    ))}
                </section>
            </AnimatedSection>
        </div>
    );
}