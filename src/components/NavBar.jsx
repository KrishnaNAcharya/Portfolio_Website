import React, { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, link: 'Home' },
    { id: 2, link: 'Skills' },
    { id: 3, link: 'Projects' },
    { id: 5, link: 'Contact' },
  ];

  return (
    <div className="flex justify-between items-center w-full h-16 text-white bg-black fixed top-0 left-0 px-4 z-50">
      
      <div onClick={() => setNav(!nav)} className="cursor-pointer md:hidden z-50">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <ul className={`flex flex-col md:flex-row md:items-center absolute md:static top-16 left-0 w-full md:w-auto h-[calc(100vh-4rem)] md:h-auto bg-black md:bg-transparent justify-center items-center transition-all duration-300 ease-in-out ${nav ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full md:opacity-100 md:translate-x-0'} md:ml-auto`}>
        {links.map(({ id, link }) => (
          <li 
            key={id} 
            className="px-4 py-6 md:py-0 cursor-pointer font-medium hover:scale-110 duration-300 hover:text-emerald-500"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
