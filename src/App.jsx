import React, { Suspense, lazy, useState } from 'react';
import Loading from './components/Loading';
import { Analytics } from "@vercel/analytics/react"
import { Vortex } from './components/ui/vortex'; // Import Vortex

// Lazy load components
const NavBar = lazy(() => import('./components/NavBar'));
const Home = lazy(() => import('./components/Home'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Vortex
      backgroundColor="black"
      particleCount={500}
      rangeY={800}
      baseHue={120}
      containerClassName="w-full min-h-screen"
      rangeSpeed={0.75} // Add this line to reduce speed range
      // className for the children wrapper can be omitted or set as needed,
      // the default "relative z-10" should be fine.
      // We don't want the demo's "flex items-center..." styling here.
    >
      {/* All existing content goes inside Vortex as children */}
      <div className="relative z-10"> {/* Ensure content is above Vortex canvas if needed, though Vortex handles this for its children */}
        <Analytics />
        <Suspense fallback={<Loading />}>
          <NavBar loading={loading} />
          <Home setLoading={setLoading} />
          <Experience />
          <Projects />
          <About />
          <Contact />
        </Suspense>
      </div>
    </Vortex>
  );
}

export default App;
