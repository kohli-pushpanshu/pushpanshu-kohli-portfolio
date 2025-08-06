export const userData = {
  id: 1,
  name: "Pushpanshu Kohli",
  title: "Aspiring Full Stack Developer | B.Tech CSE Student",
  bio: "I am a second-year B.Tech Computer Science student at CSJMU Kanpur, currently learning full stack development. I'm passionate about building web applications and continuously improving my skills in technologies like React, Node.js, and databases. I'm actively seeking a paid internship where I can apply my knowledge, gain industry experience, and contribute to real-world projects.",
  profile_image_url: "/placeholder.svg?height=320&width=320",
  location: "Kanpur, Uttar Pradesh, India",
  email: "pushpanshugujjar@example.com",
  phone: "+91 9557432384",
  github_url: "https://github.com/kohli-pushpanshu",
  linkedin_url: "https://www.linkedin.com/in/pushpanshu-kohli-2065772ba/",
  resume_url: "%PUBLIC_URL%/resume.pdf",
}


export const projectsData = [
  {
    id: 1,
    title: "Authentication",
    description: "This is project to verify email using nextAuth",
    long_description: "",
    image_url: "%PUBLIC_URL%/Verificaton.png?height=400&width=600",
    demo_url: "https://verify-email-4jraj9th8-pushpanshugujjar-gmailcoms-projects.vercel.app",
    github_url: "https://github.com/kohli-pushpanshu/verifyEmail",
    technologies: [],
    featured: false,
  },
  {
    id: 2,
    title: "Ghostwhispher",
    description: "it is a anonymous message app where yu can send message to other but you identity remains anonymous. this is a fulstack product built using Next.js, Tailwind CSS, and PostgreSQL.",
    long_description: "",
    image_url: "%PUBLIC_URL%/whispher.png",
    demo_url: "https://www.codewithkohli.tech/",
    github_url: "https://github.com/kohli-pushpanshu/ghostwhisper",
    technologies: [],
    featured: false,
  },
  {
    id: 3,
    title: "Projects coming soon",
    description: "I am currently working on full stack projects and will update here once completed.",
    long_description: "",
    image_url: "%PUBLIC_URL%/placeholder.png?height=50&width=400",
    demo_url: "#",
    github_url: "https://github.com/kohli-pushpanshu",
    technologies: [],
    featured: false,
  }
]

export const skillsData = [
  { id: 1, name: "C++ (DSA)", category: "backend", proficiency: 85, icon_name: "Code2" },
  { id: 2, name: "JavaScript", category: "frontend", proficiency: 90, icon_name: "Code" },
  { id: 3, name: "TypeScript", category: "frontend", proficiency: 85, icon_name: "FileCode" },
  { id: 4, name: "React.js", category: "frontend", proficiency: 88, icon_name: "Atom" },
  { id: 5, name: "Next.js", category: "fullstack", proficiency: 98, icon_name: "Zap" },
  { id: 6, name: "Tailwind CSS", category: "frontend", proficiency: 90, icon_name: "Paintbrush" },
  { id: 7, name: "PostgreSQL", category: "backend", proficiency: 80, icon_name: "Database" },
  { id: 8, name: "Prisma ORM", category: "backend", proficiency: 80, icon_name: "DatabaseZap" },
  { id: 9, name: "Git", category: "tools", proficiency: 75, icon_name: "GitBranch" },
]


export const experiencesData = [
  {
    id: 1,
    company: "NextGen Product Lab",
    position: "Full Stack Intern",
    description:
      "Currently working on a full stack product using Next.js, Tailwind CSS, and PostgreSQL. Responsible for building UI components, managing backend logic with Prisma, and integrating database models. Actively collaborating with the development team to ship production-ready features.",
    start_date: "2025-05-01",
    end_date: null,
    location: "Remote",
  },
  {
    id: 2,
    company: "Summer Training Program",
    position: "C++ DSA Intern",
    description:
      "Completed a structured internship focused on mastering Data Structures and Algorithms using C++. Solved a wide range of competitive programming problems and strengthened core programming fundamentals.",
    start_date: "2024-06-01",
    end_date: "2024-07-31",
    location: "iit kanpur, Kanpur, India",
  }
]
