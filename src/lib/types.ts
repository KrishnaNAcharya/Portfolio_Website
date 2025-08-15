import { Dispatch, SetStateAction, ReactNode } from 'react'

export interface LoadingProps {
  setLoading?: Dispatch<SetStateAction<boolean>>
}

export interface NavBarProps {
  loading: boolean
}

export interface VortexProps {
  children: React.ReactNode
  backgroundColor?: string
  particleCount?: number
  rangeY?: number
  baseHue?: number
  containerClassName?: string
  rangeSpeed?: number
}

export interface HomeProps {
  setLoading: Dispatch<SetStateAction<boolean>>
}

// Education types
export interface EducationItem {
  id: number
  institution: string
  location: string
  degree: string
  score: string
  duration: string
}

// Experience types
export interface ExperienceItem {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  companyUrl?: string
}

// Project types
export interface ProjectItem {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  liveUrl?: string
  githubUrl?: string
  category: 'web' | 'mobile' | 'ai' | 'other'
}

// Achievement types
export interface AchievementItem {
  id: number
  title: string
  description: string
  date: string
  organization?: string
  category: 'competition' | 'certification' | 'project' | 'academic' | 'other'
  link?: string
}

// Certificate types
export interface CertificateItem {
  id: number
  title: string
  issuer: string
  date: string
  credentialId?: string
  url?: string
  image?: string
  description?: string
  skills?: string[]
}

// Skills types
export interface SkillCategory {
  id: number
  category: string
  skills: string[]
  icon?: ReactNode
}

// Contact types
export interface ContactInfo {
  email: string
  phone?: string
  location: string
  social: {
    linkedin: string
    github: string
    twitter?: string
    instagram?: string
  }
}
