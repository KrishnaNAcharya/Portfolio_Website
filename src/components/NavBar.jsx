import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from 'gsap';

const NavBar = ({ loading }) => {
  const [nav, setNav] = useState(false);
  const linksRef = useRef([]);
  const navbarRef = useRef(null);

  const links = [
    { id: 1, link: 'Home' },
    { id: 2, link: 'Projects' },
    { id: 3, link: 'Skills' },  // This matches the section name now
    { id: 4, link: 'Contact' },
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
    <div ref={navbarRef} className="flex justify-between items-center w-full h-16 text-white bg-[#2a2a2a]/80 backdrop-blur-sm fixed top-0 left-0 px-4 z-50">
      <div onClick={() => setNav(!nav)} className="cursor-pointer md:hidden z-50">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <ul className={`flex flex-col md:flex-row md:items-center absolute md:static top-16 left-0 w-full md:w-auto h-[calc(100vh-4rem)] md:h-auto bg-[#2a2a2a]/95 md:bg-transparent justify-center items-center gap-4 transition-transform duration-300 ease-out ${nav ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:ml-auto`}>
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
    </div>
  );
}

export default NavBar;
