import { Suspense, lazy, useState } from 'react';
import Loading from './components/Loading';
import { Analytics } from "@vercel/analytics/react"
import { Vortex } from './components/ui/vortex';
import { Helmet } from 'react-helmet-async';

// Lazy load components
const NavBar = lazy(() => import('./components/NavBar'));
const Home = lazy(() => import('./components/Home'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const About = lazy(() => import('./components/About'));
const Education = lazy(() => import('./components/Education')); // Import Education
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [loading, setLoading] = useState(true);
  const siteTitle = "Krishna N Acharya | Full-Stack Developer & AI Enthusiast";
  const siteDescription = "Portfolio of Krishna N Acharya, a passionate Full-Stack Developer and AI & Data Science student. Explore projects, skills, and experience.";
  const siteUrl = "https://krishnanacharya.vercel.app"; // Replace with your actual deployed URL
  const socialImage = "/src/assets/Heroimg.jpg"; // Replace with a path to a suitable social sharing image

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
        particleCount={50}
        rangeY={800}
        baseHue={120}
        containerClassName="w-full min-h-screen"
        rangeSpeed={0.75}
      >
        <main className="relative z-10"> {/* Changed div to main */}
          <Analytics />
          <Suspense fallback={<Loading />}>
            <NavBar loading={loading} />
            <Home setLoading={setLoading} />
            <Education /> {/* Moved Education here */}
            <Experience />
            <Projects />
            <Achievements />
            <About />
            <Contact />
          </Suspense>
        </main> {/* Changed div to main */}
      </Vortex>
    </>
  );
}

export default App;
