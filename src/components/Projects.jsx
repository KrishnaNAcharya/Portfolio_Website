import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = memo(function Projects() {
  const headerRef = useRef(null);
  const projectsRef = useRef([]);

  const projects = [
    {
      id: 1,
      title: "SonicSeeker",
      description: "AI audio tool featuring sentiment analysis, word clouds, entity recognition, and activity tracking. Integrated with Deepgram API for advanced voice processing.",
      tech: ["Next.js", "AI", "NLP", "Deepgram"],
      github: "https://github.com/hackfest-dev/HF24-Geek4",
      demo: "example.com"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Modern portfolio website with smooth animations, responsive design, and interactive UI. Built with React and styled with Tailwind CSS.",
      tech: ["React", "GSAP", "Tailwind CSS", "ShadCN"],
      github: "https://github.com/KrishnaNAcharya/portfolio",
      demo: "https://portfolio-nine-xi-33.vercel.app/"
    },
    {
      id: 3,
      title: "HireIN-JP",
      description: "A recruitment platform with job posting, application tracking, and resume generation capabilities. Features advanced filtering for job listings.",
      tech: ["React.js", "Tailwind CSS", "Firebase"],
      github: "https://github.com/KrishnaNAcharya/HireIn-JP",
      demo: "example.com"
    },
    {
      id: 4,
      title: "HIMS",
      description: "Health Insurance Management System with automated form generation, admin panel, and policy management. Built with modern web technologies.",
      tech: ["React.js", "Express.js", "PostgreSQL", "Firebase"],
      github: "https://github.com/KrishnaNAcharya/HIMS",
      demo: "example.com"
    },
    {
      id: 5,
      title: "Xtract",
      description: "Data analysis tool generating statistical insights from uploaded datasets. Features Python backend for processing and metric extraction.",
      tech: ["Express.js", "Python", "Tailwind CSS"],
      github: "https://github.com/KrishnaNAcharya/Xtract",
      demo: "example.com"
    },
    {
      id: 6,
      title: "InsureFlow",
      description: "ML model predicting insurance subscriptions using advanced algorithms. Achieved AUROC of 0.986 through optimized classifiers.",
      tech: ["Python", "ML", "XGBoost", "CatBoost"],
      github: "https://www.kaggle.com/code/krishnanacharya/insureflow",
      demo: "example.com"
    },
    // Work in Progress Projects
    {
      id: 7,
      title: "NASAR",
      description: "SAR image colorization using CycleGAN.",
      tech: ["Python","CycleGAN"],
      github: "https://github.com/KrishnaNAcharya/SAR",
      demo: "example.com",
      wip: true
    },
    {
      id: 8,
      title: "IDEA Department Website",
      description: "Website of IDEA, AI and Data Science Department, NMAMIT.",
      tech: ["Next.js", "GSAP", "Tailwind CSS"],
      github: "#",
      demo: "example.com",
      wip: true
    },
    {
      id: 9,
      title: "Work In Progress",
      description: "Work in Progress",
      tech: [],
      github: "#",
      demo: "example.com",
      wip: true
    }
  ];

  useEffect(() => {
    // Header animation
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

    // Project cards animation
    projectsRef.current.forEach((project, index) => {
      gsap.fromTo(project,
        { 
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "top center+=100",
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section name="projects" className="min-h-screen w-full pt-8 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full">
        <div className="pb-10 md:pb-16 text-center sm:text-left">
          <p className="text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white">Projects</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {projects.map(({ id, title, description, tech, github, demo, wip }, index) => (
            <div
              key={id}
              ref={el => projectsRef.current[index] = el}
              className="shadow-lg shadow-emerald-900/20 rounded-lg overflow-hidden bg-[#2a2a2a]/50 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500 transition-colors duration-300 flex flex-col h-full"
            >
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
                  {wip && (
                    <span className="px-2 py-1 text-sm bg-emerald-500/20 text-emerald-500 rounded-full">
                      WIP
                    </span>
                  )}
                </div>
                <p className="mb-4 md:mb-6 text-gray-300 text-base md:text-lg text-justify">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {tech.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-base">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-auto pt-4">
                  <a href={github} target="_blank" rel="noopener noreferrer" 
                    className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg duration-200 text-base md:text-lg">
                    Code
                  </a>
                  <a href={demo} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-2 border border-emerald-500 hover:bg-emerald-500/20 rounded-lg duration-200 text-base md:text-lg">
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
