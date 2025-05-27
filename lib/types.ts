export interface User {
  id: number
  name: string
  title: string
  bio: string
  profile_image_url?: string
  resume_url?: string
  location: string
  email: string
  phone?: string
  github_url?: string
  linkedin_url?: string
  created_at: string
  updated_at: string
}

// Update Project interface to include better image handling
export interface Project {
  id: number
  title: string
  description: string
  long_description: string
  image_url: string
  demo_url?: string
  github_url?: string
  technologies: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: number
  name: string
  category: string
  proficiency: number
  icon_name: string
  created_at: string
}

export interface Experience {
  id: number
  company: string
  position: string
  description: string
  start_date: string
  end_date?: string
  location: string
  created_at: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject?: string
  message: string
  read: boolean
  created_at: string
}
