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
    <section name="home" className="min-h-screen w-full pt-10 md:pt-24 pb-8 md:pb-16 flex items-center">
      <div className='max-w-[1440px] w-full mx-auto flex flex-col items-center justify-center px-4 md:px-10 md:flex-row md:gap-20'>
        <div className='flex flex-col justify-center w-full text-center md:text-left md:w-3/5'>
          <h1 ref={textRef} className='text-4xl sm:text-5xl md:text-[5.5rem] font-bold text-white'>
            Hello there! My name is {" "}
            <span className='animate-shine'>
              Krishna
            </span>.
          </h1>
          <div ref={descriptionRef} className="text-white text-lg md:text-2xl py-4 md:py-5 max-w-3xl text-justify leading-relaxed">
            <p className="mb-3">
              Hey, I'm Krishna N Acharya, a third-year AI & Data Science student at NMAMIT. I'm into full-stack development, always exploring the latest in tech, and I love messing around with new (and old) tools just to see what they can do. I love focusing on building good user experience, high performance, and top efficiency – maybe a little too much, leaning towards perfectionism. I can't seem to run away from it.
            </p>
            <p className="mb-3">
              Outside the usual coding grind, I keep up with tech news, dive deep into random research rabbit holes, and enjoy photography, music, and, once every 12 full moons, video games.
            </p>
            <p>
              If you're looking for me, I'm probably geeking out over some new tech or testing something weird just because I can.
            </p>
          </div>
          <br className="hidden md:block" />
          <div ref={buttonRef} className="w-full md:w-auto">
            <a href="https://drive.google.com/file/d/1CrKpsrni_YHl0RdTJwLYFdogMdyF3w4q/view?usp=sharing" target="_blank" rel="noopener noreferrer" 
               className="w-full md:w-auto">
              <button className="w-full md:w-auto text-white group border-2 border-emerald-500 px-8 py-4 my-3 flex items-center justify-center md:justify-start btn-fill-animation hover:border-emerald-500">
                Resume <MdArrowRightAlt className="ml-2 text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
          </div>
        </div>
        <div ref={imageRef} className='hidden md:flex mt-10 mb-20 md:mt-0 md:mb-0 w-full md:w-2/5 justify-center'>
          <img 
            src={Hero} 
            alt="Krishna N Acharya - Portfolio Hero Image"
            className="rounded-3xl w-4/5 md:w-full object-cover border-3 border-emerald-500 transition-colors duration-300 shadow-xl shadow-emerald-900/20" 
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
