# Krishna N Acharya - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Full-Stack Developer and AI Enthusiast. Built with **Next.js 15**, **TypeScript**, and enhanced with stunning animations and comprehensive SEO optimizations.

## 🚀 Live Website

**[www.krishnanacharya.me](https://www.krishnanacharya.me)**

## 👨‍💻 About Me

Passionate Full-Stack Developer specializing in AI, Data Science, and modern web technologies. Currently pursuing B.Tech in Artificial Intelligence and Data Science at NMAM Institute of Technology, Nitte.

## ⚡ Features

- **Modern Tech Stack**: Next.js 15 + TypeScript for production-ready applications
- **Stunning Animations**: GSAP scroll-triggered animations and interactive Vortex particle effects
- **SEO Optimized**: Comprehensive meta tags, structured data (JSON-LD), automated sitemap & robots.txt
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Bundle analysis, dynamic imports, and optimized Core Web Vitals
- **TypeScript**: Full type safety across all components and utilities
- **Analytics**: Vercel Analytics + Speed Insights for performance monitoring
- **PWA Ready**: Manifest file and service worker support

## 🛠️ Technologies Used

### Frontend & Framework

- **Next.js 15.4.6** - React framework with App Router
- **TypeScript 5.x** - Type-safe JavaScript
- **React 18.3** - Component-based UI library
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Animations & UI

- **GSAP 3.12** - Professional-grade animation library with ScrollTrigger
- **Framer Motion 12.x** - React animation library
- **React Icons 5.2** - Icon library
- **Simplex Noise 4.0** - Procedural noise for particle effects

### Performance & SEO

- **@vercel/analytics** - Performance tracking
- **@vercel/speed-insights** - Core Web Vitals monitoring
- **@next/bundle-analyzer** - Bundle size optimization
- **Structured Data** - JSON-LD schema for search engines
- **Automated SEO** - Dynamic sitemap.xml and robots.txt generation

### Development Tools

- **ESLint** - Code linting with Next.js config
- **PostCSS** - CSS processing with Autoprefixer
- **clsx + tailwind-merge** - Conditional className utilities

## 📁 Project Structure

```text
personalportfolio/
├── public/
│   └── icon.jpg              # Favicon and app icons
├── src/
│   ├── app/                  # Next.js 15 App Router
│   │   ├── layout.tsx        # Root layout with SEO metadata
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global styles
│   │   ├── sitemap.ts        # Dynamic sitemap generation
│   │   └── robots.ts         # Dynamic robots.txt generation
│   ├── components/           # TypeScript React components
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── card-hover-effect.tsx
│   │   │   ├── floating-navbar.tsx
│   │   │   ├── vortex.tsx
│   │   │   └── custom-icons.tsx
│   │   ├── Home.tsx         # Landing section with hero
│   │   ├── About.tsx        # Skills & interests
│   │   ├── Education.tsx    # Academic background
│   │   ├── Experience.tsx   # Work experience
│   │   ├── Projects.tsx     # Portfolio projects
│   │   ├── Achievements.tsx # Accomplishments
│   │   ├── Certificates.tsx # Certifications
│   │   ├── Contact.tsx      # Contact information
│   │   ├── NavBar.tsx       # Navigation component
│   │   └── Loading.tsx      # Loading screen
│   ├── lib/                 # Utility functions and types
│   │   ├── utils.ts         # Helper functions (cn, debounce, throttle)
│   │   └── types.ts         # TypeScript interface definitions
│   ├── hooks/               # Custom React hooks
│   │   └── usePerformance.ts # Performance monitoring hooks
│   └── assets/              # Static images and resources
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js          # Next.js configuration with bundle analyzer
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

# Installation & Development

```bash
# Clone the repository
git clone https://github.com/KrishnaNAcharya/Portfolio.git

# Navigate to project directory
cd personalportfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
npm run dev          # Start development server (Next.js)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Key Sections


### 🏠 Home

- **Hero Section**: Animated introduction with particle background

- **Professional Summary**: Current role and location

- **Quick Actions**: Direct links to resume and contact

### 🎓 Education  

- **Academic Qualifications**: CGPA, percentage, and institution details

- **Coursework**: Relevant subjects and specializations

- **Timeline**: Duration and academic achievements

### 💼 Experience

- **Professional Work**: Current role at Inspirante Technologies

- **Technical Contributions**: Project involvement and technology stack

- **Skills Development**: Growth and learning experiences

### 🚀 Projects

- **Featured Portfolio**: Live demos and GitHub repositories

- **Technology Stack**: Detailed tech specifications

- **Project Categories**: Web, Mobile, AI, and other classifications

### 🏆 Achievements & Certifications

- **Academic Accomplishments**: Competition wins and recognitions  

- **Professional Certifications**: Industry-standard certifications

- **Skills Verification**: Credential IDs and verification links

### 🛠️ Skills & Technologies

- **Programming Languages**: Java, Python, JavaScript, TypeScript

- **Frameworks & Libraries**: React, Next.js, Node.js, Express

- **Tools & Platforms**: Git, Docker, AWS, Vercel, MongoDB

## � SEO & Performance Optimization

### 🤖 Automated SEO Files

#### **robots.txt** (`/src/app/robots.ts`)

- **Purpose**: Instructs search engine crawlers on which pages to index
- **Configuration**: Allows all crawlers to index the site while blocking private/API routes
- **Sitemap Reference**: Automatically references the sitemap.xml location
- **Generated Route**: Accessible at `/robots.txt`

```typescript
// Auto-generated robots.txt content:
User-agent: *
Allow: /
Disallow: /private/
Disallow: /_next/
Disallow: /api/
Sitemap: https://www.krishnanacharya.me/sitemap.xml
```

#### **sitemap.xml** (`/src/app/sitemap.ts`)

- **Purpose**: Provides search engines with structured information about site pages
- **Benefits**: Improves crawling efficiency and indexing accuracy
- **Dynamic Generation**: Updates automatically with build timestamp
- **SEO Impact**: Better search engine visibility and ranking potential
- **Generated Route**: Accessible at `/sitemap.xml`

-
### 📊 SEO Features

- **Meta Tags**: Comprehensive title, description, and keywords optimization
- **Structured Data**: JSON-LD schema for Person, Organization, and Website
- **Open Graph**: Social media preview optimization for Twitter, LinkedIn, Facebook
- **Canonical URLs**: Proper URL structure to avoid duplicate content
- **Performance**: Core Web Vitals monitoring and optimization
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

-
### ⚡ Performance Metrics

- **Bundle Size**: 42.3 kB main bundle (optimized)
- **Lighthouse Score**: 95+ for Performance, SEO, Accessibility
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Loading Speed**: ~2.3s average load time
- **Bundle Analysis**: Integrated analyzer for dependency optimization

## 🔗 Connect With Me

- **LinkedIn**: [Krishna N Acharya](https://linkedin.com/in/krishna-n-acharya)
- **GitHub**: [KrishnaNAcharya](https://github.com/KrishnaNAcharya)
- **Email**: [knacharyakavoor@gmail.com](mailto:knacharyakavoor@gmail.com)
- **Phone**: +91 8088022968
- **Portfolio**: [www.krishnanacharya.me](https://www.krishnanacharya.me)

## 🌟 Technical Highlights

-### Migration Journey

- ✅ **Complete Migration**: From React+Vite to Next.js 15 with TypeScript
- ✅ **Performance Optimization**: 40%+ bundle size reduction
- ✅ **SEO Enhancement**: Comprehensive metadata and structured data
- ✅ **Security Updates**: Latest Next.js version with security patches
- ✅ **Type Safety**: Full TypeScript conversion across all components

-
### Development Experience  

- **Hot Reloading**: Fast development with instant updates
- **Type Safety**: Catch errors at compile time with TypeScript
- **Code Splitting**: Automatic optimization for faster loading
- **Image Optimization**: Next.js built-in image optimization
- **Font Optimization**: Google Fonts integration with preloading

## 🙏 Acknowledgments

- **Next.js Team** for the powerful React framework
- **Vercel** for hosting, analytics, and deployment platform  
- **Tailwind CSS** for the utility-first CSS framework
- **GSAP** for professional animations and scroll effects
- **TypeScript** for type safety and developer experience

---

**Built with ❤️ by Krishna N Acharya** | **Powered by Next.js 15 + TypeScript**
