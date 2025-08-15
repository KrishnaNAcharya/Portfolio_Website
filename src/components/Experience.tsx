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
      title: "Full Stack Developer",
      company: "Intelligence and Data Science Engineers' Association",
      companyUrl: "https://idea-nmamit.in",
      location: "NMAM Institute of Technology, Nitte",
      period: "August 2024 - Present",
      description: [
        "Built a sophisticated image gallery page with 25+ state variables, a 3D carousel, and semantic URL filters using Next.js 15, TypeScript and Tailwind CSS for AI and DS department Association, NMAM Institute of Technology, Nitte.",
        "Engineered a fully responsive and accessible UI with Framer Motion, Radix UI, and shadcn components, ensuring smooth animations and cross-device usability.",
        "Architected modular API routes and a relational PostgreSQL database with Prisma ORM and Fuse.js, enabling optimized fuzzy search, category-based filtering and performant data queries.",
        "Integrated Cloudinary for progressive image loading and CDN delivery, reducing bandwidth by 70% and followed Agile sprint cycles in a 10-member team using Git-based version control and CI/CD workflows using Vercel."
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
          {/* Website button: desktop (hidden on mobile) */}
          {exp.companyUrl && (
            <div className="hidden md:block mt-4">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                View Website
              </a>
            </div>
          )}
          {/* Website button: mobile visible */}
          {exp.companyUrl && (
            <div className="block md:hidden mt-3">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full inline-block text-center"
              >
                View Website
              </a>
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
