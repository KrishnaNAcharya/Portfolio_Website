import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { CustomIcons } from './ui/custom-icons';
import gsap from 'gsap';
import { FloatingNav } from './ui/floating-navbar';

const NavBar = ({ loading }) => {
  const [nav, setNav] = useState(false);
  const linksRef = useRef([]);
  const navbarRef = useRef(null);  const links = [
    { id: 1, link: 'home', icon: <CustomIcons.Home /> },
    { id: 2, link: 'education', icon: <CustomIcons.Education /> },
    { id: 3, link: 'experience', icon: <CustomIcons.Experience /> },
    { id: 4, link: 'projects', icon: <CustomIcons.Projects /> },
    { id: 5, link: 'achievements', icon: <CustomIcons.Achievements /> },
    { id: 6, link: 'skills', icon: <CustomIcons.Skills /> }, // Changed to lowercase 'skills'
    { id: 7, link: 'contact', icon: <CustomIcons.Contact /> },
  ];

  const navItems = links.map(item => ({
    name: item.link.charAt(0).toUpperCase() + item.link.slice(1), // Capitalize for display
    link: `#${item.link.toLowerCase()}`,
    icon: item.icon,
  }));  const handleClick = (sectionName) => {
    console.log('NavBar: Clicking on', sectionName);
    setNav(false); // Close mobile menu if open
    
    // Convert display name to section name
    const targetSection = sectionName.toLowerCase();
    const element = document.querySelector(`section[name="${targetSection}"]`);
    
    console.log(`NavBar: Looking for section[name="${targetSection}"]`, element);
    
    if (element) {
      console.log('NavBar: Found element, scrolling...');
      const offset = 0; // Significantly increased offset for mobile
      const elementTop = element.offsetTop - offset;
      
      window.scrollTo({
        top: Math.max(0, elementTop),
        behavior: 'smooth'
      });
    } else {
      console.error(`NavBar: Section with name="${targetSection}" not found!`);
      // Log all available sections for debugging
      const allSections = document.querySelectorAll('section');
      console.log('NavBar: Available sections:', Array.from(allSections).map(s => ({
        name: s.getAttribute('name'),
        id: s.getAttribute('id')
      })));
    }
  };
  useEffect(() => {
    if (!loading) {
      // Simplified animation for better performance
      const tl = gsap.timeline();
      
      tl.fromTo(navbarRef.current, 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      
      // Reduce stagger animation complexity
      tl.fromTo(linksRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, stagger: 0.05, ease: "power2.out" },
        "-=0.1"
      );
    }
  }, [loading]);  if (loading) {
    return (
      <div className="hidden md:block">        <div className="flex w-full items-center justify-center relative top-0 z-[5000]">
          <div 
            className="flex items-center justify-center w-full px-12 py-1 space-x-8"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            {links.map(({ id, link }) => (
              <div key={id} className="text-white text-xl font-medium px-4 py-1 opacity-50">
                {link}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Desktop navbar - starts at top, transforms to floating */}
      <div className="hidden md:block">
        <FloatingNav navItems={navItems} />
      </div>

      {/* Mobile navbar */}
      <div ref={navbarRef} className="flex justify-between items-center w-full h-12 md:hidden text-white fixed top-0 left-0 px-4 z-[70]"
           style={{
             background: 'rgba(0, 0, 0, 0.85)',
             backdropFilter: 'blur(2px)',
             WebkitBackdropFilter: 'blur(2px)',
           }}>
        {/* Mobile menu toggle */}
        <div onClick={() => setNav(!nav)} className="cursor-pointer md:hidden z-[70] relative">
          {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>
      </div>

      {/* Mobile menu backdrop and sidebar */}
      {nav && (
        <>
          {/* Full screen backdrop without blur */}
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/30" 
            onClick={() => setNav(false)}
          />            
          
          {/* Mobile navigation sidebar with frosted glass effect */}          
          <nav 
            className={`md:hidden fixed left-0 w-44 transition-transform duration-300 ease-out z-50`}
            onClick={e => e.stopPropagation()} 
            aria-label="Mobile navigation"            style={{
              top: '48px',
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.2)',
              height: 'auto',
              border: 'none',
              outline: 'none',
              transform: nav ? 'translateX(0) translateY(-1px)' : 'translateX(-100%) translateY(-1px)',
            }}
          >
            {/* Navigation content */}
            <div className="relative py-6 px-6">
              <ul className="flex flex-col gap-4">
                {links.map(({ id, link }, index) => (
                  <li 
                    key={id} 
                    ref={el => linksRef.current[index] = el}
                    onClick={() => handleClick(link)}
                    className="px-2 py-2 cursor-pointer font-medium text-white hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default NavBar;
