import { useEffect, useRef, memo, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HoverEffect } from './ui/card-hover-effect'
import { ExperienceItem } from '@/lib/types'
import { ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Experience = memo(function Experience() {
  const headerRef = useRef<HTMLElement>(null)
  const scrollTriggerRef = useRef<gsap.core.Tween | null>(null)

  // Memoize static data to prevent unnecessary re-computation
  const experiencesData = useMemo((): ExperienceItem[] => [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Inspirante Technologies Private Limited",
      location: "Remote, India",
      period: "May 2025 - Present",
      description: [
        "Developed an enterprise-grade College ERP system handling academic workflows such as attendance, enrollment, assessments, and multi-role dashboards using Next.js 15, TypeScript, PostgreSQL, and Prisma ORM, while mentoring junior developers.",
        "Implemented scalable RESTful APIs with modular routing, JWT-based RBAC, and CSV import/export pipelines, ensuring robust validation across student, teacher, and admin workflows.",
        "Designed a normalized relational schema with 40+ entities and 20+ tables supporting electives, multi-attempt assessments, and semester-wise offerings with department-based restrictions.",
        "Optimized performance and cost with Prisma connection pooling, filtered queries, and selective data inclusion, enabling seamless usage for over 10,000+ users."
      ],
      technologies: [
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
      title: "Full Stack Developer → Technical Advisor",
      company: "Intelligence and Data Science Engineers' Association",
      companyUrl: "https://idea-nmamit.in",
      location: "NMAM Institute of Technology, Nitte",
      period: "August 2024 - Present",
      certificateUrl: "https://drive.google.com/file/d/1hMHxjINLXC5sajj-U5HL3ngzGfRkqvUZ/view?usp=sharing",
      description: [
        "Built an advanced image gallery featuring a 3D carousel using Next.js 15, integrated with Cloudinary and styled with TypeScript and Tailwind CSS for AI and DS department Association, NMAM Institute of Technology, Nitte.",
        "Engineered a fully responsive and accessible UI with Framer Motion, Radix UI, and shadcn components, ensuring smooth animations and cross-device usability.",
        "Architected modular API routes and implemented NeonDB with Prisma ORM, leveraging Fuse.js for optimized fuzzy search, advanced category filtering, and high-performance data retrieval.",
        "Transitioned to Technical Advisor role (August 2025 onwards), now guiding a 10-member Agile team, leading sprint cycles, mentoring developers, and providing strategic technical consultation on architecture decisions and best practices."
      ],
      technologies: [
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
        "Technical Leadership",
        "CI/CD",
        "Git",
        "Vercel"
      ]
    },
  ], [])

  // Memoize skill rendering function
  const renderSkills = useCallback((skills: string[]) => {
    if (!skills || skills.length === 0) return null
    
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
    )
  }, [])

  // Memoize transformed experiences to prevent recreation on every render
  const transformedExperiences = useMemo(() => 
    experiencesData.map(exp => ({
      id: exp.id,
      title: (
        <div>
          <div className="text-2xl md:text-3xl font-bold">{exp.company}</div>
          <div className="text-base font-medium text-emerald-400">{exp.title}</div>
        </div>
      ) as ReactNode,
      description: (
        <>
          <p className="text-sm text-emerald-400 mb-2">{exp.period}</p>
          <p className="text-sm text-zinc-400 mb-2">{exp.location}</p>
          <ul className="list-disc pl-5 space-y-2">
            {exp.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {renderSkills(exp.technologies)}
          {/* Buttons container: desktop (hidden on mobile) */}
          {(exp.companyUrl || exp.certificateUrl) && (
            <div className="hidden md:flex justify-between items-center mt-4">
              {exp.companyUrl && (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View Website
                </a>
              )}
              {exp.certificateUrl && (
                <a
                  href={exp.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View Certificate
                </a>
              )}
            </div>
          )}
          {/* Buttons container: mobile visible */}
          {(exp.companyUrl || exp.certificateUrl) && (
            <div className="flex flex-col md:hidden gap-2 mt-3">
              {exp.companyUrl && (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-center"
                >
                  View Website
                </a>
              )}
              {exp.certificateUrl && (
                <a
                  href={exp.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-center"
                >
                  View Certificate
                </a>
              )}
            </div>
          )}
        </>
      ) as ReactNode,
    })), 
    [experiencesData, renderSkills]
  )

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: null as HTMLElement | null,
        start: "top bottom",
        end: "top center",
        scrub: 1
      }
    }
  }), [])

  useEffect(() => {
    if (!headerRef.current) return

    const element = headerRef.current
    const config = { ...animationConfig.to }
    config.scrollTrigger.trigger = element

    scrollTriggerRef.current = gsap.fromTo(element, animationConfig.from, config)

    // Cleanup function to prevent memory leaks
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [animationConfig])

  return (
    <section 
      id="experience" 
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="experience-heading"
      role="region"
      data-name="experience"
    >
      <div className='max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full px-4 md:px-10'>
        <header ref={headerRef} className='pb-6 md:pb-8 text-center sm:text-left'>
          <h2
            id="experience-heading"
            className="text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white"
            style={{ lineHeight: 1.1 }}
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
  )
})

Experience.displayName = 'Experience'

export default Experience
