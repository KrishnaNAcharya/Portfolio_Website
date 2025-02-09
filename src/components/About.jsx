import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionsRef = useRef([]);

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

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top center+=100",
            scrub: 1
          }
        }
      );
    });

    // Text sections animation
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(section,
        { 
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=50",
            end: "top center+=100",
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section name="skills" className="w-full min-h-screen pt-16 md:pt-24 pb-16 md:pb-20">
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full'>
        <div ref={headerRef} className='pb-10 md:pb-16 text-center sm:text-left'>
          <h2 className='text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white'>Skills & Hobbies</h2>
        </div>
        
        {/* Changed from flex to grid layout to match Projects */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10'>
          {/* Programming Languages Card */}
          <div ref={el => cardsRef.current[0] = el} 
            className='shadow-lg shadow-emerald-900/20 rounded-lg overflow-hidden bg-[#2a2a2a]/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 transition-colors duration-300 flex flex-col h-full'>
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h3 className='text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center'>Programming Languages</h3>
              <ul className='list-disc ml-6 md:ml-8 text-base md:text-lg space-y-2 flex-grow'>
                <li>Java</li>
                <li>C</li>
                <li>C++</li>
                <li>Python</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>R</li>
              </ul>
            </div>
          </div>

          {/* Frameworks & Libraries Card */}
          <div ref={el => cardsRef.current[1] = el}
            className='shadow-lg shadow-emerald-900/20 rounded-lg overflow-hidden bg-[#2a2a2a]/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 transition-colors duration-300 flex flex-col h-full'>
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h3 className='text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center'>Frameworks & Libraries</h3>
              <ul className='list-disc ml-6 md:ml-8 text-base md:text-lg space-y-2 flex-grow'>
                <li>React.js</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>

          {/* Tools & Platforms Card */}
          <div ref={el => cardsRef.current[2] = el}
            className='shadow-lg shadow-emerald-900/20 rounded-lg overflow-hidden bg-[#2a2a2a]/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 transition-colors duration-300 flex flex-col h-full'>
            <div className="p-6 md:p-8 flex flex-col h-full">
              <h3 className='text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center'>Tools & Platforms</h3>
              <ul className='list-disc ml-6 md:ml-8 text-base md:text-lg space-y-2 flex-grow'>
                <li>Figma</li>
                <li>Firebase</li>
                <li>GitHub</li>
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>VS Code</li>
                <li>Kaggle</li>
                <li>NeonDB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Text Sections */}
        <div ref={el => sectionsRef.current[0] = el} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-8 md:mt-10 mb-4 md:mb-5 text-center sm:text-left'>Current Focus</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
          I am currently sharpening my skills in Data Structures and Algorithms (DSA) to improve my problem-solving abilities. 
          Additionally, I am eager to learn Spring Boot in the near future.
          </p>
        </div>

        <div ref={el => sectionsRef.current[1] = el} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>Additional Interests</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
          I have a foundational understanding of Machine Learning (ML) and Large Language Models (LLMs), which further fuels my passion for exploring cutting-edge technology solutions.
          </p>
        </div>

        <div ref={el => sectionsRef.current[2] = el} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>What I do in my free time?</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
          I enjoy listening to music, playing video games, and exploring anything related to technologies, new and old alike. Additionally, I love  photography and cooking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
