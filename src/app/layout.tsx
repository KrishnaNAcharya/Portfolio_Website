import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

const siteTitle = "Krishna N Acharya | Full-Stack Developer & AI Enthusiast"
const siteDescription = "Passionate Full-Stack Developer specializing in AI, Data Science, and modern web technologies. Explore my innovative projects, technical skills, and professional experience in React, Node.js, Python, and machine learning."
const siteUrl = "https://www.krishnanacharya.me"
const socialImage = "https://www.krishnanacharya.me/assets/Heroimg.jpg"

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: "Krishna N Acharya, Full-Stack Developer, AI Engineer, Data Science, Web Developer, React Developer, Node.js, Python, Machine Learning, Artificial Intelligence, Portfolio, Software Engineer, Frontend Developer, Backend Developer, Mangaluru",
  authors: [{ name: "Krishna N Acharya" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Krishna N Acharya - Full-Stack Developer Portfolio',
      },
    ],
    siteName: 'Krishna N Acharya Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
    creator: '@krishnanacharya',
  },
  other: {
    'theme-color': '#10B981',
    'msapplication-TileColor': '#10B981',
  },
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krishna N Acharya",
    "url": siteUrl,
    "jobTitle": "Full-Stack Developer",
    "description": siteDescription,
    "image": socialImage,
    "sameAs": [
      "https://linkedin.com/in/krishna-n-acharya",
      "https://github.com/krishnanacharya"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Artificial Intelligence",
      "Data Science",
      "Machine Learning",
      "Full-Stack Development",
      "Web Development",
      "Software Engineering"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "NMAM Institute of Technology",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nitte",
        "addressCountry": "India"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mangaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "India"
    }
  }

  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/icon.jpg" />
          <link rel="shortcut icon" href="/icon.jpg" />
          <link rel="apple-touch-icon" href="/icon.jpg" />
          <meta name="theme-color" content="#10B981" />
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
