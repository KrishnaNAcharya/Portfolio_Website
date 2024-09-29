import React, { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {

  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, link: 'Home' },
    { id: 2, link: 'Skills' },
    { id: 3, link: 'Projects' },
    //{ id: 4, link: 'Experience' },
    { id: 5, link: 'Contact' },
  ];

  return (
    <div className="flex justify-between items-center w-full h-15 text-white bg-black fixed px-4 py-6">
      
      <div onClick={() => setNav(!nav)} className="pr-4 z-10 cursor-pointer md:hidden ml:auto">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <ul className={`flex flex-col md:flex-row md:flex md:ml-auto absolute md:static top-0 left-0 w-full md:w-auto h-screen md:h-auto bg-black md:bg-transparent justify-center items-center transition-all duration-900 ${nav ? 'flex' : 'hidden'}`}>
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
