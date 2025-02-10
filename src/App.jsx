import React, { Suspense, lazy, useState } from 'react';
import Loading from './components/Loading';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
// Lazy load components
const NavBar = lazy(() => import('./components/NavBar'));
const Home = lazy(() => import('./components/Home'));
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
       <SpeedInsights />
       <Analytics />
      <Suspense fallback={<Loading />}>
        <NavBar loading={loading} />
        <Home setLoading={setLoading} />
        <Projects />
        <About />
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;
