export interface Project {
  slug: string
  title: string
  description: string
  outcome: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string
  stars?: number
  image: string
  featured: boolean
  problem: string
  constraints: string
  architecture: string
  results: string
  screenshots: string[]
}

export interface Skill {
  name: string
  icon: string
  category: 'languages' | 'frontend' | 'backend' | 'devops'
}

export interface Experience {
  company: string
  role: string
  startDate: string
  endDate: string | 'Present'
  description: string
  technologies: string[]
}

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  url: string
  category: string
}

export interface PersonalInfo {
  name: string
  email: string
  company: string
  githubUsername: string
  githubUrl: string
  linkedinUrl: string
  resumeUrl: string
  bio: string
  summary: string
  currentRole: string
  funFact: string
  yearsExperience: number
  projectsShipped: number
  githubStars: number
}
