// filepath: e:\GitHub\personalportfolio\src\components\Experience.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const headerRef = useRef(null);

  const experiencesData = [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Inspirante Technologies Private Limited",
      duration: "May 2025 - Present",
      description: "Working as a Full Stack Developer at Inspirante Technologies Private Limited, contributing to web application development and software solutions.",  
      skills: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Express.js",
      ]      
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Intelligence and Data Science Engineers' Association",
      duration: "August 2024 - Present",
      description: "Developed a responsive Gallery Page using Next.js, featuring a custom-built image carousel for enhanced user experience. Integrated a RESTful API to dynamically fetch and display content. Utilized NeonDB with Prisma ORM for efficient database management, Cloudinary for optimized image storage and delivery, and Postman for testing and validating API endpoints.",  
      skills: [
        "Next.js",
        "RESTful APIs",
        "Prisma ORM",
        "NeonDB",
        "Cloudinary",
        "Postman",
        "Git"
      ]      
    },
    
  ];

  const transformedExperiences = experiencesData.map(exp => ({
    id: exp.id,
    title: (
      <div>
        <div className="text-lg font-bold">{exp.company}</div>
        <div className="text-base font-medium text-emerald-400">{exp.role}</div>
      </div>
    ),
    description: ( // This will be used by CardDescription inside HoverEffect's Card
      <>
        <p className="text-sm text-emerald-400 mb-2">{exp.duration}</p>
        <p>{exp.description}</p>
        {exp.skills && exp.skills.length > 0 && (
          <div className="mt-4">
            <strong className="text-zinc-300 text-xs font-semibold">Tech Stack:</strong>
            <div className="flex flex-wrap gap-1 mt-1">
              {exp.skills.map((skill, index) => (
                <span key={index} className="px-2 py-0.5 bg-emerald-700/30 text-emerald-400 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </>
    ),
    // link: undefined, // No specific link for experience cards, HoverEffect's <a> tag will not navigate
  }));

  useEffect(() => {
    gsap.fromTo(headerRef.current, // This will now target the div
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1
        }
      }    );
  }, []);
  return (
    <section name="experience" className="w-full min-h-screen pt-16 md:pt-24 pb-16 md:pb-20">
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full'>
        <div ref={headerRef} className='pb-10 md:pb-16 text-center sm:text-left'> {/* Moved ref here */}
          <h2 // Changed from motion.h2 to h2
            // Removed Framer Motion props: initial, whileInView, transition
            className='text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white'
          >
            Experience
          </h2>
        </div>
        
        <HoverEffect items={transformedExperiences} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8 py-10" />
        
      </div>
    </section>
  );
};

export default Experience;
