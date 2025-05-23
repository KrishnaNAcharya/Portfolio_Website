import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';

gsap.registerPlugin(ScrollTrigger);

const Achievements = memo(function Achievements() {
  const headerRef = useRef(null);

  const achievementsData = [
    {
      id: 1,
      title: "Hackfest 2025 - Runner Up",
      description: "Secured 2nd place (runner-up) out of 628 teams in Hackfest 2025, a national-level hackathon.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/12IX6u7TaBYX1ZSWjVj9F45awucm8GOsg/view?usp=sharing"
    },
    {
      id: 2,
      title: "Hackfest 2024 - Top 15",
      description: "Achieved a Top 15 position and Top 3 among Open Innovation track among 300+ teams in Hackfest 2024.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/13ctWL3RuGc0my0zErnxp5IuGYqJj_IYq/view?usp=sharing"
    },
    {
      id: 3,
      title: "Locked in Reality (Incredia 2024) - Winner",
      description: "Won 1st place in 'Locked in Reality', a technical event during the Incredia 2024 fest.",
      category: "Technical Event",
      link: "https://drive.google.com/file/d/17d5bdK5GyXgm_SFpibwnA_5Mv9DUeQ-b/view?usp=sharing"
    },
    {
      id: 4,
      title: "Hackloop 2024 - Top 5",
      description: "Secured a Top 5 position in Hackloop 2024, a college-level hackathon.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/1rVph358TfQZ8MbbkM6erqeLiCfV3EDkO/view?usp=drive_link"
    },
    {
      id: 5,
      title: "IDEA Website - Developer",
      description: "Contributed as a developer on the technical team that built the official website for the Department of AI & DS, NMAMIT, Nitte.",
      category: "Web Development Contribution",
      //link: "https://idea.nmamit.in/" // Link to the IDEA website
    },
    {
      id: 6,
      title: "SIH 2024 Internal Hackathon - Qualified",
      description: "Qualified for the Smart India Hackathon (SIH) 2024 Internal Hackathon held at NMAMIT.",
      category: "Hackathon",
      link: "https://drive.google.com/file/d/1G9XX5um5Yl4hu_asMG_mpkiYZGOEyZb2/view"
    },
  ];

  const transformedAchievements = achievementsData.map(achievement => ({
    id: achievement.id,
    title: achievement.title,
    description: (
      <>
        <div className="flex-grow"> {/* Div for content that grows */}
          <p className="text-sm text-emerald-400 mb-2">{achievement.category}</p>
          <p>{achievement.description}</p>
        </div>
        {achievement.link && (
          <div className="mt-auto pt-4"> {/* Div for button, pushed to bottom */}
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300"
            >
              View Certificate
            </a>
          </div>
        )}
      </>
    ),
    link: achievement.link, // Main card link for clickable card area
  }));

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section name="achievements" className="min-h-screen w-full pt-8 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full">
        <div ref={headerRef} className="pb-10 md:pb-16 text-center sm:text-left">
          <h2 className="text-5xl sm:text-8xl font-bold inline text-white border-b-4 border-emerald-500">
            Achievements
          </h2>
        </div>
        <HoverEffect items={transformedAchievements} />
      </div>
    </section>
  );
});

export default Achievements;
