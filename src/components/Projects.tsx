import { useEffect, useRef, memo, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HoverEffect } from './ui/card-hover-effect'
import { ProjectItem } from '@/lib/types'
import { ReactNode } from 'react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Projects = memo(function Projects() {
  const headerRef = useRef<HTMLElement>(null)

  // Memoize projects data to prevent recreation on every render
  const projectsData = useMemo((): ProjectItem[] => [
    {
      id: 1,
      title: "SonicSeeker: AI powered media analysis platform",
      description: "Full-stack AI media platform with 99.4% accurate speech-to-text transcription and multi-language support",
      image: "/assets/SonicSeeker.png",
      technologies: ["Next.js 15", "Express.js", "MongoDB Atlas", "Hugging Face", "OpenAI Faster-Whisper", "PyAnnote.audio", "D3.js", "Meta LLaMA 3", "WaveSurfer.js", "CUDA"],
      features: [
        "Developed a full-stack AI media platform achieving 99.4% accurate real-time speech-to-text transcription with timestamps, using Next.js 15, Express.js, MongoDB Atlas, Hugging Face models, and OpenAI Faster-Whisper.",
        "Architected a flexible NoSQL schema enabling efficient storage, indexing, and retrieval of multilingual transcripts, speaker metadata, and sentiment tags with semantic search capabilities.",
        "Integrated Facebook NLLB-200's distilled 600M, PyAnnote.audio, D3.js and Meta LLaMA 3 for multi-language translation, speaker diarization, and generative mind map summarization of dialogue flow and key speaker topics across media formats.",
        "Built NLP pipelines for speech summarization, emotion detection, entity extraction, and interactive synchronized playback with semantic search across 10+ languages using sentiment.js, compromise.js, Facebook BART, WaveSurfer.js, and FFmpeg.",
        "Engineered a scalable backend with RESTful APIs, Memoization, Batch processing, Model caching, JWT authentication, and file processing pipelines supporting 5+ formats, with CUDA acceleration improving processing speed by 93.34%."
      ],
      githubUrl: "https://github.com/KrishnaNAcharya/SonicSeeker",
      liveUrl: "example.com",
      category: "ai"
    },
    {
      id: 2,
      title: "NASAR: Terrain-Aware SAR to RGB Translation using cGAN",
      description: "Advanced computer vision project using Conditional GANs for SAR-to-RGB image translation with terrain awareness",
      image: "/assets/NASAR.jpg",
      technologies: ["Python", "PyTorch", "Computer Vision", "GANs", "ResNet34", "U-Net", "PatchGAN", "CUDA", "Deep Learning"],
      features: [
        "Designed and trained a Terrain-Aware SAR-to-RGB colorization pipeline using a Conditional GAN architecture enhanced with a terrain-classifying ResNet34, enabling domain-specific image translation across 4 terrains.",
        "Built a UNet-based generator and PatchGAN discriminator, integrating terrain embeddings into the generation process to improve realism and structure preservation in translated RGB outputs.",
        "Implemented real-time terrain prediction and one-hot conditioning by finetuning ResNet34 on a custom multi-terrain SAR dataset consisting 16000 pairs of images, boosting generalization through modular training of classifier and GAN blocks.",
        "Achieved robust performance with mixed-precision training, automatic terrain classification accuracy of 99.94%, and image translation scores of FID: 108.18, SSIM: 0.36, PSNR: 19 dB, and IS: 3.07 over multi-domain SAR datasets.",
        "Optimized training using PyTorch Lightning-style routines, advanced loss functions (L1, perceptual), and visualizations with SAR, ground-truth, and generated RGB outputs, while keeping the system within a 1.5GB VRAM limit."
      ],
      githubUrl: "https://github.com/KrishnaNAcharya/SAR",
      liveUrl: "example.com",
      category: "ai"
    },
    {
      id: 3,
      title: "HireIN-JP: Recruitment Platform",
      description: "Full-stack recruitment platform with real-time search, filtering, and role-based dashboards",
      image: "/assets/HireIn.png",
      technologies: ["React.js", "Firebase", "Tailwind CSS", "Firestore", "Firebase Auth", "React Router", "Material Tailwind"],
      features: [
        "Developed a fully responsive recruitment platform with real-time search, filtering, and role-based dashboards for candidates and recruiters.",
        "Engineered Firebase-based auth, Firestore data models, and secure file uploads for resumes and media with CDN-backed delivery.",
        "Implemented dynamic job matching filters (role, location, experience, salary, mode) with debounced search and fuzzy match scoring.",
        "Designed profile systems with resume upload, skills portfolio, and visibility controls; recruiters can post, track, and manage applicants.",
        "Delivered 60% faster hiring cycle through advanced UX, admin dashboards, email automation, and analytics-driven process optimization."
      ],
      githubUrl: "https://github.com/KrishnaNAcharya/HireIn-JP",
      liveUrl: "https://hire-in-jp.vercel.app",
      category: "web"
    },
    {
      id: 4,
      title: "HIMS: Health Insurance Management System",
      description: "Production-grade health insurance platform with multi-step workflows and role-based access",
      image: "/assets/HIMS.png",
      technologies: ["React.js", "Express.js", "PostgreSQL", "Firebase", "Tailwind CSS", "Vite", "Node.js"],
      features: [
        "Built a production-grade full-stack health insurance platform with 20+ validated form rules, multi-step workflows, and role-based access.",
        "Engineered 15+ RESTful APIs and PostgreSQL schemas with ACID-compliant transactions, FK constraints, and optimized queries.",
        "Integrated Firebase Auth for secure session handling and RBAC, and deployed to Render with full CI/CD automation.",
        "Designed a dynamic pricing engine supporting UPI, card, and EMI methods with frequency-based premium calculations.",
        "Delivered a responsive, mobile-first PWA UI with PDF export, toast notifications, admin CRUD dashboard, and analytics."
      ],
      githubUrl: "https://github.com/KrishnaNAcharya/HIMS",
      liveUrl: "https://hims-f.onrender.com",
      category: "web"
    },
    {
      id: 5,
      title: "Xtract: Statistical Analysis Tool",
      description: "Web-based statistical analysis tool with automated insights and interactive visualizations",
      image: "/assets/Xtract.png",
      technologies: ["Express.js", "Python", "Pandas", "Matplotlib", "Seaborn", "Tailwind CSS", "Multer", "Docker"],
      features: [
        "Developed a comprehensive web-based statistical analysis tool enabling users to upload CSV datasets and instantly generate detailed statistical insights and visualizations.",
        "Built an automated analysis engine that computes descriptive statistics—mean, median, mode, quartiles, standard deviation, variance, skewness, kurtosis, & sum of squared errors for all numerical columns.",
        "Engineered an interactive visualization suite supporting 8 dynamic chart types, including histograms, box plots, pie charts, scatter plots, and correlation heatmaps, with real-time attribute selection.",
        "Integrated a robust backend using Express.js and Python (pandas, NumPy, SciPy, matplotlib, seaborn) for data processing, RESTful APIs, & automated file management with Multer & Dockerized deployment.",
        "Designed a fully responsive, mobile-first UI with adaptive navigation, dynamic UI components, and seamless user experience, supporting multiple concurrent users with session isolation and automatic file cleanup."
      ],
      githubUrl: "https://github.com/KrishnaNAcharya/Xtract",
      liveUrl: "example.com",
      category: "web"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "High-performance portfolio with advanced animations and 97+ Lighthouse scores",
      image: "/assets/Portfolio.png",
      technologies: ["Next.js", "GSAP", "Tailwind CSS", "React Helmet", "Vercel Analytics", "Namecheap"],
      features: [
        "Built a high-performance portfolio with React.js, Vite, and Tailwind CSS, achieving 97+ Lighthouse scores on Accessibility, Best Practices and SEO.",
        "Designed advanced UI/UX with GSAP animations, a custom Vortex background, and Framer Motion effects for a visually immersive, interactive experience across all devices.",
        "Delivered a fully responsive, mobile-first layout with semantic HTML5 and accessibility best practices, supporting keyboard navigation and ARIA labels for inclusivity.",
        "Integrated React Helmet for dynamic SEO, Open Graph, and JSON-LD, boosting search visibility and rich social previews. Deployed on Vercel with automated CI/CD and a modular, reusable component structure.",
        "Optimized asset delivery with code splitting, lazy loading, and tree shaking, achieving 40% faster load times. Used analytics and audits to monitor and improve site speed."
      ],
      githubUrl: "https://github.com/KrishnaNAcharya/portfolio",
      liveUrl: "https://www.krishnanacharya.me",
      category: "web"
    },
  ], [])

  // Memoize button click handlers
  const createButtonHandler = useCallback((url: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    if (url && url !== "example.com" && url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  // Memoize transformed projects with optimized JSX generation
  const transformedProjects = useMemo(() => 
    projectsData.map(project => ({
      id: project.id,
      title: project.title as ReactNode,
      description: (
        <>
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            width={400}
            height={200}
            className="w-full h-48 object-contain rounded-lg mb-4 bg-transparent"
            loading="lazy"
            draggable={false}
          />
          <div className="flex-grow">
            <ul className="list-disc pl-5 space-y-1">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mt-auto pt-4"> 
            <div className="mb-3"> 
              <strong className="text-zinc-300 text-xs font-semibold">Tech Stack:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.technologies.map((item, index) => (
                  <span key={`${project.id}-tech-${index}`} className="px-2 py-0.5 bg-emerald-700/30 text-emerald-400 rounded-full text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && project.githubUrl !== "#" && (
                <button
                  type="button"
                  onClick={createButtonHandler(project.githubUrl)}
                  className="px-4 py-2 text-sm border border-emerald-500 hover:bg-emerald-500/20 rounded-md duration-200 text-emerald-400 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  aria-label={`View ${project.title} source code`}
                >
                  View Code
                </button>
              )}
              {project.liveUrl && project.liveUrl !== "example.com" && (
                <button
                  type="button"
                  onClick={createButtonHandler(project.liveUrl)}
                  className={`px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 rounded-md duration-200 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${project.githubUrl && project.githubUrl !== "#" ? 'ml-auto' : 'ml-0'}`}
                  aria-label={`View ${project.title} live demo`}
                >
                  View Demo
                </button>
              )}
            </div>
          </div>
        </>
      ) as ReactNode,
      link: project.githubUrl === "#" ? undefined : project.githubUrl,
    })), 
    [projectsData, createButtonHandler]
  )

  // Memoize animation configuration
  const animationConfig = useMemo(() => ({
    from: { y: 50, opacity: 0 },
    to: {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: null as HTMLElement | null,
        start: "top bottom",
        end: "top center",
        scrub: 1
      }
    }
  }), [])

  // Memoize animation setup
  const setupHeaderAnimation = useCallback(() => {
    if (headerRef.current) {
      const config = { ...animationConfig.to }
      config.scrollTrigger.trigger = headerRef.current
      
      gsap.fromTo(headerRef.current, animationConfig.from, config)
    }
  }, [animationConfig])

  useEffect(() => {
    setupHeaderAnimation()
    
    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [setupHeaderAnimation])

  return (
    <section 
      id="projects" 
      className="w-full pt-8 md:pt-12 pb-8 md:pb-12"
      aria-labelledby="projects-heading"
      role="region"
      data-name="projects"
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
      </div>
    </section>
  )
})

Projects.displayName = 'Projects'

export default Projects
