import React, { Suspense, lazy, useState } from 'react';
import Loading from './components/Loading';
import { Analytics } from "@vercel/analytics/react"

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
