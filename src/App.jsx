import { Suspense, lazy, useState, useEffect } from 'react';
import Loading from './components/Loading';
import { Analytics } from "@vercel/analytics/react"
import { Vortex } from './components/ui/vortex';
import { Helmet } from 'react-helmet-async';

// Import NavBar directly for immediate loading
import NavBar from './components/NavBar';

// Lazy load heavy components
const Home = lazy(() => import('./components/Home'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const About = lazy(() => import('./components/About'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    // More comprehensive mobile detection on initialization
    if (typeof window !== 'undefined') {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return hasTouch || isSmallScreen || isMobileUA;
    }
    return false;
  });
  const siteTitle = "Krishna N Acharya | Full-Stack Developer & AI Enthusiast";
  const siteDescription = "Portfolio of Krishna N Acharya, a passionate Full-Stack Developer and AI & Data Science student. Explore projects, skills, and experience.";
  const siteUrl = "https://krishnanacharya.vercel.app"; // Replace with your actual deployed URL
  const socialImage = "/src/assets/Heroimg.jpg"; // Replace with a path to a suitable social sharing image

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768; // Back to 768px but with additional checks
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const matchMediaMobile = window.matchMedia('(max-width: 768px)').matches;
      
      setIsMobile(hasTouch || isSmallScreen || isMobileUA || matchMediaMobile);
    };
    
    // Check immediately on mount
    checkMobile();
    
    // Use both resize and matchMedia listeners
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = () => checkMobile();
    
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);  // Debug function to log all sections
  useEffect(() => {
    const debugSections = () => {
      // const sections = document.querySelectorAll('section');
      // console.log('App.jsx: All sections found:', Array.from(sections).map(s => ({
      //   tagName: s.tagName,
      //   name: s.getAttribute('name'),
      //   id: s.getAttribute('id'),
      //   className: s.className
      // })));
    };
    
    // Run after components are mounted
    const timer = setTimeout(debugSections, 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="Krishna N Acharya, Portfolio, Full-Stack Developer, AI, Data Science, Web Developer, Next.js, React, Node.js, Python" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={socialImage} /> {/* Make sure this image path is accessible */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={socialImage} /> {/* Make sure this image path is accessible */}
        <link rel="canonical" href={siteUrl} />
      </Helmet>      
      <Vortex
        backgroundColor="black"
        particleCount={isMobile ? 15 : 50}
        rangeY={600}
        baseHue={120}
        containerClassName="w-full min-h-screen"
        rangeSpeed={0.5}
      >        
        <main className="relative z-10">
          <Analytics />
          <NavBar loading={loading} />
          <Suspense fallback={<Loading />}>
            <Home setLoading={setLoading} />
            <Education />
            <Experience />
            <Projects />
            <Achievements />
            <About />
            <Contact />
          </Suspense>
        </main>
      </Vortex>
    </>
  );
}

export default App;
