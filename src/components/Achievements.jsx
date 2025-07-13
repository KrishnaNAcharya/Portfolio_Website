import { useEffect, useRef, memo, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const Achievements = memo(function Achievements() {
  const headerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Memoize static achievements data
  const achievementsData = useMemo(() => [
    {
      id: 1,
      title: "Hackfest 2025 - Runner Up",
      description: "Led the team to 2nd place at Hackfest 2025, a national hackathon hosted by the Finite Loop Club at NMAM Institute of Technology, competing among 628 teams.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/12IX6u7TaBYX1ZSWjVj9F45awucm8GOsg/view?usp=sharing"
    },
    {
      id: 2,
      title: "Hackfest 2024 - Top 15",
      description: "Among top 15 overall position and placed in the Top 3 in the Open Innovation track at Hackfest 2024, a national hackathon hosted by the Finite Loop Club at NMAM Institute of Technology, with over 300 participating teams.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/13ctWL3RuGc0my0zErnxp5IuGYqJj_IYq/view?usp=sharing"
    },
    {
      id: 3,
      title: "Locked in Reality (Incredia 2024) - Winner",
      description: "Won 1st place in 'Locked in Reality', a technical event held during Incredia 2024, the annual college fest of NMAM Institute of Technology.",
      category: "Technical Event",
      link: "https://drive.google.com/file/d/17d5bdK5GyXgm_SFpibwnA_5Mv9DUeQ-b/view?usp=sharing"
    },
    {
      id: 4,
      title: "Hackloop 2024 - Top 7",
      description: "Among Top 7 position at HackLoop 2024, a college-level hackathon hosted by the Finite Loop Club at NMAM Institute of Technology.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/1rVph358TfQZ8MbbkM6erqeLiCfV3EDkO/view?usp=drive_link"
    },
    {
      id: 5,
      title: "SIH 2024 Internal Hackathon - Qualified",
      description: "Selected for the national round of Smart India Hackathon (SIH) 2024 from the Internal Hackathon held at NMAM Institute of Technology, qualifying among 86,000+ participants.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/1G9XX5um5Yl4hu_asMG_mpkiYZGOEyZb2/view"
    },
  ], []);

  // Memoize certificate button click handler
  const handleCertificateClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Memoize certificate button rendering
  const renderCertificateButton = useCallback((link) => {
    if (!link) return null;
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCertificateClick}
        className="ml-0 md:ml-2 mt-4 md:mt-0 px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-normal block md:inline-block w-full md:w-auto text-center"
        aria-label="View certificate"
      >
        View Certificate
      </a>
    );
  }, [handleCertificateClick]);

  // Memoize transformed achievements to prevent recreation on every render
  const transformedAchievements = useMemo(() => 
    achievementsData.map(achievement => ({
      id: achievement.id,
      title: (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3 w-full">
          <span className="whitespace-normal">{achievement.title}</span>
          {/* Show button on right side only on md+ screens */}
          <span className="hidden md:block">{renderCertificateButton(achievement.link)}</span>
        </div>
      ),
      description: (
        <div className="flex-grow">
          <p className="text-sm text-emerald-400 mb-2">{achievement.category}</p>
          <p>{achievement.description}</p>
          {/* Show button below description only on mobile */}
          <span className="block md:hidden mt-2">{renderCertificateButton(achievement.link)}</span>
        </div>
      ),
      link: achievement.link,
    })),
    [achievementsData, renderCertificateButton]
  );

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: null, // Will be set in useEffect
        start: "top bottom",
        end: "top center",
        scrub: 1
      }
    }
  }), []);

  useEffect(() => {
    if (!headerRef.current) return;

    const element = headerRef.current;
    const config = { ...animationConfig.to };
    config.scrollTrigger.trigger = element;

    scrollTriggerRef.current = gsap.fromTo(element, animationConfig.from, config);

    // Cleanup function to prevent memory leaks
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [animationConfig]);  return (
    <section 
      id="achievements" 
      name="achievements" 
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="achievements-heading"
      role="region"
    >
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full">
        <header ref={headerRef} className="pb-6 md:pb-8 text-center sm:text-left">
          <h2 
            id="achievements-heading"
            className="text-5xl sm:text-8xl font-bold inline text-white border-b-4 border-emerald-500"
          >
            Achievements
          </h2>
        </header>
        <main aria-label="Academic and professional achievements">
          <HoverEffect items={transformedAchievements} className="grid grid-cols-1 gap-6 md:gap-8 py-4" />
        </main>
      </div>
    </section>
  );
});

export default Achievements;
