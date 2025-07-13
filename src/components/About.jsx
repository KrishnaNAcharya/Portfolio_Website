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
        <ul className='list-disc ml-5 space-y-1 columns-2'>
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
        <ul className='list-disc ml-5 space-y-1 columns-2'>
          <li>React.js</li>
          <li>Next.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Tailwind CSS</li>
          <li>GSAP</li>
          <li>TensorFlow</li>
        </ul>
      ),
    },
    {
      id: "tools-platforms",
      title: "Tools & Platforms",
      description: (
        <ul className='list-disc ml-5 space-y-1 columns-2'>
          <li>GitHub</li>
          <li>VS Code</li>
          <li>Postman</li>
          <li>Cloudinary</li>
          <li>Prisma ORM</li>
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
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="skills-heading"
      role="region"
    >
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full'>
        <header ref={headerRef} className='pb-6 md:pb-8 text-center sm:text-left'>
          <h2 
            id="skills-heading"
            className='text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white'
          >
            Skills & Hobbies
          </h2>
        </header>
        
        <section aria-label="Technical skills and expertise">
          <HoverEffect items={skillCategories} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-4" />
        </section>

        {/* Text Sections */}
        <article ref={setSectionRef(0)} className='text-justify px-2 md:px-0'>
          <h3 className='text-3xl font-semibold mt-8 md:mt-10 mb-4 md:mb-5 text-center sm:text-left'>Current Focus</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
            I am currently focused on strengthening my problem-solving skills through an in-depth study of Data Structures and Algorithms (DSA). Alongside this, I am actively building projects such as MentorStack and the IDEA Website, applying full-stack development principles with an emphasis on performance, UX, and scalability. Beyond technical growth, I prioritize maintaining both physical and mental well-being and am preparing rigorously for upcoming placement opportunities.
          </p>
        </article>

        <article ref={setSectionRef(1)} className='text-justify px-2 md:px-0'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>Additional Interests</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
            I have a foundational understanding of Machine Learning (ML) and Large Language Models (LLMs), which drives my curiosity toward cutting-edge developments in AI. I&apos;m especially interested in the evolving landscape of artificial intelligence, its societal implications, real-world applications, and the hardware innovations that enable progress.
          </p>
        </article>

        <div ref={setSectionRef(2)} className='text-justify px-2 md:px-0'>
          <h3 className='text-3xl font-semibold mt-10 mb-5 text-center sm:text-left'>Outside the Code</h3>
          <p className='text-lg md:text-2xl text-white text-justify leading-relaxed'>
            In my downtime, I enjoy listening to music, playing video games, and exploring technologies, both new and vintage. I&apos;m also passionate about photography and often find myself deep in niche research topics just for the thrill of understanding something new.<br/>
            Fun fact: I rarely watch movies, series, or anime. Instead, I read the plot summaries. It&apos;s faster, more efficient, and oddly satisfying (yes, I&apos;m that person). And while I&apos;m somewhat active on platforms like Reddit and LeetCode, good luck finding me. I prefer to keep a low profile.
          </p>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
