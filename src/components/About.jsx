import { useEffect, useRef, useMemo, useCallback, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const About = memo(() => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  // Memoize skill categories to prevent recreation on every render
  const skillCategories = useMemo(() => [
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
          <li>TensorFlow</li>
          <li>PyTorch</li>
          <li>Scikit-learn</li>
        </ul>
      ),
    },
    {
      id: "tools-platforms",
      title: "Tools & Platforms",
      description: (
        <ul className='list-disc ml-5 space-y-1'>
          <li>GitHub</li>
          <li>VS Code</li>
          <li>Postman</li>
          <li>Cloudinary</li>
          <li>Figma</li>
          <li>Firebase</li>
          <li>MongoDB</li>
          <li>MySQL</li>
          <li>PostgreSQL</li>
          <li>NeonDB</li>
          <li>Kaggle</li>
        </ul>
      ),
    }
  ], []);

  // Memoize GSAP animation configurations
  const animationConfig = useMemo(() => ({
    header: {
      from: { y: 50, opacity: 0 },
      to: {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: null, // Will be set dynamically
          start: "top bottom",
          end: "top center",
          scrub: 1
        }
      }
    },
    sections: {
      from: { y: 50, opacity: 0 },
      to: {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: null, // Will be set dynamically
          start: "top bottom-=50",
          end: "top center+=100",
          scrub: 1
        }
      }
    }
  }), []);

  // Memoize ref callback functions
  const setSectionRef = useCallback((index) => (el) => {
    sectionsRef.current[index] = el;
  }, []);

  // Memoize animation setup
  const setupAnimations = useCallback(() => {
    // Header animation
    if (headerRef.current) {
      const headerConfig = { ...animationConfig.header.to };
      headerConfig.scrollTrigger.trigger = headerRef.current;
      
      gsap.fromTo(headerRef.current, animationConfig.header.from, headerConfig);
    }

    // Text sections animation
    sectionsRef.current.forEach((section) => {
      if (section) {
        const sectionConfig = { ...animationConfig.sections.to };
        sectionConfig.scrollTrigger.trigger = section;
        
        gsap.fromTo(section, animationConfig.sections.from, sectionConfig);
      }
    });
  }, [animationConfig]);

  useEffect(() => {
    setupAnimations();
    
    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setupAnimations]);
  return (
    <section 
      id="skills" 
      name="skills" 
      className="w-full min-h-screen pt-32 md:pt-48 pb-16 md:pb-20"
      aria-labelledby="skills-heading"
      role="region"
    >
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full'>
        <header ref={headerRef} className='pb-10 md:pb-16 text-center sm:text-left'>
          <h2 
            id="skills-heading"
            className='text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white'
          >
            Skills & Hobbies
          </h2>
        </header>
        
        <section aria-label="Technical skills and expertise">
          <HoverEffect items={skillCategories} />
        </section>

        {/* Text Sections */}
        <article ref={setSectionRef(0)} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-8 md:mt-10 mb-4 md:mb-5 text-center sm:text-left'>Current Focus</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
            My current efforts are centered on enhancing my problem-solving capabilities by deepening my understanding of Data Structures and Algorithms (DSA). Simultaneously, I&apos;m actively developing several projects, including NASAR, Wipfli MentorStack, and the IDEA Website. Alongside these technical pursuits, I am dedicated to maintaining my physical and mental well-being and am also diligently preparing for upcoming placement opportunities.
          </p>
        </article>

        <article ref={setSectionRef(1)} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>Additional Interests</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
            Beyond my primary focus, I possess a foundational understanding of Machine Learning (ML) and Large Language Models (LLMs), which fuels my passion for exploring cutting-edge technology solutions. I am also keenly interested in the future trajectory of AI, including its societal impact and the underlying hardware advancements that power these technologies.
          </p>
        </article>

        <div ref={setSectionRef(2)} className='text-justify'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>What I do in my free time?</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
            During my leisure time, I enjoy listening to music, playing video games, and exploring a wide array of technologies, both new and old. Photography is another passion. I also have a penchant for conducting in-depth research on various topics that pique my curiosity. An interesting quirk: I don&apos;t really watch web series, anime, or movies – I simply read the plot summaries. It&apos;s much faster, and I still grasp the main points (blame my love-hate relationship with perfection and efficiency). So please, refrain from calling me a walking encyclopedia. Also, my Reddit and LeetCode accounts are impossible to find, so don&apos;t bother searching because I&apos;m a tad shy. Anyway, that&apos;s all I can yap about. Adios for now!
          </p>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
