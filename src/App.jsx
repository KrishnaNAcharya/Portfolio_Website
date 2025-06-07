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
const Certificates = lazy(() => import('./components/Certificates'));
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
  });  const siteTitle = "Krishna N Acharya | Full-Stack Developer & AI Enthusiast";
  const siteDescription = "Passionate Full-Stack Developer specializing in AI, Data Science, and modern web technologies. Explore my innovative projects, technical skills, and professional experience in React, Node.js, Python, and machine learning.";
  const siteUrl = "https://www.krishnanacharya.me";
  const socialImage = "https://www.krishnanacharya.me/src/assets/Heroimg.jpg";

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
    <>      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="Krishna N Acharya, Full-Stack Developer, AI Engineer, Data Science, Web Developer, React Developer, Node.js, Python, Machine Learning, Artificial Intelligence, Portfolio, Software Engineer, Frontend Developer, Backend Developer, Mangaluru" />
        <meta name="author" content="Krishna N Acharya" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Krishna N Acharya - Full-Stack Developer Portfolio" />
        <meta property="og:site_name" content="Krishna N Acharya Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:image:alt" content="Krishna N Acharya Portfolio" />
        <meta name="twitter:creator" content="@krishnanacharya" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#10B981" />
        <meta name="msapplication-TileColor" content="#10B981" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />
        
        {/* Structured Data for Portfolio */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Krishna N Acharya",
            "url": siteUrl,
            "jobTitle": "Full-Stack Developer",
            "description": siteDescription,
            "image": socialImage,
            "sameAs": [
              "https://linkedin.com/in/krishna-n-acharya",
              "https://github.com/krishnanacharya"
            ],
            "knowsAbout": [
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Python",
              "Artificial Intelligence",
              "Data Science",
              "Machine Learning",
              "Full-Stack Development",
              "Web Development",
              "Software Engineering"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "NMAM Institute of Technology",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nitte",
                "addressCountry": "India"
              }
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mangaluru",
              "addressRegion": "Karnataka",
              "addressCountry": "India"
            }
          })}
        </script>
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
          <NavBar loading={loading} />          <Suspense fallback={<Loading />}>
            <Home setLoading={setLoading} />
            <Education />
            <Experience />
            <Projects />
            <Achievements />
            <Certificates />
            <About />
            <Contact />
          </Suspense>
        </main>
      </Vortex>
    </>
  );
}

export default App;
