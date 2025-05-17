import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect'; // Import HoverEffect

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef(null);
  // cardsRef is no longer needed for individual card animations with HoverEffect for these cards
  // const cardsRef = useRef([]); 
  const sectionsRef = useRef([]);

  const skillCategories = [
    {
      id: "prog-lang",
      title: "Programming Languages",
      description: (
        <ul className='list-disc ml-5 space-y-1'>
          <li>Java</li>
          <li>C</li>
          <li>C++</li>
          <li>Python</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>SQL</li>
          <li>R</li>
        </ul>
      ),
      // link: undefined, // No specific link for these cards
    },
    {
      id: "frameworks-libs",
      title: "Frameworks & Libraries",
      description: (
        <ul className='list-disc ml-5 space-y-1'>
          <li>React.js</li>
          <li>Next.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Tailwind CSS</li>
          <li>GSAP</li>
          <li>Redux</li>
          <li>TensorFlow</li>
          <li>PyTorch</li>
          <li>Scikit-learn</li>
        </ul>
      ),
      // link: undefined,
    },
    {
      id: "tools-platforms",
      title: "Tools & Platforms",
      description: (
        <ul className='list-disc ml-5 space-y-1'>
          <li>Git</li>
          <li>GitHub</li>
          <li>VS Code</li>
          <li>Docker</li>
          <li>Figma</li>
          <li>Firebase</li>
          <li>MongoDB</li>
          <li>MySQL</li>
          <li>PostgreSQL</li>
          <li>NeonDB</li>
          <li>Kaggle</li>
          <li>Jupyter Notebooks</li>
        </ul>
      ),
      // link: undefined,
    }
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

    // Cards animation is now handled by HoverEffect for the skill cards
    // cardsRef.current.forEach((card, index) => {
    //   gsap.fromTo(card,
    //     { 
    //       y: 100,
    //       opacity: 0
    //     },
    //     {
    //       y: 0,
    //       opacity: 1,
    //       duration: 1,
    //       scrollTrigger: {
    //         trigger: card,
    //         start: "top bottom",
    //         end: "top center+=100",
    //         scrub: 1
    //       }
    //     }
    //   );
    // });

    // Text sections animation (remains unchanged)
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
        
        {/* Use HoverEffect for the skill category cards */}
        <HoverEffect items={skillCategories} />

        {/* Old grid layout for cards (to be removed or commented out):
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10'>
          {/* Programming Languages Card * / }
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

          {/* Frameworks & Libraries Card * /}
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

          {/* Tools & Platforms Card * /}
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
        */}

        {/* Text Sections (remain unchanged) */}
        <div ref={el => sectionsRef.current[0] = el} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-8 md:mt-10 mb-4 md:mb-5 text-center sm:text-left'>Current Focus</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
          My current efforts are centered on enhancing my problem-solving capabilities by deepening my understanding of Data Structures and Algorithms (DSA). Simultaneously, I'm actively developing several projects, including NASAR, Wipfli MentorStack, and the IDEA Website. Alongside these technical pursuits, I am dedicated to maintaining my physical and mental well-being and am also diligently preparing for upcoming placement opportunities.
          </p>
        </div>

        <div ref={el => sectionsRef.current[1] = el} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>Additional Interests</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
          Beyond my primary focus, I possess a foundational understanding of Machine Learning (ML) and Large Language Models (LLMs), which fuels my passion for exploring cutting-edge technology solutions. I am also keenly interested in the future trajectory of AI, including its societal impact and the underlying hardware advancements that power these technologies.
          </p>
        </div>

        <div ref={el => sectionsRef.current[2] = el} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>What I do in my free time?</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
          In my leisure time, I enjoy listening to music, playing video games, and exploring a wide array of technologies, both new and old. Photography is another passion of mine. I also have a penchant for conducting in-depth research on various topics that capture my curiosity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
