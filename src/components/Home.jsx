import React from 'react';
import Hero from "../assets/Heroimg.jpg";
import Loading from './Loading';
import { MdArrowRightAlt } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Home = ({ setLoading }) => {
  const [localLoading, setLocalLoading] = useState(true);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLoading(false);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    if (!localLoading) {
      // Create a timeline for smoother animations
      const tl = gsap.timeline();

      // Animate the hero image
      tl.from(imageRef.current, {
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: "power4.out"
      });

      // Animate the heading
      tl.from(textRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.8"); // Start slightly before the previous animation ends

      // Animate the description
      tl.from(descriptionRef.current, {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.6");

      // Animate the button
      tl.from(buttonRef.current, {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.6");
    }
  }, [localLoading]);

  if (localLoading) {
    return <Loading />;
  }

  return (
    <section name="home" className="min-h-screen w-full pt-20 pb-16 md:pb-0 flex items-center">
      <div className='max-w-screen-xl w-full mx-auto flex flex-col items-center justify-center px-4 md:px-8 md:flex-row md:gap-16'>
        <div className='flex flex-col justify-center w-full text-center md:text-left md:w-3/5'>
          <h2 ref={textRef} className='text-3xl sm:text-4xl md:text-7xl font-bold text-white'>
            Hello there! My name is {" "}
            <span className='animate-shine'>
              Krishna
            </span>.
          </h2>
          <p ref={descriptionRef} className="text-white text-base md:text-xl py-4 max-w-2xl text-justify leading-relaxed">
            Hi there! I'm Krishna N Acharya, a 3rd-year student at NMAMIT, currently pursuing a degree in Artificial Intelligence and Data Science.
            I'm passionate about full-stack development and love exploring the latest technologies. Outside of coding,
            when I'm not glued to my keyboard, you can find me catching up on the latest tech news or trying out new technologies.
            Let's connect and talk tech, cats or dogs, and anything else that sparks our interest!
          </p>
          <br />
          <div ref={buttonRef}>
            <a href="https://drive.google.com/file/d/1x_qaE6DPhO02aUtoKaOBBJ4VJO3hhLxj/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <button className="text-white group border-2 border-emerald-500 px-6 py-3 my-2 flex items-center btn-fill-animation hover:border-emerald-500">
                Resume <MdArrowRightAlt className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
          </div>
        </div>
        <div ref={imageRef} className='mt-8 mb-16 md:mt-0 md:mb-0 w-full md:w-2/5 flex justify-center'>
          <img 
            src={Hero} 
            alt="Hero" 
            className="rounded-2xl w-4/5 md:w-full object-cover border-2 border-emerald-500 transition-colors duration-300 shadow-lg shadow-emerald-900/20" 
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
