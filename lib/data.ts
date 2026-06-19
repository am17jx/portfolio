import { Project, Skill, Experience, BlogPost, PersonalInfo } from './types'

export const personalInfo: PersonalInfo = {
  name: 'Alex Chen',
  email: 'alex@example.com',
  company: 'Stripe',
  githubUsername: 'alexchen',
  githubUrl: 'https://github.com/alexchen',
  linkedinUrl: 'https://linkedin.com/in/alexchen',
  twitterUrl: 'https://twitter.com/alexchen',
  resumeUrl: '/resume.pdf',
  bio: "I build fast, accessible, and scalable web applications — from pixel-perfect UIs to distributed backend systems.",
  summary: "Full-stack engineer with 6 years of experience shipping production software at scale. I specialize in TypeScript, React, and Node.js, and I care deeply about developer experience, performance, and open source.",
  currentRole: 'Senior Software Engineer',
  funFact: 'I once optimized a PostgreSQL query from 14 seconds to 80ms by adding a single index.',
  yearsExperience: 6,
  projectsShipped: 40,
  githubStars: 2300,
}

export const projects: Project[] = [
  {
    slug: 'devflow',
    title: 'DevFlow',
    description: 'A real-time collaborative code review platform with inline comments, diff views, and CI status integration.',
    outcome: 'Reduced code review turnaround time by 60% for a 50-person engineering team.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Redis'],
    githubUrl: 'https://github.com/alexchen/devflow',
    liveUrl: 'https://devflow.example.com',
    stars: 1200,
    image: '/projects/devflow.png',
    featured: true,
    problem: 'Engineering teams at fast-growing startups spend an average of 3 hours per PR waiting for code review. Async reviews lose context and async comments lack thread structure.',
    constraints: 'Had to work within existing GitHub webhook infrastructure. Real-time updates required without polling. Zero-downtime deployments mandatory.',
    architecture: `Client (Next.js) ─► API Routes ─► WebSocket Server
                                    │
                             PostgreSQL (pgvector)
                                    │
                              Redis Pub/Sub
                                    │
                           GitHub Webhooks Listener`,
    results: '60% reduction in PR turnaround. 94% user satisfaction score in post-launch survey. Zero downtime over 8 months of production.',
    screenshots: ['/projects/devflow-1.png', '/projects/devflow-2.png'],
  },
  {
    slug: 'openmetrics',
    title: 'OpenMetrics',
    description: 'An open-source observability dashboard that aggregates logs, metrics, and traces from any OpenTelemetry-compatible source.',
    outcome: 'Used by 200+ teams to replace Datadog at 1/10th the cost.',
    techStack: ['Go', 'React', 'ClickHouse', 'Grafana', 'Docker'],
    githubUrl: 'https://github.com/alexchen/openmetrics',
    stars: 800,
    image: '/projects/openmetrics.png',
    featured: true,
    problem: 'Observability tools like Datadog cost $50k+/year for mid-size teams. Most features go unused. OpenTelemetry data is vendor-locked once ingested.',
    constraints: 'Must support OpenTelemetry protocol natively. Dashboard must load within 1s even with 10M+ data points. Single-binary deployment for self-hosters.',
    architecture: `OTel Collector ─► Go Ingest Service ─► ClickHouse
                                              │
                                      React Dashboard
                                              │
                                     Query Engine (Go)`,
    results: '200+ production deployments. Average cost savings of $42k/year vs Datadog. 1.2k GitHub stars in first 3 months.',
    screenshots: ['/projects/openmetrics-1.png', '/projects/openmetrics-2.png'],
  },
  {
    slug: 'formcraft',
    title: 'FormCraft',
    description: 'A drag-and-drop form builder with conditional logic, multi-step flows, and webhook integrations.',
    outcome: 'Processes 2M+ form submissions per month with 99.9% uptime.',
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS Lambda', 'Stripe'],
    githubUrl: 'https://github.com/alexchen/formcraft',
    liveUrl: 'https://formcraft.example.com',
    stars: 320,
    image: '/projects/formcraft.png',
    featured: true,
    problem: 'No-code form builders lock data in proprietary formats and charge per-submission fees that become unsustainable at scale.',
    constraints: 'Drag-and-drop must be accessible via keyboard. Submissions must survive Lambda cold starts. Webhooks must retry with exponential backoff.',
    architecture: `React DnD Builder ─► Form Schema (JSON)
                                              │
                                   Node.js Submission API
                                              │
                               MongoDB + AWS Lambda Workers`,
    results: '2M+ monthly submissions. 99.9% uptime over 18 months. Webhook delivery rate: 99.97%.',
    screenshots: ['/projects/formcraft-1.png', '/projects/formcraft-2.png'],
  },
  {
    slug: 'sqlens',
    title: 'SQLens',
    description: 'A browser-based SQL query editor with AI-powered query suggestions, visual explain plans, and one-click sharing.',
    outcome: 'Helped 5,000+ developers diagnose slow queries without leaving the browser.',
    techStack: ['TypeScript', 'Python', 'PostgreSQL', 'OpenAI API', 'Vercel'],
    githubUrl: 'https://github.com/alexchen/sqlens',
    liveUrl: 'https://sqlens.example.com',
    image: '/projects/sqlens.png',
    featured: false,
    problem: 'Database GUIs are desktop-only and clunky. EXPLAIN output is hard to read. Sharing a slow query with a teammate requires screenshots.',
    constraints: 'Must not store raw query results (privacy). AI suggestions must stream. Shareable links must expire after 7 days.',
    architecture: `Browser ─► Next.js API ─► Python Query Analyzer
                                    │
                             PostgreSQL (target DB via connection string)
                                    │
                             OpenAI API (streaming)`,
    results: '5,000+ registered users. Average time-to-diagnosis reduced from 45 min to 8 min based on user surveys.',
    screenshots: ['/projects/sqlens-1.png'],
  },
]

export const skills: Skill[] = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', category: 'languages' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored', category: 'languages' },
  { name: 'Python', icon: 'devicon-python-plain colored', category: 'languages' },
  { name: 'Go', icon: 'devicon-go-plain colored', category: 'languages' },
  { name: 'SQL', icon: 'devicon-postgresql-plain colored', category: 'languages' },
  { name: 'React', icon: 'devicon-react-original colored', category: 'frontend' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', category: 'frontend' },
  { name: 'Vue', icon: 'devicon-vuejs-plain colored', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', category: 'frontend' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored', category: 'backend' },
  { name: 'Express', icon: 'devicon-express-original', category: 'backend' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', category: 'backend' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', category: 'backend' },
  { name: 'Redis', icon: 'devicon-redis-plain colored', category: 'backend' },
  { name: 'GraphQL', icon: 'devicon-graphql-plain colored', category: 'backend' },
  { name: 'Docker', icon: 'devicon-docker-plain colored', category: 'devops' },
  { name: 'Kubernetes', icon: 'devicon-kubernetes-plain colored', category: 'devops' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-plain colored', category: 'devops' },
  { name: 'Vercel', icon: 'devicon-vercel-plain', category: 'devops' },
  { name: 'GitHub Actions', icon: 'devicon-github-original', category: 'devops' },
]

export const experiences: Experience[] = [
  {
    company: 'Stripe',
    role: 'Senior Software Engineer',
    startDate: 'Mar 2023',
    endDate: 'Present',
    description: 'Building developer-facing APIs and dashboards for Stripe\'s payment infrastructure. Led the redesign of the Radar fraud rules editor, reducing false positives by 18%.',
    technologies: ['Ruby', 'TypeScript', 'React', 'PostgreSQL', 'Kafka'],
  },
  {
    company: 'Vercel',
    role: 'Software Engineer',
    startDate: 'Jan 2021',
    endDate: 'Feb 2023',
    description: 'Worked on the Next.js core team and Vercel deployment pipeline. Shipped the Image Optimization service v2 and contributed to the App Router RFC.',
    technologies: ['TypeScript', 'Next.js', 'Rust', 'Go', 'AWS'],
  },
  {
    company: 'Shopify',
    role: 'Junior Software Engineer',
    startDate: 'Jun 2019',
    endDate: 'Dec 2020',
    description: 'Built merchant-facing features for the Shopify admin panel. Owned the CSV import/export pipeline handling 50M+ rows daily.',
    technologies: ['Ruby on Rails', 'React', 'MySQL', 'Elasticsearch'],
  },
]

export const blogPosts: BlogPost[] = [
  {
    title: 'Why I Stopped Using useEffect for Data Fetching',
    excerpt: 'useEffect is a footgun for async data. Here\'s what I use instead in Next.js App Router, and why it makes my components dramatically simpler.',
    date: 'May 12, 2026',
    readTime: '6 min read',
    url: 'https://dev.to/alexchen/why-i-stopped-using-useeffect',
    category: 'React',
  },
  {
    title: 'ClickHouse vs PostgreSQL for Time-Series Data at Scale',
    excerpt: 'After migrating 800GB of metrics data from Postgres to ClickHouse, here\'s what I learned about column stores, materialized views, and query performance.',
    date: 'Apr 3, 2026',
    readTime: '10 min read',
    url: 'https://dev.to/alexchen/clickhouse-vs-postgres',
    category: 'Database',
  },
  {
    title: 'The Hidden Cost of Third-Party Scripts',
    excerpt: 'A single analytics tag cost us 1.2 seconds of LCP on mobile. Here\'s the audit process that found it and the mitigation strategies that actually work.',
    date: 'Feb 18, 2026',
    readTime: '8 min read',
    url: 'https://dev.to/alexchen/hidden-cost-third-party-scripts',
    category: 'Performance',
  },
]

export function getProjectBySlug(slug: string): Project {
  const project = projects.find((p) => p.slug === slug)
  if (!project) throw new Error(`Project not found: ${slug}`)
  return project
}
