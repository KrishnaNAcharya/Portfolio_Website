import React from 'react';
import Hero from "../assets/Heroimg.jpg";
import Loading from './Loading';
import { MdArrowRightAlt } from "react-icons/md";
import { useState, useEffect } from 'react';

const Home = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div name="home" className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800">
      <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
        <div className='flex flex-col justify-center h-full'>
          <h2 className='text-4xl sm:text-7xl font-bold text-white'>
            Hello there! My name is {" "}
            <span className='animate-shine'>
              Krishna
            </span>.
          </h2>
          <br />
          <p className="text-white text-xl py-4 max-w-md text-justify leading-relaxed">
            Hi there! I'm Krishna N Acharya, a 3rd-year student at NMAMIT, currently pursuing a degree in Artificial Intelligence and Data Science.
            I'm passionate about full-stack development and love exploring the latest technologies. Outside of coding,
            when I'm not glued to my screen, you can find me catching up on the latest tech news or trying out new hobbies.
            Let's connect and talk tech, cats or dogs, and anything else that sparks our interest!
          </p>
          <br />
          <div>
            <a href="https://drive.google.com/file/d/10QODijqMzTahOJqRXb-nH6PJ6oBy5JZI/view" target="_blank" rel="noopener noreferrer">
              <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-emerald-500 hover:border-emerald-500 glow">
                Resume <MdArrowRightAlt className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
          </div>
        </div>
        <div className='mt-8 md:mt-0 md:ml-8'>
          <img src={Hero} alt="Hero" className="rounded-2xl mx-auto w-2/3 md:w-full" />
        </div>
      </div>
    </div>
  );
}

export default Home;
