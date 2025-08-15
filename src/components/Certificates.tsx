import { useEffect, useRef, memo, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HoverEffect } from './ui/card-hover-effect'
import { CertificateItem } from '@/lib/types'
import { ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Certificates = memo(function Certificates() {
  const headerRef = useRef<HTMLElement>(null)
  const scrollTriggerRef = useRef<gsap.core.Tween | null>(null)

  // Memoize static certificates data
  const certificatesData = useMemo((): CertificateItem[] => [
    {
      id: 1,
      title: "Introduction to Japanese Language and Culture",
      issuer: "NPTEL - Indian Institute of Technology, Kanpur",
      date: "January-April 2025",
      url: "https://drive.google.com/file/d/15uJE-YOmuBb1HzSzSEkGbAZzMi6vu87f/view?usp=sharing",
      description: "Successfully completed a comprehensive 12-week intensive online course covering Japanese language fundamentals and cultural immersion through NPTEL. Mastered essential Japanese writing systems including all 46 Hiragana and Katakana characters, plus introduction to over 100 basic Kanji with proper stroke order and radicals.",
      skills: ["Japanese Language", "Cultural Understanding", "Communication", "Cross-cultural Competency"]
    },
    {
      id: 2,
      title: "Java Programming I",
      issuer: "University of Helsinki, Finland",
      date: "June, 2023",
      url: "https://drive.google.com/file/d/1aOA1W4XusvSTTbQ4Q95jtdONdGaZNx3D/view?usp=sharing",
      description: "Successfully completed the Java Programming I course as part of the Java Programming MOOC series by University of Helsinki. This comprehensive course covers Java fundamentals, object-oriented programming concepts, and practical coding exercises.",
      skills: ["Java Programming", "Object-Oriented Programming", "Data Structures", "Algorithm Implementation"]
    },
    {
      id: 3,
      title: "Generative AI & Prompt Engineering Workshop",
      issuer: "Finite Loop Club - NMAM Institute of Technology",
      date: "December 1, 2023",
      url: "https://drive.google.com/file/d/1337oybR8-wbkX0KPd2-JsLs-L9DA4Xwk/view?usp=sharing",
      description: "Participated in an intensive workshop on Generative AI and Prompt Engineering, exploring cutting-edge AI technologies and practical applications. The workshop covered prompt design, AI model interactions, and real-world use cases.",
      skills: ["Generative AI", "Prompt Engineering", "AI Model Interaction", "Machine Learning"]
    },
    {
      id: 4,
      title: "Blockchain Essentials: A Hands-On Workshop",
      issuer: "NMAM Institute of Technology",
      date: "January 25, 2025",
      url: "https://drive.google.com/file/d/1bTMHFZzq4kZHM0F6SIa_2DXG3c5WsC4-/view?usp=sharing",
      description: "Participated in a comprehensive one-day workshop on blockchain fundamentals organized by the Department of Artificial Intelligence & Data Science at NMAM Institute of Technology, Nitte.",
      skills: ["Blockchain Fundamentals", "Hands-on Experience", "Cryptocurrency", "Distributed Ledger Technology"]
    },
    {
      id: 5,
      title: "Creating Responsive Web Pages using Bootstrap 4",
      issuer: "Infosys Springboard",
      date: "April 17, 2025",
      url: "https://drive.google.com/file/d/19D8wILJ5BOAWRoBkp2k8ruDUW9oJ9UgO/view?usp=sharing",
      description: "Successfully completed a comprehensive course on responsive web development using Bootstrap 4 framework. The course covered modern web design principles, responsive layouts, CSS framework implementation, and mobile-first development approaches.",
      skills: ["Bootstrap 4", "Responsive Design", "Mobile-First Development", "Frontend Development"]
    },
    {
      id: 6,
      title: "Flutter Development Workshop",
      issuer: "DLithe - NMAM Institute of Technology",
      date: "March 20, 2025",
      url: "https://drive.google.com/file/d/1VpyRNl_Nv7Hehm0opKHmgJgG-VcVKj9a/view?usp=sharing",
      description: "Participated in an intensive 3-day Flutter development workshop focused on mobile app development using the Flutter framework. The workshop provided in-depth knowledge and hands-on experience in UI design, state management, navigation, and API integration, culminating in a capstone project.",
      skills: ["Flutter Framework", "Mobile App Development", "State Management", "Dart Programming"]
    }
  ], [])

  // Memoize certificate button click handler
  const handleCertificateClick = useCallback((e: React.MouseEvent, verificationUrl?: string) => {
    e.stopPropagation()
    if (verificationUrl && verificationUrl !== "#") {
      window.open(verificationUrl, '_blank', 'noopener,noreferrer')
    }
  }, [])

  // Memoize view certificate button rendering
  const renderViewButton = useCallback((certificate: CertificateItem) => {
    const hasValidUrl = certificate.url && certificate.url !== "#"
    return (
      <a
        href={hasValidUrl ? certificate.url : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={hasValidUrl ? (e) => handleCertificateClick(e, certificate.url) : (e) => e.preventDefault()}
        className={`ml-0 md:ml-2 mt-4 md:mt-0 px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-normal block md:inline-block w-full md:w-auto text-center ${!hasValidUrl ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
        aria-label={`View ${certificate.title} certificate`}
        tabIndex={hasValidUrl ? 0 : -1}
      >
        View Certificate
      </a>
    )
  }, [handleCertificateClick])

  // Memoize transformed certificates to prevent recreation on every render
  const transformedCertificates = useMemo(() => 
    certificatesData.map(certificate => ({
      id: certificate.id,
      title: (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 w-full">
          <span className="whitespace-normal">{certificate.title}</span>
          {/* Show button on right side only on md+ screens */}
          <span className="hidden md:block">{renderViewButton(certificate)}</span>
        </div>
      ) as ReactNode,
      description: (
        <div className="flex-grow space-y-3">
          {/* Organization and Date */}
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-emerald-400 font-semibold">{certificate.issuer}</p>
            <p className="text-xs text-gray-400">{certificate.date}</p>
          </div>
          {/* Description */}
          <p className="text-sm leading-relaxed">{certificate.description}</p>
          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-emerald-400 font-medium">Skills Acquired:</p>
              <div className="flex flex-wrap gap-1">
                {certificate.skills.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2 py-0.5 bg-gray-700/50 text-gray-300 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {certificate.skills.length > 4 && (
                  <span className="px-2 py-0.5 bg-gray-700/50 text-gray-300 rounded text-xs">
                    +{certificate.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
          {/* Show button below description only on mobile */}
          <span className="block md:hidden mt-2">{renderViewButton(certificate)}</span>
        </div>
      ) as ReactNode,
      link: certificate.url || "#",
    })),
    [certificatesData, renderViewButton]
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
      id="certifications" 
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="certifications-heading"
      role="region"
      data-name="certifications"
    >
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full px-4 md:px-10">
        <header ref={headerRef} className="pb-6 md:pb-8 text-center sm:text-left">
          <h2 
            id="certifications-heading"
            className="text-5xl sm:text-8xl font-bold inline text-white border-b-4 border-emerald-500"
          >
            Certifications
          </h2>
        </header>
        <main aria-label="Professional certifications and credentials">
          <HoverEffect items={transformedCertificates} className="grid grid-cols-1 gap-6 md:gap-8 py-4" />
        </main>
      </div>
    </section>
  )
})

Certificates.displayName = 'Certificates'

export default Certificates
