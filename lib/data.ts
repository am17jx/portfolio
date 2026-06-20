import { Project, Skill, Experience, BlogPost, PersonalInfo } from './types'

export const personalInfo: PersonalInfo = {
  name: 'Ameer Ahmed',
  email: 'ameerahmed0780@gmail.com',
  company: 'New Core Company',
  githubUsername: 'am17jx',
  githubUrl: 'https://github.com/am17jx',
  linkedinUrl: 'https://www.linkedin.com/in/ameer-ahmed-4ba9972b1',
  resumeUrl: '/resume.pdf',
  bio: 'Full-Stack Engineer (Node.js + React) and Information & Communication Engineering graduate, building scalable web applications from Baghdad, Iraq.',
  summary:
    'Full-Stack Software Engineer graduating in 2026 from Information & Communication Engineering at Al-Nahrain University. Specializing in backend development with Node.js and Express.js, and building modern frontends with React and Next.js. Experienced in REST API design, authentication systems, PostgreSQL & MongoDB, with a strong emphasis on clean architecture and security.',
  currentRole: 'Software Developer',
  funFact: 'I once built a fully authenticated REST API with rate-limiting, role-based access control, and XSS protection — all in a single weekend for a personal project.',
  yearsExperience: 1,
  projectsShipped: 10,
  githubStars: 0,
}

export const projects: Project[] = [
  {
    slug: 'task-management-api',
    title: 'Task Management API',
    description:
      'A RESTful API for managing tasks with user authentication, task creation, updating, and deletion. Built to support multi-user task operations and error handling with a modular code structure.',
    outcome: 'Delivered a production-ready multi-user task API with clean modular architecture deployed on Render.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST'],
    githubUrl: 'https://github.com/am17jx/task-management-api',
    liveUrl: 'https://render.com',
    image: '/projects/task-management-api.png',
    featured: true,
    problem:
      'Teams and individuals needed a reliable backend service for managing tasks across multiple users with proper authentication and clean separation of concerns.',
    constraints:
      'Must support JWT-based auth. Data must be persisted reliably with Mongoose. Code structure must be modular and maintainable. Deployed via Render.',
    architecture: `Client ─► Express Router ─► Auth Middleware (JWT)
                                    │
                             Controller Layer
                                    │
                          Mongoose Models (MongoDB)`,
    results: 'Clean multi-user REST API with authentication, full CRUD, and hosted on Render.',
    screenshots: ['/projects/task-management-api.png'],
  },
  {
    slug: 'natours-api',
    title: 'Natours API',
    description:
      'A backend API built for a tour booking application featuring advanced filtering, sorting, pagination, authentication, authorization, and data validation following the MVC pattern.',
    outcome: 'Demonstrated scalable backend architecture with advanced query features and role-based authorization.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST'],
    githubUrl: 'https://github.com/am17jx/natours-api',
    image: '/projects/natours-api.png',
    featured: true,
    problem:
      'Tour booking platforms require complex filtering, sorting, and pagination logic alongside secure multi-role authorization.',
    constraints:
      'Must implement MVC architecture. Advanced query features (filter, sort, paginate) required. Auth must distinguish between user, guide, and admin roles.',
    architecture: `Client ─► Express Router ─► Auth & Role Middleware
                                    │
                             MVC Controllers
                                    │
                          Mongoose Models (MongoDB)`,
    results: 'Fully functional tour booking API with advanced query engine, authentication, and role-based access control.',
    screenshots: ['/projects/natours-api.png'],
  },
  {
    slug: 'book-review-api',
    title: 'Book Review API',
    description:
      'A secure and robust RESTful API for managing books, user accounts, comments, and tags. Features a complete JWT authentication system, role-based access control, and comprehensive CRUD operations with a strong emphasis on security.',
    outcome: 'Built a hardened API with industry-standard security practices including rate limiting, helmet, and XSS protection.',
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'bcrypt', 'Express Rate Limit', 'Helmet', 'XSS-Clean'],
    githubUrl: 'https://github.com/am17jx/Book_Review',
    image: '/projects/book-review-api.png',
    featured: true,
    problem:
      'Book review platforms handle sensitive user data and need strong security measures: input sanitization, rate limiting, encrypted passwords, and role-based access.',
    constraints:
      'Must use PostgreSQL with proper relational schema. Security headers via Helmet. Rate limiting to prevent abuse. Passwords hashed with bcrypt. XSS inputs sanitized.',
    architecture: `Client ─► Express Router ─► Rate Limiter & Helmet
                                    │
                        Auth Middleware (JWT + bcrypt)
                                    │
                          Controllers (CRUD)
                                    │
                          PostgreSQL (Relational DB)`,
    results: 'Production-grade secure API with comprehensive authentication, RBAC, and multiple layers of security hardening.',
    screenshots: ['/projects/book-review-api.png'],
  },
  {
    slug: 'smart-student-attendance-system',
    title: 'Smart Student Attendance System',
    description:
      'A contactless student attendance system utilizing QR code scanning, real-time logging, and automated notifications to streamline attendance tracking and reduce manual overhead.',
    outcome: 'Designed and implemented a high-performance attendance tracking system with QR authentication, reducing class check-in times by 80%.',
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'QR Code API'],
    githubUrl: 'https://github.com/am17jx/Smart_Student_Attendance_System',
    image: '/projects/smart-student-attendance.png',
    featured: true,
    problem:
      'Traditional manual attendance taking is time-consuming, prone to proxy attendance, and lacks real-time updates for instructors and academic administration.',
    constraints:
      'Must be contactless, fast (sub-second scan processing), secure against proxy check-ins (e.g. time-limited QR codes), and support reliable data logging with relational integrity.',
    architecture: `Student App ─► QR Code Scan ─► Express API (Auth & Validation)
                                          │
                                  PostgreSQL Database
                                          │
                                 Instructor Dashboard`,
    results: 'A fully functional contactless attendance management system utilizing dynamic QR codes and real-time logging.',
    screenshots: ['/projects/smart-student-attendance.png'],
  },
]

export const skills: Skill[] = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', category: 'languages' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored', category: 'languages' },
  { name: 'Python', icon: 'devicon-python-plain colored', category: 'languages' },
  { name: 'C#', icon: 'devicon-csharp-plain colored', category: 'languages' },
  { name: 'SQL', icon: 'devicon-postgresql-plain colored', category: 'languages' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored', category: 'backend' },
  { name: 'Express.js', icon: 'devicon-express-original', category: 'backend' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', category: 'backend' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', category: 'backend' },
  { name: 'Mongoose', icon: 'devicon-mongodb-plain colored', category: 'backend' },
  { name: 'Sequelize', icon: 'devicon-sequelize-plain colored', category: 'backend' },
  { name: 'React', icon: 'devicon-react-original colored', category: 'frontend' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', category: 'frontend' },
  { name: 'HTML & CSS', icon: 'devicon-html5-plain colored', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', category: 'frontend' },
  { name: 'Git & GitHub', icon: 'devicon-github-original', category: 'devops' },
  { name: 'Linux', icon: 'devicon-linux-plain', category: 'devops' },
  { name: 'Postman', icon: 'devicon-postman-plain colored', category: 'devops' },
  { name: 'Keycloak', icon: 'devicon-ssh-original', category: 'devops' },
]

export const experiences: Experience[] = [
  {
    company: 'New Core Company',
    role: 'Software Developer',
    startDate: 'Jul 2025',
    endDate: 'Present',
    description:
      'Developing websites for internal use and client projects. Building enterprise software solutions and contributing to the company\'s growth through specialized training programs. Tech stack includes Node.js, Express.js, PostgreSQL, Next.js, and Keycloak.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Next.js', 'Keycloak', 'SQL'],
  },
  {
    company: 'Asiacell',
    role: 'Summer Internship Trainee',
    startDate: 'Aug 2025',
    endDate: 'Sep 2025',
    description:
      'Participated in a summer training program focused on service desk fundamentals, VoIP, RF & GSM basics, telecom generations, and an introduction to SCM. Also received professional development training in CV writing and interview preparation.',
    technologies: ['VoIP', 'RF & GSM', 'Telecom', 'SCM'],
  },
  {
    company: 'UPGRADE Initiative',
    role: 'Professional Development Trainee',
    startDate: 'Jul 2025',
    endDate: 'Sep 2025',
    description:
      'Completed the UPGRADE™ initiative — a structured program developing essential professional skills including communication, emotional intelligence, leadership, and proficiency with modern tools and technologies.',
    technologies: ['Communication', 'Leadership', 'Emotional Intelligence', 'Professional Tools'],
  },
  {
    company: 'Mora',
    role: 'Content Researcher',
    startDate: 'Jan 2023',
    endDate: 'Dec 2024',
    description: 'Conducted content research and developed material for the organization across various topics.',
    technologies: ['Content Research', 'Writing', 'Strategy'],
  },
]

export const blogPosts: BlogPost[] = [
  {
    title: 'Building Secure REST APIs: JWT, bcrypt & Rate Limiting in Node.js',
    excerpt:
      'Security is not an afterthought. In this article I walk through how I layered JWT authentication, bcrypt password hashing, Helmet headers, and Express Rate Limit into a production-grade Book Review API.',
    date: 'Mar 2026',
    readTime: '8 min read',
    url: 'https://github.com/am17jx',
    category: 'Backend',
  },
  {
    title: 'MVC Pattern in Express.js: A Practical Tour Booking API',
    excerpt:
      'MVC keeps your Node.js code clean and scalable. Here\'s how I applied it to the Natours API — including advanced filtering, sorting, pagination, and role-based authorization.',
    date: 'Feb 2026',
    readTime: '6 min read',
    url: 'https://github.com/am17jx',
    category: 'Node.js',
  },
  {
    title: 'From Kotlin Basics to Jetpack Compose: My Android Dev Journey',
    excerpt:
      'I joined The Chance, a non-profit Android training program. Here\'s what I learned about Kotlin, Clean Architecture, TDD, and Scrum in three months of team-based Android development.',
    date: 'May 2025',
    readTime: '5 min read',
    url: 'https://github.com/am17jx',
    category: 'Android',
  },
]

export function getProjectBySlug(slug: string): Project {
  const project = projects.find((p) => p.slug === slug)
  if (!project) throw new Error(`Project not found: ${slug}`)
  return project
}
