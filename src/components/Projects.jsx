import { useEffect, useRef, memo, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverEffect } from './ui/card-hover-effect';
import SonicSeekerImg from '../assets/SonicSeeker.png';
import HIMSImg from '../assets/HIMS.png';
import HireInImg from '../assets/HireIn.png';
import NASARImg from '../assets/NASAR.jpg';
import PortfolioImg from '../assets/Portfolio.png';
import XtractImg from '../assets/Xtract.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = memo(function Projects() {
  const headerRef = useRef(null);

  // Memoize projects data to prevent recreation on every render
  const projectsData = useMemo(() => [
    {
      id: 1,
      title: "SonicSeeker: AI powered media analysis platform",
      image: SonicSeekerImg,
      description: (
        <div>
          <img
            src={SonicSeekerImg}
            alt="SonicSeeker project screenshot"
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            loading="lazy"
            draggable="false"
          />
          <ul className="list-disc pl-5 space-y-1">
            <li>Developed a full-stack AI media platform achieving 99.4% accurate real-time speech-to-text transcription with timestamps, using Next.js 15, Express.js, MongoDB Atlas, Hugging Face models, and OpenAI Faster-Whisper.</li>
            <li>Architected a flexible NoSQL schema enabling efficient storage, indexing, and retrieval of multilingual transcripts, speaker metadata, and sentiment tags with semantic search capabilities.</li>
            <li>Integrated Facebook NLLB-200’s distilled 600M, PyAnnote.audio, D3.js and Meta LLaMA 3 for multi-language translation, speaker diarization, and generative mind map summarization of dialogue flow and key speaker topics across media formats.</li>
            <li>Built NLP pipelines for speech summarization, emotion detection, entity extraction, and interactive synchronized playback with semantic search across 10+ languages using sentiment.js, compromise.js, Facebook BART, WaveSurfer.js, and FFmpeg.</li>
            <li>Engineered a scalable backend with RESTful APIs, Memoization, Batch processing, Model caching, JWT authentication, and file processing pipelines supporting 5+ formats, with CUDA acceleration improving processing speed by 90%.</li>
          </ul>
        </div>
      ),
      tech: ["Next.js 15", "Express.js", "MongoDB Atlas", "Hugging Face", "OpenAI Faster-Whisper", "PyAnnote.audio", "D3.js", "Meta LLaMA 3", "WaveSurfer.js", "CUDA"],
      github: "https://github.com/KrishnaNAcharya/SonicSeeker",
      demo: "https://sonicseeker.vercel.app"
    },
    {
      id: 2,
      title: "NASAR: Terrain-Aware SAR to RGB Translation using cGAN",
      image: NASARImg,
      description: (
        <div>
          <img
            src={NASARImg}
            alt="NASAR project screenshot"
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            loading="lazy"
            draggable="false"
          />
          <ul className="list-disc pl-5 space-y-1">
            <li> Designed and trained a Terrain-Aware SAR-to-RGB colorization pipeline using a Conditional GAN architecture enhanced with a
 terrain-classifying ResNet34, enabling domain-specific image translation across 4 terrains.</li>
            <li>Developed a U-Net-based generator and terrain-aware PatchGAN discriminator with attention layers for detail fidelity and texture preservation in translated RGB images.</li>
            <li> Implemented real-time terrain prediction and one-hot conditioning by finetuning ResNet34 on a custom multi-terrain SAR dataset
 consisting 16000 pairs of images, boosting generalization through modular training of classifier and GAN blocks.</li>
            <li>Achieved robust performance with mixed-precision training, automatic terrain classification accuracy of 99.94%, and image
translation scores of FID: 108.18, SSIM: 0.36, PSNR: 19 dB, and IS: 3.07 over multi-domain SAR datasets.</li>
            <li>Optimized training using PyTorch Lightning-style routines, advanced loss functions (L1, perceptual), and visualizations with
side-by-side SAR, ground-truth, and generated RGB outputs, showcasing spatial coherence and terrain-aware realism.</li>
          </ul>
        </div>
      ),
      tech: ["Python", "PyTorch", "Computer Vision", "GANs", "ResNet34", "U-Net", "PatchGAN", "CUDA", "Deep Learning"],
      github: "https://github.com/KrishnaNAcharya/SAR",
      demo: "example.com"
    },
    {
      id: 3,
      title: "HireIN-JP: Recruitment Platform",
      image: HireInImg,
      description: (
        <div>
          <img
            src={HireInImg}
            alt="HireIN-JP project screenshot"
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            loading="lazy"
            draggable="false"
          />
          <ul className="list-disc pl-5 space-y-1">
            <li>Developed a fully responsive recruitment platform with real-time search, filtering, and role-based dashboards for candidates and recruiters.</li>
            <li>Engineered Firebase-based auth, Firestore data models, and secure file uploads for resumes and media with CDN-backed delivery.</li>
            <li>Implemented dynamic job matching filters (role, location, experience, salary, mode) with debounced search and fuzzy match scoring.</li>
            <li>Designed profile systems with resume upload, skills portfolio, and visibility controls; recruiters can post, track, and manage applicants.</li>
            <li>Delivered 60% faster hiring cycle through advanced UX, admin dashboards, email automation, and analytics-driven process optimization.</li>
          </ul>
        </div>
      ),
      tech: ["React.js", "Firebase", "Tailwind CSS", "Firestore", "Firebase Auth", "React Router", "Material Tailwind"],
      github: "https://github.com/KrishnaNAcharya/HireIn-JP",
      demo: "https://hire-in-jp.vercel.app"
    },
    {
      id: 4,
      title: "HIMS: Health Insurance Management System",
      image: HIMSImg,
      description: (
        <div>
          <img
            src={HIMSImg}
            alt="HIMS project screenshot"
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            loading="lazy"
            draggable="false"
          />
          <ul className="list-disc pl-5 space-y-1">
            <li>Built a production-grade full-stack health insurance platform with 20+ validated form rules, multi-step workflows, and role-based access.</li>
            <li>Engineered 15+ RESTful APIs and PostgreSQL schemas with ACID-compliant transactions, FK constraints, and optimized queries.</li>
            <li>Integrated Firebase Auth for secure session handling and RBAC, and deployed to Render with full CI/CD automation.</li>
            <li>Designed a dynamic pricing engine supporting UPI, card, and EMI methods with frequency-based premium calculations.</li>
            <li>Delivered a responsive, mobile-first PWA UI with PDF export, toast notifications, admin CRUD dashboard, and analytics.</li>
          </ul>
        </div>
      ),
      tech: ["React.js", "Express.js", "PostgreSQL", "Firebase", "Tailwind CSS", "Vite", "Node.js"],
      github: "https://github.com/KrishnaNAcharya/HIMS",
      demo: "https://hims-f.onrender.com"
    },
    {
      id: 5,
      title: "Xtract: Statistical Analysis Tool",
      image: XtractImg,
      description: (
        <div>
          <img
            src={XtractImg}
            alt="Xtract project screenshot"
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            loading="lazy"
            draggable="false"
          />
          <ul className="list-disc pl-5 space-y-1">
            <li>Developed a comprehensive web-based statistical analysis tool enabling users to upload CSV datasets and instantly generate detailed statistical insights and visualizations.</li>
            <li>Built an automated analysis engine that computes descriptive statistics—mean, median, mode, quartiles, standard deviation, variance, skewness, kurtosis, & sum of squared errors for all numerical columns.</li>
            <li>Engineered an interactive visualization suite supporting 8 dynamic chart types, including histograms, box plots, pie charts, scatter plots, and correlation heatmaps, with real-time attribute selection.</li>
            <li>Integrated a robust backend using Express.js and Python (pandas, NumPy, SciPy, matplotlib, seaborn) for data processing, RESTful APIs, & automated file management with Multer & Dockerized deployment.</li>
            <li>Designed a fully responsive, mobile-first UI with adaptive navigation, dynamic UI components, and seamless user experience, supporting multiple concurrent users with session isolation and automatic file cleanup.</li>
          </ul>
        </div>
      ),
      tech: ["Express.js", "Python", "Pandas", "Matplotlib", "Seaborn", "Tailwind CSS", "Multer", "Docker"],
      github: "https://github.com/KrishnaNAcharya/Xtract",
      demo: "example.com"
    },
    {
      id: 6,
      title: "Portfolio Website",
      image: PortfolioImg,
      description: (
        <div>
          <img
            src={PortfolioImg}
            alt="Portfolio Website screenshot"
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            loading="lazy"
            draggable="false"
          />
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Built a high-performance portfolio with React.js, Vite, and Tailwind CSS, achieving 97+ Lighthouse scores on Accessibility, Best Practices and SEO.
            </li>
            <li>
              Designed advanced UI/UX with GSAP animations, a custom Vortex background, and Framer Motion effects for a visually immersive, interactive experience across all devices.
            </li>
            <li>
              Delivered a fully responsive, mobile-first layout with semantic HTML5 and accessibility best practices, supporting keyboard navigation and ARIA labels for inclusivity.
            </li>
            <li>
              Integrated React Helmet for dynamic SEO, Open Graph, and JSON-LD, boosting search visibility and rich social previews.
              Deployed on Vercel with automated CI/CD and a modular, reusable component structure.
            </li>
            <li>
              Optimized asset delivery with code splitting, lazy loading, and tree shaking, achieving 40% faster load times. Used analytics and audits to monitor and improve site speed.
            </li>
          </ul>
        </div>
      ),
      tech: ["React.js", "Vite", "GSAP", "Tailwind CSS", "React Helmet", "Vercel Analytics","Namecheap"],
      github: "https://github.com/KrishnaNAcharya/portfolio",
      demo: "https://www.krishnanacharya.me"
    },
    // {
    //   id: 7,
    //   title: "Wipfli MentorStack: IT & Management Mentorship Platform",
    //   description: "A Stack Overflow-like knowledge sharing platform for IT & Management Mentorship and Problem Solving.",
    //   tech: ["Next.js", "GSAP", "Tailwind CSS", "ShadCN","Express.js", "PostgreSQL","Prisma","NeonDB"],
    //   github: "#",
    //   demo: "example.com",
    //   wip: true
    // }
  ], []);
  // Memoize button click handlers
  const createButtonHandler = useCallback((url) => (e) => {
    e.stopPropagation();
    if (url && url !== "example.com" && url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Memoize transformed projects with optimized JSX generation
  const transformedProjects = useMemo(() => 
    projectsData.map(project => ({
      id: project.id,
      title: (
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
          <div className="flex-grow">
            <p className="text-justify">{project.description}</p>
          </div>
          <div className="mt-auto pt-4"> 
            <div className="mb-3"> 
              <strong className="text-zinc-300 text-xs font-semibold">Tech Stack:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tech.map((item, index) => (
                  <span key={`${project.id}-tech-${index}`} className="px-2 py-0.5 bg-emerald-700/30 text-emerald-400 rounded-full text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {project.github && project.github !== "#" && (
                <button
                  type="button"                  onClick={createButtonHandler(project.github)}
                  className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  aria-label={`View ${project.title} source code`}
                >
                  View Code
                </button>
              )}
              {project.demo && project.demo !== "example.com" && (
                <button
                  type="button"                  onClick={createButtonHandler(project.demo)}
                  className={`px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 rounded-md duration-200 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${project.github && project.github !== "#" ? 'ml-auto' : 'ml-0'}`}
                  aria-label={`View ${project.title} live demo`}
                >
                  View Demo
                </button>
              )}
            </div>
          </div>
        </>
      ),
      link: project.github === "#" ? undefined : project.github,
    })), 
    [projectsData, createButtonHandler]
  );

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: null, // Will be set dynamically
        start: "top bottom",
        end: "top center",
        scrub: 1
      }
    }
  }), []);

  // Memoize animation setup
  const setupHeaderAnimation = useCallback(() => {
    if (headerRef.current) {
      const config = { ...animationConfig.to };
      config.scrollTrigger.trigger = headerRef.current;
      
      gsap.fromTo(headerRef.current, animationConfig.from, config);
    }
  }, [animationConfig]);

  useEffect(() => {
    setupHeaderAnimation();
    
    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setupHeaderAnimation]);  return (    <section 
      id="projects" 
      name="projects" 
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="projects-heading"
      role="region"
    >
      <div className="max-w-[1440px] mx-auto p-4 md:p-10 flex flex-col w-full h-full px-4 md:px-10">
        <header ref={headerRef} className="pb-6 md:pb-8 text-center sm:text-left">
          <h2 
            id="projects-heading"
            className="text-5xl sm:text-8xl font-bold inline border-b-4 border-emerald-500 text-white"
          >
            Projects
          </h2>
        </header>

        <main aria-label="Portfolio projects and technical work">
          <HoverEffect items={transformedProjects} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 py-4" />
        </main>
        
        {/* Old grid structure (to be removed or commented out):
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-10">
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
