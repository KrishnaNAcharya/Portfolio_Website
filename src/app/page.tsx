'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import Loading from '@/components/Loading'
import { Vortex } from '@/components/ui/vortex'

// Import NavBar directly for immediate loading
import NavBar from '@/components/NavBar'

// Lazy load heavy components
const Home = lazy(() => import('@/components/Home'))
const Experience = lazy(() => import('@/components/Experience'))
const Projects = lazy(() => import('@/components/Projects'))
const Achievements = lazy(() => import('@/components/Achievements'))
const Publications = lazy(() => import('@/components/Publications'))
const Certificates = lazy(() => import('@/components/Certificates'))
const About = lazy(() => import('@/components/About'))
const Education = lazy(() => import('@/components/Education'))
const Contact = lazy(() => import('@/components/Contact'))

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false) // Initialize to false to match server state

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const matchMediaMobile = window.matchMedia('(max-width: 768px)').matches
      
      setIsMobile(hasTouch || isSmallScreen || isMobileUA || matchMediaMobile)
    }
    
    // Check immediately on mount
    checkMobile()
    
    // Use both resize and matchMedia listeners
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleMediaChange = () => checkMobile()
    
    window.addEventListener('resize', checkMobile)
    mediaQuery.addEventListener('change', handleMediaChange)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // Debug function to log all sections
  useEffect(() => {
    const debugSections = () => {
      // const sections = document.querySelectorAll('section');
      // console.log('App.jsx: All sections found:', Array.from(sections).map(s => ({
      //   tagName: s.tagName,
      //   name: s.getAttribute('name'),
      //   id: s.getAttribute('id'),
      //   className: s.className
      // })));
    }
    
    // Run after components are mounted
    const timer = setTimeout(debugSections, 1000)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <Vortex
      backgroundColor="black"
      particleCount={isMobile ? 15 : 50}
      rangeY={600}
      baseHue={120}
      containerClassName="w-full min-h-screen"
      rangeSpeed={0.5}
    >        
      <main className="relative z-10">
        <NavBar loading={loading} />          
        <Suspense fallback={<Loading />}>
          <Home setLoading={setLoading} />
          <Education />
          <Experience />
          <Projects />
          <Achievements />
          <Publications />
          <Certificates />
          <About />
          <Contact />
        </Suspense>
      </main>
    </Vortex>
  )
}
