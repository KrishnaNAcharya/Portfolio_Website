import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const headerRef = useRef(null);
  const experienceItemsRef = useRef([]);

  const experiences = [
    {
      id: 1,
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

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
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
      }
    );

    // Experience items animation
    experienceItemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { 
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top center+=100",
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section name="experience" className="w-full min-h-screen pt-16 md:pt-24 pb-16 md:pb-20">
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full'>
        <div ref={headerRef} className='pb-10 md:pb-16 text-center sm:text-left'>
          <h2 className='text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white'>Experience</h2>
        </div>
        
        <div className='space-y-8 md:space-y-12'>
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              ref={el => experienceItemsRef.current[index] = el}
              className='shadow-lg shadow-emerald-900/20 rounded-lg overflow-hidden bg-[#2a2a2a]/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 transition-colors duration-300'
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <h3 className='text-2xl md:text-3xl font-bold text-white'>{exp.role}</h3>
                  <span className='mt-2 md:mt-0 text-emerald-500 font-medium'>{exp.duration}</span>
                </div>
                <h4 className='text-xl md:text-2xl font-medium mb-4 text-gray-200'>{exp.company}</h4>
                <p className='text-base md:text-lg text-gray-300 mb-6 text-justify'>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-sm md:text-base">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
