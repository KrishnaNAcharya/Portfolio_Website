import { useEffect, useRef, memo, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HoverEffect } from './ui/card-hover-effect'
import { PublicationItem } from '@/lib/types'
import { ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Publications = memo(function Publications() {
  const headerRef = useRef<HTMLElement>(null)
  const scrollTriggerRef = useRef<gsap.core.Tween | null>(null)

  // Memoize static publications data
  const publicationsData = useMemo((): PublicationItem[] => [
    {
      id: 1,
      title: "Machine Learning Approach for Optimizing Insurance Customer Targeting Using CatBoost",
      authors: ["Krishna N Acharya", "Co-authors"],
      date: "2024",
      description: "Developed a machine learning-based predictive model using CatBoost algorithm to optimize telephonic marketing in the insurance sector. The system assesses insurance purchase probability based on demographic and socioeconomic factors, enhancing customer segmentation precision and enabling effective resource allocation. This AI-driven approach improves customer outreach, pricing strategies, and accelerates business expansion through data-driven insights.",
      url: "https://www.researchgate.net/publication/398267156_Machine_Learning_Approach_for_Optimizing_Insurance_Customer_Targeting_Using_Catboost",
      keywords: ["Machine Learning", "CatBoost", "Insurance Analytics", "Customer Segmentation", "Predictive Modeling", "AI-driven Marketing"]
    }
  ], [])

  // Memoize publication button click handler
  const handlePublicationClick = useCallback((e: React.MouseEvent, url?: string) => {
    e.stopPropagation()
    if (url && url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  // Memoize view publication button rendering
  const renderViewButton = useCallback((publication: PublicationItem) => {
    const hasValidUrl = publication.url && publication.url !== "#"
    return (
      <a
        href={hasValidUrl ? publication.url : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={hasValidUrl ? (e) => handlePublicationClick(e, publication.url) : (e) => e.preventDefault()}
        className={`ml-0 md:ml-2 mt-4 md:mt-0 px-5 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-normal block md:inline-block w-full md:w-auto text-center whitespace-nowrap ${!hasValidUrl ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
        aria-label={`View ${publication.title} publication`}
        tabIndex={hasValidUrl ? 0 : -1}
      >
        View Publication
      </a>
    )
  }, [handlePublicationClick])

  // Memoize transformed publications to prevent recreation on every render
  const transformedPublications = useMemo(() => 
    publicationsData.map(publication => ({
      id: publication.id,
      title: (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 w-full">
          <span className="whitespace-normal">{publication.title}</span>
          {/* Show button on right side only on md+ screens */}
          <span className="hidden md:block">{renderViewButton(publication)}</span>
        </div>
      ) as ReactNode,
      description: (
        <div className="flex-grow space-y-3">
          {/* Authors and Date */}
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-emerald-400 font-semibold">{publication.authors.join(", ")}</p>
            <p className="text-xs text-gray-400">{publication.date}</p>
          </div>
          {/* Description */}
          <p className="text-sm leading-relaxed">{publication.description}</p>
          {/* Keywords */}
          {publication.keywords && publication.keywords.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-emerald-400 font-medium">Keywords:</p>
              <div className="flex flex-wrap gap-1">
                {publication.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-emerald-700/30 text-emerald-400 rounded-full text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Show button below on mobile screens */}
          <div className="block md:hidden w-full">
            {renderViewButton(publication)}
          </div>
        </div>
      ) as ReactNode,
    })), 
    [publicationsData, renderViewButton]
  )

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: null as HTMLElement | null,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
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
      id="publications"
      data-name="publications"
      ref={headerRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-16 md:py-24"
      aria-labelledby="publications-heading"
    >
      <div className="max-w-7xl w-full">
        <h2
          id="publications-heading"
          className="text-4xl md:text-6xl font-bold text-center mb-12 md:mb-16 text-zinc-100"
        >
          Publications
        </h2>
        <HoverEffect items={transformedPublications} />
      </div>
    </section>
  )
})

export default Publications
