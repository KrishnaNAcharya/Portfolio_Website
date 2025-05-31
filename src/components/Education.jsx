import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const Education = memo(function Education() {
  const headerRef = useRef(null);

  const educationData = [
    {
      id: 1,
      institution: "NMAM Institute of Technology",
      location: "Nitte, India",
      degree: "B.Tech in Artificial Intelligence and Data Science",
      score: "CGPA: 8.82",
      duration: "August 2022 - May 2026 (Expected)",
    },
    {
      id: 2,
      institution: "Canara PU College",
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
  ];

  const transformedEducation = educationData.map(edu => ({
    id: edu.id,
    title: edu.institution,
    description: (
      <>
        <div className="flex-grow">
          <p className="text-sm text-emerald-400 mb-1">{edu.degree}</p>
          <p className="text-sm text-zinc-400 mb-1">{edu.location}</p>
          <p className="text-sm text-zinc-400 mb-2">{edu.duration}</p>
          <p className="font-semibold text-emerald-300">{edu.score}</p>
        </div>
      </>
    ),
    // link: undefined, // No specific link for education cards
  }));

  useEffect(() => {
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
  }, []);

  return (
    <section name="education" className="min-h-screen w-full pt-8 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full">
        <div ref={headerRef} className="pb-10 md:pb-16 text-center sm:text-left">
          <h2 className="text-5xl sm:text-8xl font-bold inline text-white border-b-4 border-emerald-500">
            Education
          </h2>
        </div>
        <HoverEffect items={transformedEducation} />
      </div>
    </section>
  );
});

export default Education;
