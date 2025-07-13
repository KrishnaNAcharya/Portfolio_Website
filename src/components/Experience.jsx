import { useEffect, useRef, memo, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const Experience = memo(function Experience() {
  const headerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Memoize static data to prevent unnecessary re-computation
  const experiencesData = useMemo(() => [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Inspirante Technologies Private Limited",
      duration: "May 2025 - Present",
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Developed an enterprise-grade College ERP system handling academic workflows such as attendance, enrollment, assessments, and multi-role dashboards using Next.js 15, TypeScript, PostgreSQL, and Prisma ORM. Mentored junior developers and led code reviews to ensure best practices and maintainability across the team.
          </li>
          <li>
            Implemented scalable RESTful APIs with modular routing, JWT-based RBAC, and CSV import/export pipelines. Ensured robust validation and error handling across student, teacher, and admin workflows for secure and reliable operations.
          </li>
          <li>
            Designed a normalized relational schema with 40+ entities and 20+ tables supporting electives, multi-attempt assessments, and semester-wise offerings. Enforced department-based restrictions and granular access controls for academic integrity.
          </li>
          <li>
            Optimized performance and cost with Prisma connection pooling, filtered queries, and selective data inclusion. Enabled seamless usage for over 10,000+ users with minimal latency and efficient resource utilization.
          </li>
        </ul>
      ),
      skills: [
        "Next.js 15",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Express.js",
        "Prisma ORM",
        "JWT",
        "CSV",
        "RESTful APIs"
      ]      
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Intelligence and Data Science Engineers' Association",
      duration: "August 2024 - Present",
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Built a sophisticated image gallery page with 25+ state variables, a 3D carousel, semantic URL filters, and real-time fuzzy search using Next.js 15,TypeScript, and Tailwind CSS. Enhanced user experience with dynamic filtering and seamless navigation.
          </li>
          <li>
            Engineered a fully responsive and accessible UI with Framer Motion, Radix UI, and shadcn components, ensuring smooth animations, keyboard navigation, and cross-device usability for all users and devices.
          </li>
          <li>
            Architected modular API routes and a relational PostgreSQL database with Prisma ORM, enabling optimized full-text search, category-based filtering, and performant data queries for scalable content management.
          </li>
          <li>
            Integrated Cloudinary for progressive image loading and CDN delivery, reducing bandwidth by 70%. Collaborated in Agile sprints within a 10-member team, using Git-based version control and CI/CD workflows for efficient development.
          </li>
        </ul>
      ),
      skills: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Radix UI",
        "shadcn/ui",
        "PostgreSQL",
        "Prisma ORM",
        "Cloudinary",
        "Agile",
        "CI/CD",
        "Git"
      ]
    },
  ], []);

  // Memoize skill rendering function
  const renderSkills = useCallback((skills) => {
    if (!skills || skills.length === 0) return null;
    
    return (
      <div className="mt-4">
        <strong className="text-zinc-300 text-xs font-semibold">Tech Stack:</strong>
        <div className="flex flex-wrap gap-1 mt-1">
          {skills.map((skill, index) => (
            <span key={index} className="px-2 py-0.5 bg-emerald-700/30 text-emerald-400 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }, []);

  // Memoize transformed experiences to prevent recreation on every render
  const transformedExperiences = useMemo(() => 
    experiencesData.map(exp => ({
      id: exp.id,
      title: (
        <div>
          <div className="text-lg font-bold">{exp.company}</div>
          <div className="text-base font-medium text-emerald-400">{exp.role}</div>
        </div>
      ),
      description: (
        <>
          <p className="text-sm text-emerald-400 mb-2">{exp.duration}</p>
          <p>{exp.description}</p>
          {renderSkills(exp.skills)}
        </>
      ),
    })), 
    [experiencesData, renderSkills]
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
      id="experience" 
      name="experience" 
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="experience-heading"
      role="region"
    >
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full px-4 md:px-10'>
        <header ref={headerRef} className='pb-6 md:pb-8 text-center sm:text-left'>
          <h2 
            id="experience-heading"
            className='text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white'
          >
            Experience
          </h2>
        </header>
        
        <main aria-label="Professional work experience and accomplishments">
          <HoverEffect 
            items={transformedExperiences} 
            className="grid grid-cols-1 md:grid-cols-2 auto-cols-fr gap-6 md:gap-8 py-4" 
          />
        </main>
      </div>
    </section>
  );
});

export default Experience;
