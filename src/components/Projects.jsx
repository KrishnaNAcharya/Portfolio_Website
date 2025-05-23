import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect'; // Import HoverEffect

gsap.registerPlugin(ScrollTrigger);

const Projects = memo(function Projects() {
  const headerRef = useRef(null);
  // projectsRef is no longer needed for individual card animations with HoverEffect
  // const projectsRef = useRef([]); 

  const projectsData = [
    {
      id: 1,
      title: "SonicSeeker",
      description: "AI-driven audio and video analysis tool for transcription, diarization, summarization, and translation. Added NLP-based entity and sentiment analysis, waveform visualization, and mind map generation which runs locally.",
      tech: [
        "Next.js",
        "Faster-Whisper",
        "Compromise.js",
        "Sentiment.js",
        "facebooknllb",
        "facebookbart",
        "Ollama Ilama V3",
        "Aceternity",
        "MongoDB"

      ],
      github: "https://github.com/hackfest-dev/Hackfest25-56",
      //demo: "example.com"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Modern portfolio website with smooth animations, responsive design, and interactive UI. Built with React and styled with Tailwind CSS.",
      tech: ["Next.js", "GSAP", "Tailwind CSS", "ShadCN"],
      github: "https://github.com/KrishnaNAcharya/portfolio",
      demo: "https://krishnanacharya.vercel.app"
    },
    {
      id: 3,
      title: "HireIN-JP",
      description: "A recruitment platform with job posting, application tracking, and resume generation capabilities. Features advanced filtering for job listings.",
      tech: ["React.js", "Tailwind CSS", "Firebase"],
      github: "https://github.com/KrishnaNAcharya/HireIn-JP",
      demo: "https://hire-in-jp.vercel.app"
    },
    {
      id: 4,
      title: "HIMS",
      description: "Health Insurance Management System with automated form generation, admin panel, and policy management. Built with modern web technologies.",
      tech: ["React.js", "Express.js", "PostgreSQL", "Firebase"],
      github: "https://github.com/KrishnaNAcharya/HIMS",
      demo: "https://hims-f.onrender.com"
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
      tech: ["Python", "ML", "XGBoost", "CatBoost"," Random Forest","Linear Regression"],
      github: "https://www.kaggle.com/code/krishnanacharya/insureflow",
      //demo: "example.com"
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
      title: "Wipfli MentorStack",
      description: "A Stack Overflow-like knowledge sharing platform for IT & Management Mentorship and Problem Solving.",
      tech: ["Next.js", "GSAP", "Tailwind CSS", "ShadCN","Express.js", "PostgreSQL","Prisma","NeonDB"],
      github: "#",
      demo: "example.com",
      wip: true
    }
  ];

  const transformedProjects = projectsData.map(project => ({
    id: project.id,
    title: ( // Title is now JSX
      <>
        {project.title}
        {project.wip && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-700/30 text-yellow-400 rounded-full align-middle font-semibold">
            WIP
          </span>
        )}
      </>
    ),
    description: ( 
      <>
        {/* This div contains the main text and will grow */}
        <div className="flex-grow">
          <p>{project.description}</p>
        </div>
        {/* This div contains footer elements (tech stack, buttons) and will not grow */}
        <div className="mt-auto pt-4"> 
          <div className="mb-3"> 
            <strong className="text-zinc-300 text-xs font-semibold">Tech Stack:</strong>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tech.map((item, index) => (
                <span key={index} className="px-2 py-0.5 bg-emerald-700/30 text-emerald-400 rounded-full text-xs">
                  {item}
                </span>
              ))}
            </div>
            {/* WIP badge removed from here */}
          </div>
          {/* Container for Code and Demo buttons */}
          <div className="flex items-center gap-3"> {/* Changed to items-center, justify-between will be handled by ml-auto or if only one button */}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300"
              >
                View Code
              </a>
            )}
            {project.demo && project.demo !== "example.com" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 rounded-md duration-200 text-white ${project.github && project.github !== "#" ? 'ml-auto' : 'ml-0'}`} // Added ml-auto if View Code button exists
              >
                View Demo
              </a>
            )}
          </div>
        </div>
      </>
    ),
    link: project.github === "#" ? undefined : project.github, // Main card link remains GitHub repo
  }));


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

    // Individual project card animations are now handled by HoverEffect
    // projectsRef.current.forEach((project, index) => {
    //   gsap.fromTo(project,
    //     { 
    //       y: 100,
    //       opacity: 0
    //     },
    //     {
    //       y: 0,
    //       opacity: 1,
    //       duration: 1,
    //       scrollTrigger: {
    //         trigger: project,
    //         start: "top bottom",
    //         end: "top center+=100",
    //         scrub: 1
    //       }
    //     }
    //   );
    // });
  }, []);

  return (
    <section name="projects" className="min-h-screen w-full pt-8 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col justify-center w-full h-full">
        <div ref={headerRef} className="pb-10 md:pb-16 text-center sm:text-left">
          <h2 className="text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white">Projects</h2> {/* Ensure this is h2 */}
        </div>

        {/* Replace the existing grid with HoverEffect */}
        <HoverEffect items={transformedProjects} />
        
        {/* Old grid structure (to be removed or commented out):
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
        */}
      </div>
    </section>
  );
});

export default Projects;
