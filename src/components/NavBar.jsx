import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from 'gsap';

const NavBar = ({ loading }) => {
  const [nav, setNav] = useState(false);
  const linksRef = useRef([]);
  const navbarRef = useRef(null);

  const links = [
    { id: 1, link: 'Home' },
    { id: 2, link: 'Education' }, // Moved Education up
    { id: 3, link: 'Experience' },// Adjusted ID
    { id: 4, link: 'Projects' },  // Adjusted ID
    { id: 5, link: 'Achievements' },// Adjusted ID
    { id: 6, link: 'Skills' },    
    { id: 7, link: 'Contact' },   
  ];

  const handleClick = (sectionName) => {
    setNav(false); // Close mobile menu if open
    const element = document.querySelector(`section[name="${sectionName.toLowerCase()}"]`);
    if (element) {
      const offset = element.offsetTop - 64; // Account for navbar height
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();

      // Simpler navbar background animation
      tl.fromTo(navbarRef.current, 
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }
      );

      // Simpler links animation
      tl.fromTo(linksRef.current,
        {
          opacity: 0,
          y: -10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }
  }, [loading]);

  if (loading) return null;

  return (
    <div ref={navbarRef} className="flex justify-between items-center w-full h-12 md:h-16 text-white bg-black/80 backdrop-blur-sm fixed top-0 left-0 px-4 z-50">
      <div onClick={() => setNav(!nav)} className="cursor-pointer md:hidden z-50">
        {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
      </div>

      {/* Mobile menu popup */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-3xl transition-opacity duration-300 ${nav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setNav(false)}>
        <nav className={`fixed left-0 top-12 w-60 bg-black/95 backdrop-blur-[100px] border-r border-b border-emerald-500/30 rounded-br-xl shadow-2xl shadow-emerald-900/20 transition-transform duration-300 ${nav ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()} aria-label="Mobile navigation">
          <ul className="flex flex-col p-3 gap-3">
            {links.map(({ id, link }, index) => (
              <li 
                key={id} 
                ref={el => linksRef.current[index] = el}
                onClick={() => handleClick(link)}
                className="px-3 py-1.5 cursor-pointer font-medium text-sm hover:text-emerald-500 hover:bg-emerald-500/10 rounded-md transition-all duration-200"
              >
                {link}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center ml-auto" aria-label="Desktop navigation"> {/* Wrapped ul in nav and added aria-label */}
        <ul className="flex items-center gap-4">
          {links.map(({ id, link }, index) => (
            <li 
              key={id} 
              ref={el => linksRef.current[index] = el}
              onClick={() => handleClick(link)}
              className="px-4 cursor-pointer font-medium hover:text-emerald-500 transition-colors duration-200"
            >
              {link}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
