import Hero from "../assets/Heroimg.jpg";
import Loading from './Loading';
import { MdArrowRightAlt } from "react-icons/md";
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

const Home = memo(function Home({ setLoading }) {
  const [localLoading, setLocalLoading] = useState(true);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileButtonRef = useRef(null);

  const handleLoadingComplete = useCallback(() => {
    setLocalLoading(false);
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    const timer = setTimeout(handleLoadingComplete, 300);
    return () => clearTimeout(timer);
  }, [handleLoadingComplete]);

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
      }, "-=0.8");

      // Animate the description
      tl.from(descriptionRef.current, {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.6");

      // Animate the desktop button
      tl.from(buttonRef.current, {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.6");

      // Animate the mobile button
      tl.from(mobileButtonRef.current, {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.8");
    }
  }, [localLoading]);

  if (localLoading) {
    return <Loading />;
  }

  return (
    <section name="home" className="min-h-screen w-full pt-20 md:pt-24 pb-8 md:pb-16 flex items-center">
      <div className='max-w-[1440px] w-full mx-auto flex flex-col items-center justify-center px-4 md:px-10 md:flex-row md:gap-20'>
        <div className='flex flex-col justify-center w-full text-center md:text-left md:w-3/5'>
          <h1 ref={textRef} className='text-4xl sm:text-5xl md:text-[5.5rem] font-bold text-white'>
            Hello there! My name is {" "}
            <span className='animate-shine'>
              Krishna
            </span>.
          </h1>
          <div ref={descriptionRef} className="text-white text-lg md:text-2xl py-4 md:py-5 max-w-3xl text-justify leading-relaxed">
            <p className="mb-3 text-justify">
              Hey, I&apos;m Krishna N Acharya, a final-year AI & Data Science student at NMAMIT. I&apos;m into full-stack development, always exploring the latest in tech, and I love messing around with new (and old) tools just to see what they can do. I love focusing on building good user experience, high performance, and top efficiency – maybe a little too much, leaning towards perfectionism. I can&apos;t seem to run away from it.
            </p>
            <p className="mb-3 text-justify">
              Outside the usual coding grind, I keep up with tech news, dive deep into random research rabbit holes, and enjoy photography, music, and, once every 12 full moons, video games.
            </p>
            <p className="text-justify">
              If you&apos;re looking for me, I&apos;m probably geeking out over some new tech or testing something weird just because I can.
            </p>
          </div>
          <br className="hidden md:block" />
          {/* Desktop Resume Button - only shown on md screens and larger */}
          <div ref={buttonRef} className="w-full md:w-auto hidden md:block">
            <a href="https://drive.google.com/file/d/1jij_sBBopi7xNwLMB1qvE0s7_qyXIm6s/view?usp=sharing" target="_blank" rel="noopener noreferrer" 
               className="w-full md:w-auto">
              <button className="w-full md:w-auto text-white group border-2 border-emerald-500 px-8 py-4 my-3 flex items-center justify-center md:justify-start btn-fill-animation hover:border-emerald-500">
                Resume <MdArrowRightAlt className="ml-2 text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
          </div>
        </div>
        
        {/* Hero Image - shown on all screen sizes now */}
        <div ref={imageRef} className='flex mt-10 mb-6 md:mt-0 md:mb-0 w-full md:w-2/5 justify-center relative'>
          <img 
            src={Hero} 
            alt="Krishna N Acharya - Portfolio Hero Image"
            className="rounded-3xl w-4/5 md:w-full object-cover border-2 border-emerald-400 transition-colors duration-300 shadow-xl shadow-emerald-900/20 hover:border-emerald-300 hover:shadow-emerald-500/20" 
          />
          
          {/* Location and Role boxes - Desktop only */}
          <div className="hidden md:block absolute inset-0">
            {/* Location box - positioned more inside top-left edge */}
            <div className="absolute -top-2 -left-2 bg-black/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30 shadow-lg">
              <div className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-base font-semibold">Mangaluru</div>
                  <div className="text-sm text-gray-300">Karnataka, India</div>
                </div>
              </div>
            </div>
            
            {/* Role box - positioned more inside bottom-right edge */}
            <div className="absolute -bottom-2 -right-2 bg-black/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30 shadow-lg">
              <div className="text-white text-right">
                <div className="text-base font-semibold">Full Stack & ML Developer</div>
                <div className="text-sm text-emerald-400">AI Engineer and Enthusiast</div>
              </div>
            </div>
          </div>

          {/* Location and Role boxes - Mobile only */}
          <div className="md:hidden absolute inset-0">
            {/* Location box - positioned more inside for mobile */}
            <div className="absolute -top-1 -left-1 bg-black/80 backdrop-blur-md rounded-lg px-3 py-2 border border-white/30 shadow-lg">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">Mangaluru</div>
                  <div className="text-xs text-gray-300">Karnataka, India</div>
                </div>
              </div>
            </div>
            
            {/* Role box - positioned more inside for mobile */}
            <div className="absolute -bottom-1 -right-1 bg-black/80 backdrop-blur-md rounded-lg px-3 py-2 border border-white/30 shadow-lg">
              <div className="text-white text-right">
                <div className="text-sm font-semibold">Full Stack & ML Developer</div>
                <div className="text-xs text-emerald-400">AI Engineer and Enthusiast</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Resume Button - only shown on screens smaller than md */}
        <div ref={mobileButtonRef} className="w-full md:hidden">
          <a href="https://drive.google.com/file/d/1jij_sBBopi7xNwLMB1qvE0s7_qyXIm6s/view?usp=sharing" target="_blank" rel="noopener noreferrer" 
             className="w-full">
            <button className="w-full text-white group border-2 border-emerald-500 px-8 py-4 my-3 flex items-center justify-center btn-fill-animation hover:border-emerald-500">
              Resume <MdArrowRightAlt className="ml-2 text-xl group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
});

Home.propTypes = {
  setLoading: PropTypes.func.isRequired
};

export default Home;
