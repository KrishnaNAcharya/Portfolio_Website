import { useEffect, useRef, memo, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const Education = memo(function Education() {
  const headerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Memoize static education data
  const educationData = useMemo(() => [
    {
      id: 1,
      institution: "NMAM Institute of Technology",
      location: "Nitte, India",
      degree: "B.Tech in Artificial Intelligence and Data Science",
      score: "CGPA: 8.85",
      duration: "August 2022 - May 2026 (Expected)",
    },
    {
      id: 2,
      institution: "Canara Pre-University College",
      location: "Mangaluru, India",
      degree: "Class XII (Science - PCMC)",
      score: "Percentage: 91.16%",
      duration: "2020 - 2022",
    },
    {
      id: 3,
      institution: "BGS Education Centre",
      location: "Mangaluru, India",
      degree: "Class X (CBSE)",
      score: "Percentage: 85.6%",
      duration: "2019 - 2020",
    },
  ], []);

  // Memoize education description rendering
  const renderEducationDescription = useCallback((edu) => (
    <div className="flex-grow">
      <p className="text-sm text-emerald-400 mb-1">{edu.degree}</p>
      <p className="text-sm text-zinc-400 mb-1">{edu.location}</p>
      <p className="text-sm text-zinc-400 mb-2">{edu.duration}</p>
      <p className="font-semibold text-emerald-300">{edu.score}</p>
    </div>
  ), []);

  // Memoize transformed education data
  const transformedEducation = useMemo(() => 
    educationData.map(edu => ({
      id: edu.id,
      title: edu.institution,
      description: renderEducationDescription(edu),
    })), 
    [educationData, renderEducationDescription]
  );

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: null, // Will be set in useEffect
        start: "top bottom",
        end: "top center",
        scrub: 1
      }
    }
  }), []);

  useEffect(() => {
    if (!headerRef.current) return;

    const element = headerRef.current;
    const config = { ...animationConfig.to };
    config.scrollTrigger.trigger = element;

    scrollTriggerRef.current = gsap.fromTo(element, animationConfig.from, config);

    // Cleanup function to prevent memory leaks
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [animationConfig]);  return (    <section 
      id="education" 
      name="education" 
      className="w-full pt-12 md:pt-16 pb-8 md:pb-12"
      aria-labelledby="education-heading"
      role="region"
    >
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full px-4 md:px-10">
        <header ref={headerRef} className="pb-6 md:pb-8 text-center sm:text-left">
          <h2 
            id="education-heading"
            className="text-5xl sm:text-8xl font-bold inline text-white border-b-4 border-emerald-500"
          >
            Education
          </h2>
        </header>
        <main aria-label="Educational qualifications and achievements">
          <HoverEffect items={transformedEducation} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-4" />
        </main>
      </div>
    </section>
  );
});

export default Education;
