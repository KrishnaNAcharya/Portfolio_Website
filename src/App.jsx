import { useState } from 'react';
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Projects from "./components/Projects"
import About from "./components/About"
import Contact from "./components/Contact"

function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <div>
        <NavBar loading={loading} />
        <Home setLoading={setLoading} />
        <Projects />
        <About />
        <Contact />
      </div>
    </>
  )
}

export default App
