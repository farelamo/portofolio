// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Fariz Fahmi Faturachmad',
  firstName: 'Fariz',
  roles: ['DevOps Engineer', 'Golang Backend Engineer', 'Kubernetes Wrangler', 'AI Agent Builder', 'Fullstack Developer'],
  summary:
    'Passionate and results-driven Software Engineer with over 2 years of extensive experience in designing and developing scalable systems. Proficient in multiple programming languages and frameworks, with a strong emphasis on performance optimization, system scalability, and security. Excellent problem-solving skills and a proven ability to work in fast-paced environments.',
  contacts: {
    phone: '081234631783',
    email: 'farizfahmi674@gmail.com',
    linkedin: 'https://linkedin.com/in/fariz-fahmi-faturachmad',
    github: 'https://github.com/farelamo',
  },
}

/** Fun facts the gopher tells in the hero playground. */
export const facts = [
  'Fariz cut Docker build time from ~8 min to ~1 min. That is ~87% faster!',
  'He tuned existing endpoints to run up to 400% faster.',
  'He manages multi-cluster Kubernetes with Cluster API (CAPI).',
  'He built an MCP server so AI can help debug production live.',
  'His infrastructure spans AWS, GCP and Alibaba Cloud.',
  'He finished at Brawijaya University with a 3.92 GPA.',
  'His web design placed Top 4 at Portal Kab. Sidoarjo (2021).',
]

export const tapes = [
  ['Go', 'Kubernetes', 'Docker', 'ArgoCD', 'Jenkins', 'Vault', 'Ansible', 'Kafka', 'Debezium', 'Prometheus', 'Grafana', 'ELK'],
  ['AWS', 'GCP', 'Alibaba Cloud', 'GKE Autopilot', 'Cluster API', 'PostgreSQL', 'Redis', 'Laravel', 'React', 'Vue', 'N8N', 'Gemini AI'],
]

export const highlights = [
  {
    art: 'gitops',
    tint: '#D8E8FF',
    title: 'Kubernetes & GitOps platform',
    text: 'Vanilla Kubernetes with Cluster API for multi-cluster lifecycle management, cost-optimized with GKE Autopilot. Secure GitOps deployments via Jenkins, ArgoCD and HashiCorp Vault Injector.',
    tags: ['Cluster API', 'GKE Autopilot', 'ArgoCD', 'Jenkins', 'Vault'],
  },
  {
    art: 'agent',
    tint: '#ECE4FF',
    title: 'AI-driven incident debugging',
    text: 'A custom MCP server on top of Prometheus, Grafana, ELK APM and Uptime Kuma for AI-assisted live debugging and automated RCA, improving MTTD. Plus agentic workflows with N8N Agent Nodes and Gemini AI.',
    tags: ['MCP', 'Prometheus', 'Grafana', 'ELK APM', 'N8N', 'Gemini'],
  },
  {
    art: 'cloud',
    tint: '#FFF0C7',
    title: 'High-availability multi-cloud',
    text: 'Architecture across AWS, GCP and Alibaba Cloud: deployment, VPN tunneling, VPC peering and firewall configuration.',
    tags: ['AWS', 'GCP', 'Alibaba Cloud', 'VPN', 'VPC Peering'],
  },
  {
    art: 'cdc',
    tint: '#D6F7E7',
    title: 'CDC data pipelines',
    text: 'Kafka + Debezium pipelines integrating MariaDB, PostgreSQL and the ELK stack for warehousing and dashboards, minimizing data loss during production database incidents.',
    tags: ['Kafka', 'Debezium', 'MariaDB', 'PostgreSQL', 'ELK'],
  },
]

// kind drives the icon + color of each experience "pod"
export const experiences = [
  {
    slug: 'pose-devops-engineer',
    kind: 'devops',
    company: 'PT POSe.id',
    role: 'DevOps Engineer',
    period: 'Oct 2025 – Now',
    current: true,
    tags: ['Kubernetes', 'CAPI', 'GKE', 'ArgoCD', 'Jenkins', 'Vault', 'Ansible', 'Kafka', 'MCP', 'N8N'],
    points: [
      'Engineered robust, scalable, highly available vanilla Kubernetes with Cluster API (CAPI) for multi-cluster lifecycle management, optimized costs with GKE Autopilot, and automated secure GitOps deployments via Jenkins, ArgoCD and HashiCorp Vault Injector.',
      'Developed a custom MCP (Model Context Protocol) server on Prometheus, Grafana, ELK APM and Uptime Kuma for AI-driven live debugging and automated root-cause analysis, significantly improving MTTD.',
      'Used Ansible for provisioning, configuration management and system hardening aligned with PCI DSS and ISO 27001, reaching ~70–80% compliance against organizational security requirements.',
      'Optimized Docker build pipelines with multi-stage builds, layer caching and dependency optimization: ~8 min → ~1 min (~87% faster).',
      'Built an Agentic AI system with N8N Agent Nodes and Gemini AI to automate workflows, execute tasks and reduce repetitive operations.',
      'Designed a high-availability multi-cloud architecture across AWS, GCP and Alibaba Cloud, including VPN tunneling, VPC peering and firewall configuration.',
      'Maintained CDC pipelines with Kafka and Debezium, integrating MariaDB, PostgreSQL and ELK for warehousing and dashboards while minimizing data loss during production DB incidents.',
    ],
  },
  {
    slug: 'pose-golang-backend',
    kind: 'backend',
    company: 'PT POSe.id',
    role: 'Golang Backend Engineer',
    period: 'Mar 2024 – Oct 2025',
    tags: ['Go', 'Gin', 'GORM', 'Event-Driven', 'Prometheus', 'Grafana', 'ELK'],
    points: [
      'Developed Go backends using monolith, event-driven architecture and multithreading to improve scalability, performance and reliability.',
      'Optimized multiple existing endpoints for up to a 400% speed increase through meticulous analysis and targeted improvements.',
      'Built a standardized logging package with Gin and GORM, integrated with Grafana, Prometheus, APM and ELK, for faster root cause analysis and consistent logs.',
    ],
  },
  {
    slug: 'synapsis-golang-intern',
    kind: 'backend',
    company: 'PT Synapsis Sinergi Digital',
    role: 'Golang Backend Intern (Paid)',
    period: 'Sep 2023 – Mar 2024',
    tags: ['Go', 'Fiber', 'PostgreSQL', 'Kafka', 'Docker', 'Vault'],
    points: [
      'Developed backends in Go with Fiber, PostgreSQL and Kafka-based microservices to scale performance and data availability.',
      'Contributed to a leave management application for requesting, approving and tracking several leave types.',
      'Containerized each service with Docker and secured environments using Vault.',
    ],
  },
  {
    slug: 'freelance-fullstack',
    kind: 'fullstack',
    company: 'Freelance',
    role: 'Fullstack Web Developer',
    period: 'Sep 2022 – Feb 2024',
    tags: ['Laravel', 'Vue JS', 'Job Queue', 'Scheduler', 'SSO'],
    points: [
      'Built “Bank Sampah”, a bank application, with 3 other developers: Laravel backend and Vue JS frontend.',
      'Developed financial features such as automatic customer balance calculation via task scheduler and job queue.',
      'Integrated manual data processing through Excel import/export for reporting and analysis.',
      'Built a workshop application for Badiklat BPK RI with Laravel jobs, schedules and notifications, integrated with their SSO Auth.',
    ],
  },
  {
    slug: 'bimasakti-fullstack-intern',
    kind: 'fullstack',
    company: 'PT Bimasakti Multi Sinergi',
    role: 'Fullstack Engineer Intern (Paid)',
    period: 'Oct 2022 – Dec 2022',
    tags: ['React JS', 'CodeIgniter 3', 'Next JS', 'Gin'],
    points: [
      'Developed a SaaS project with React JS and CodeIgniter 3.',
      'Collaborated on PPOB (Payment Point Online Bank) using Next JS and Gin Golang for the backend API.',
    ],
  },
  {
    slug: 'asiacommerce-fullstack-intern',
    kind: 'fullstack',
    company: 'PT Asia Commerce Network',
    role: 'Fullstack Developer Intern (Paid)',
    period: 'Jun 2022 – Oct 2022',
    tags: ['Vue JS', 'Nuxt', 'Laravel', 'MySQL'],
    points: [
      'Developed a voucher system for e-commerce web applications with Vue JS and Nuxt.',
      'Created backend applications in PHP with Laravel and MySQL.',
    ],
  },
  {
    slug: 'irestech-web-developer',
    kind: 'org',
    company: 'Irestech Brawijaya University',
    role: 'Web Developer (Organization)',
    period: 'Jul 2021 – Dec 2022',
    tags: ['Laravel', 'Angular JS', 'Leaflet', 'ApexCharts'],
    points: [
      'Built a virtual website display of the tree mapping at Brawijaya University with the team.',
      'Used Laravel and Angular JS, integrated with Leaflet for custom mapping and ApexCharts for annual reports.',
    ],
  },
]

export const education = [
  {
    school: 'Brawijaya University',
    degree: 'A.A.S. Information Technology',
    detail: 'Computer Engineering concentration',
    period: 'Sep 2020 – Jul 2023',
    gpa: 3.92,
    thesis: 'Design of Medical Record System at Griya Waras Clinic Using Laravel Framework',
  },
  {
    school: 'Binus University',
    degree: 'Bachelor of Science in Computer Science',
    detail: 'Online Class',
    period: 'Jul 2026 – Dec 2027',
    start: '2026-07-01',
    end: '2027-12-31',
  },
]

export const awards = [{ title: 'Top 4 Web Design Portal Kab. Sidoarjo', year: '2021' }]

export const skills = [
  { group: 'Backend', color: '#00ADD8', items: ['Go', 'Fiber', 'Gin', 'GORM', 'PHP', 'Laravel', 'Vault', 'Redis'] },
  { group: 'Frontend', color: '#FFC93C', items: ['JavaScript', 'React', 'Next', 'Vue', 'Nuxt', 'Tailwind CSS'] },
  { group: 'Database', color: '#3DDC97', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'TiDB', 'Redis', 'Firebase'] },
  { group: 'DevOps', color: '#326CE5', items: ['Docker', 'Jenkins', 'Ansible', 'AWS', 'GCP', 'Alibaba Cloud', 'Debezium', 'Wazuh'] },
  { group: 'Others', color: '#FF7AB6', items: ['Linux', 'Apache Kafka', 'N8N', 'Google Pub/Sub', 'Postman', 'Apidog', 'Microservices', 'Kubernetes'] },
]
