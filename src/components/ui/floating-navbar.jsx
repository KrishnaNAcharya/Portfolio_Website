import { useState, useEffect, memo } from "react";
import { cn } from "../../lib/utils";
import PropTypes from 'prop-types';
import "./navbar-styles.css";

export const FloatingNav = memo(({ navItems, className }) => {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsFloating(currentScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);  const handleClick = (sectionName) => {
    console.log('FloatingNav: Clicking on', sectionName);
    
    // Simple approach - just scroll to the section by name
    const targetSection = sectionName.toLowerCase();
    const element = document.querySelector(`section[name="${targetSection}"]`);
    
    console.log(`FloatingNav: Looking for section[name="${targetSection}"]`, element);
    
    if (element) {
      console.log('FloatingNav: Found element, scrolling...');
      // Much larger offsets to ensure heading appears at top of viewport
      const offset = isFloating ? 0 : 0; // Significantly increased offsets
      const elementTop = element.offsetTop - offset;
      
      window.scrollTo({
        top: Math.max(0, elementTop),
        behavior: 'smooth'
      });
    } else {
      console.error(`FloatingNav: Section with name="${targetSection}" not found!`);
      // Log all available sections for debugging
      const allSections = document.querySelectorAll('section');
      console.log('FloatingNav: Available sections:', Array.from(allSections).map(s => ({
        name: s.getAttribute('name'),
        id: s.getAttribute('id')
      }))); 
    }
  };  return (
    <div
      className={cn(
        "navbar-container flex w-full items-center justify-center z-[5000] transition-all duration-300 ease-out fixed",
        isFloating ? "top-4 left-0 right-0" : "top-0 left-0 right-0",
        className
      )}
    >
      <div
        className={cn(
          "navbar-backdrop flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden",
          isFloating ? 
            "max-w-fit rounded-full px-12 py-3 space-x-8" :
            "w-full px-16 py-2 space-x-10"
        )}
        style={{
          background: isFloating ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.95)',
          backdropFilter: isFloating ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isFloating ? 'blur(20px)' : 'none',
          border: isFloating ? '1px solid rgba(255, 255, 255, 0.18)' : 'none',
          borderRadius: isFloating ? '50px' : '0px',
          boxShadow: isFloating ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        {navItems.map((navItem, idx) => (
          <button
            key={`link=${idx}`}
            onClick={() => handleClick(navItem.name)}            className={cn(
              "navbar-item relative items-center flex space-x-1 transition-colors duration-200",
              isFloating ? 
                "text-white hover:text-emerald-400 px-4 py-2" :
                "text-white hover:text-emerald-400 text-xl font-medium px-6 py-2"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className={cn(
              "hidden sm:block transition-colors duration-200",
              isFloating ? "text-base font-medium" : "text-xl font-semibold"
            )}>
              {navItem.name}
            </span>          </button>
        ))}
      </div>
    </div>
  );
});

FloatingNav.displayName = 'FloatingNav';

FloatingNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  className: PropTypes.string,
};
