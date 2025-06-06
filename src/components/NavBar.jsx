import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { CustomIcons } from './ui/custom-icons';
import gsap from 'gsap';
import { FloatingNav } from './ui/floating-navbar';

const NavBar = ({ loading }) => {
  const [nav, setNav] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Add closing state
  const linksRef = useRef([]);
  const navbarRef = useRef(null);
  const sidebarRef = useRef(null);

  const links = [
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
      // Enhanced animation for better performance and visual appeal
      const tl = gsap.timeline();
      
      // Animate mobile navbar
      if (navbarRef.current) {
        tl.fromTo(navbarRef.current, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }
      
      // Animate desktop floating navbar elements (if they exist)
      const floatingNavElements = document.querySelectorAll('.navbar-item');
      if (floatingNavElements.length > 0) {
        tl.fromTo(floatingNavElements,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        );
      }
    }
  }, [loading]);  // Modified animation effect for sidebar
  useEffect(() => {
    if (sidebarRef.current) {
      if (nav && !isClosing) {
        // Opening animation - much faster
        gsap.fromTo(sidebarRef.current, 
          { 
            x: -176,
            opacity: 0
          },
          { 
            x: 0, 
            opacity: 1,
            duration: 0.15, // Reduced from 0.2
            ease: "power2.out"
          }
        );
        
        // Animate navigation items in - much faster
        gsap.fromTo(linksRef.current,
          { 
            x: -30,
            opacity: 0
          },
          { 
            x: 0,
            opacity: 1,
            duration: 0.1, // Reduced from 0.15
            stagger: 0.02, // Reduced from 0.03
            delay: 0.03, // Reduced from 0.05
            ease: "power2.out"
          }
        );
      } else if (isClosing) {
        // Closing animation - very fast
        gsap.to(linksRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.08, // Reduced from 0.1
          stagger: 0.015, // Reduced from 0.02
          ease: "power2.in",
          onComplete: () => {
            // Then animate sidebar out - very fast
            gsap.to(sidebarRef.current, {
              x: -176,
              opacity: 0,
              duration: 0.1, // Reduced from 0.15
              ease: "power2.in",
              onComplete: () => {
                // Close the sidebar after animation completes
                setNav(false);
                setIsClosing(false);
              }
            });
          }
        });
      }
    }
  }, [nav, isClosing]);  // Modified close handler
  const handleClose = () => {
    if (nav && !isClosing) {
      setIsClosing(true);
    }
  };

  if (loading) {
    return (
      <div className="hidden md:block">
        <div className="flex w-full items-center justify-center relative top-0 z-[5000]">
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
                {link.charAt(0).toUpperCase() + link.slice(1)} {/* Capitalize the first letter */}
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
             background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0) 100%)',
             backdropFilter: 'blur(2px)',
             WebkitBackdropFilter: 'blur(2px)',
             height: '35px', // Reduced from 40px to 35px
           }}>
        {/* Mobile menu toggle */}
        <div onClick={() => nav ? handleClose() : setNav(true)} className="cursor-pointer md:hidden z-[70] relative">
          {nav ? <FaTimes size={20} /> : <FaBars size={20} />} {/* Reduced icon size from 22 to 20 */}
        </div>
      </div>

      {/* Mobile menu backdrop and sidebar */}
      {(nav || isClosing) && (
        <>
          {/* Full screen backdrop without blur */}
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/30" 
            onClick={handleClose}
          />            
          
          {/* Mobile navigation sidebar with frosted glass effect */}          
          <nav 
            ref={sidebarRef}
            className={`md:hidden fixed left-0 w-44 z-50 rounded-r-2xl`}
            onClick={e => e.stopPropagation()} 
            aria-label="Mobile navigation"            
            style={{
              top: '35px',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.3) 100%)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.15)',
              height: 'auto',
              border: 'none',
              outline: 'none',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Navigation content */}
            <div className="relative py-6 px-6">
              <ul className="flex flex-col gap-4">
                {links.map(({ id, link }, index) => (
                  <li 
                    key={id} 
                    ref={el => linksRef.current[index] = el}
                    onClick={() => {
                      handleClick(link);
                      handleClose(); // Use handleClose instead of setNav(false)
                    }}
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
