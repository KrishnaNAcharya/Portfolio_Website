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
      description: "Comprehensive AI-powered media analysis platform built with Next.js and Python. Features audio/video transcription using Whisper AI, speaker diarization with PyAnnote, sentiment analysis, entity recognition, and grammar analysis. Includes AI-powered summarization using BART, mind map generation with Ollama/Llama3, multi-language translation with NLLB-200, and YouTube integration. Built with advanced media player, interactive transcripts, WER/CER comparison, and MongoDB storage with GridFS.",
      tech: [
        "Next.js",
        "TypeScript",
        "Python",
        "Whisper AI",
        "PyAnnote",
        "Hugging Face",
        "Ollama Llama3",
        "MongoDB",
        "FFmpeg",
        "WaveSurfer.js"
      ],
      github: "https://github.com/hackfest-dev/Hackfest25-56",
      //demo: "example.com"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Modern React portfolio website with advanced animations and responsive design. Features lazy loading, GSAP scroll-triggered animations, Vortex particle background, and interactive UI components. Built with semantic HTML structure, custom hover effects, scroll-based animations, and optimized performance. Includes comprehensive sections for projects, experience, education, achievements, and skills with HoverEffect cards, SEO optimization with React Helmet, and Vercel Analytics integration.",
      tech: ["React.js", "Vite", "GSAP", "Tailwind CSS", "React Helmet", "Vercel Analytics"],
      github: "https://github.com/KrishnaNAcharya/portfolio",
      demo: "https://krishnanacharya.vercel.app"
    },
    {
      id: 3,
      title: "HireIN-JP",
      description: "Comprehensive React-based job portal connecting job seekers with employers. Features Firebase authentication with Google OAuth, advanced job search with multiple filters (job type, timings, eligibility), user profile management with resume uploads, and job posting capabilities for recruiters. Built with responsive design, real-time database updates, secure file storage, and role-based access control. Includes mobile-first approach with collapsible navigation and touch-friendly interfaces.",
      tech: ["React.js", "Firebase", "Tailwind CSS", "Firestore", "Firebase Auth", "React Router", "Material Tailwind"],
      github: "https://github.com/KrishnaNAcharya/HireIn-JP",
      demo: "https://hire-in-jp.vercel.app"
    },
    {
      id: 4,
      title: "HIMS",
      description: "Comprehensive Health Insurance Management System with multi-step application process, admin panel, and document generation. Features Firebase authentication with Google OAuth, role-based access control, and three insurance plans (Basic, Standard, Premium). Built with React + Vite frontend, Node.js/Express backend, and PostgreSQL database. Includes payment processing, family member management, health information tracking, and PDF generation for applications.",
      tech: ["React.js", "Express.js", "PostgreSQL", "Firebase", "Tailwind CSS", "Vite", "Node.js"],
      github: "https://github.com/KrishnaNAcharya/HIMS",
      demo: "https://hims-f.onrender.com"
    },
    {
      id: 5,
      title: "Xtract",
      description: "Full-stack statistical data analysis web application that enables users to upload CSV files and automatically generate comprehensive statistical insights and visualizations. Features robust encoding handling, eight different chart types (scatter plots, histograms, box plots, heat maps, etc.), and a complete analysis engine. Built with Express.js backend, Python data processing using Pandas/Matplotlib/Seaborn, and modern responsive frontend. Includes Docker support and automatic file cleanup for production deployment.",
      tech: ["Express.js", "Python", "Pandas", "Matplotlib", "Seaborn", "Tailwind CSS", "Multer", "Docker"],
      github: "https://github.com/KrishnaNAcharya/Xtract",
      demo: "example.com"
    },
    {
      id: 6,
      title: "InsureFlow",
      description: "Comprehensive ML project for insurance subscription prediction using advanced algorithms. Handled class imbalance using SMOTE techniques, implemented multiple models (XGBoost, Random Forest, CatBoost), and achieved 93.54% accuracy with 0.986 AUROC. Features outlier detection, feature importance analysis, and real-time prediction interface. Provides business insights for customer targeting and acquisition optimization.",
      tech: ["Python", "XGBoost", "CatBoost", "Random Forest", "SMOTE", "Flask", "Scikit-learn", "Pandas", "Matplotlib"],
      github: "https://www.kaggle.com/code/krishnanacharya/insureflow",
      //demo: "example.com"
    },
    // Work in Progress Projects
    {
      id: 7,
      title: "NASAR",
      description: "Comprehensive DL project for SAR image colorization. Built a ResNet34-based terrain classifier to categorize SAR images into urban, grassland, agricultural, and barren land types. Implemented a conditional GAN with U-Net generator and PatchGAN discriminator for realistic colorization. Features multiple loss functions (adversarial, L1, perceptual, feature matching), mixed precision training, and automatic terrain prediction pipeline.",
      tech: ["Python", "PyTorch", "Computer Vision", "GANs", "ResNet34", "U-Net", "PatchGAN", "CUDA", "Deep Learning"],
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
