// Single source of truth for all portfolio content.
// Sourced from Asad Rizvi's current resume.

export const profile = {
  name: 'Asad Rizvi',
  handle: 'asad11014',
  role: 'Technical Systems Manager · Full-Stack Engineer',
  tagline: 'I build the software that runs real operations.',
  location: 'London, England',
  availability: 'Open to fully remote — US & Canada teams',
  email: 'asadrz11014@gmail.com',
  phone: '07367927273',
  github: 'https://github.com/Asad11014',
  summary:
    "Full-stack engineer and Technical Systems Manager who builds the software that runs real operations. At a 3PL fulfilment company I designed and shipped ARAnalytics — a production inventory intelligence platform on top of the Mintsoft WMS — and white-labelled the client portal end to end. I own features across the stack: PostgreSQL data modelling, Node.js APIs and integrations, React front ends, and cloud deployment. BSc Computer Science (2:1). Seeking a remote software engineering role with a US or Canada based team.",
}

// Hero KPIs — the "control room" metrics
export const metrics = [
  { id: 'uptime', label: 'System uptime', value: 99.98, suffix: '%', decimals: 2, note: 'shipping in production' },
  { id: 'reports', label: 'Analytical reports built', value: 15, suffix: '+', decimals: 0, note: 'WMS can\'t generate natively' },
  { id: 'saved', label: 'Manual hours saved / wk', value: 5, prefix: '~', suffix: 'h', decimals: 0, note: 'via ARAnalytics automation' },
  { id: 'stack', label: 'Stack layers owned', value: 4, suffix: '', decimals: 0, note: 'DB · API · UI · Cloud' },
]

// Skills rendered as monitored "services"
export const services = [
  {
    group: 'Frontend',
    status: 'operational',
    items: [
      { name: 'React', level: 96 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vite', level: 88 },
      { name: 'React Router', level: 90 },
      { name: 'ApexCharts', level: 85 },
      { name: 'Responsive UI', level: 93 },
    ],
  },
  {
    group: 'Backend',
    status: 'operational',
    items: [
      { name: 'Node.js', level: 94 },
      { name: 'REST API design', level: 92 },
      { name: 'Spring Boot', level: 80 },
      { name: 'Server-Sent Events', level: 85 },
      { name: 'Cron / scheduled jobs', level: 88 },
      { name: 'Session auth', level: 87 },
    ],
  },
  {
    group: 'Databases',
    status: 'operational',
    items: [
      { name: 'PostgreSQL', level: 93 },
      { name: 'MySQL schema design', level: 86 },
      { name: 'Query optimisation', level: 84 },
      { name: 'ETL / sync pipelines', level: 90 },
    ],
  },
  {
    group: 'Languages',
    status: 'operational',
    items: [
      { name: 'JavaScript', level: 95 },
      { name: 'SQL', level: 90 },
      { name: 'Java', level: 82 },
      { name: 'Python', level: 80 },
      { name: 'HTML / CSS', level: 94 },
    ],
  },
  {
    group: 'Integrations',
    status: 'operational',
    items: [
      { name: 'Mintsoft WMS API', level: 91 },
      { name: 'Third-party REST APIs', level: 89 },
      { name: 'Data sync & reconciliation', level: 88 },
    ],
  },
  {
    group: 'Cloud / Tooling',
    status: 'operational',
    items: [
      { name: 'Git & GitHub', level: 93 },
      { name: 'Render (web + Postgres)', level: 88 },
      { name: 'CI/CD', level: 82 },
      { name: 'Agile / Kanban', level: 87 },
    ],
  },
]

// Projects rendered as "deployments"
export const projects = [
  {
    id: 'aranalytics',
    name: 'ARAnalytics',
    subtitle: 'Inventory Intelligence Platform for 3PLs',
    env: 'production',
    status: 'live',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Mintsoft API', 'Render'],
    demo: 'https://pf-landing.onrender.com',
    code: 'https://github.com/Asad11014/ARAnalytics',
    summary:
      'Production analytics platform giving 3PLs and their clients real-time visibility into warehouse operations: dashboards, order analytics, stock health, forecasting and revenue/cost reporting.',
    highlights: [
      'Architected a single-tenant SaaS: Node.js HTTP server, PostgreSQL data layer and a React SPA with cookie-based sessions and SSE streaming report progress.',
      'Engineered an ETL pipeline against the Mintsoft API (full + nightly incremental syncs) reconciling orders, stock, ASNs and invoices into PostgreSQL.',
      'Built a public, read-only demo backed by a deterministic seeded dataset in an isolated database — explore with no login and zero risk to real data.',
    ],
    // sparkline data for the deploy card chart
    chart: [12, 18, 15, 24, 30, 28, 41, 52, 49, 63, 71, 88],
    chartLabel: 'Reports served / day',
  },
  {
    id: 'pms',
    name: 'Project Management System',
    subtitle: 'Full-stack project & issue tracker',
    env: 'staging',
    status: 'live',
    stack: ['Spring Boot', 'Java', 'React', 'JavaScript', 'PostgreSQL'],
    demo: null,
    code: 'https://github.com/Asad11014/projectManagementSystem',
    summary:
      'Full-stack project/issue tracker with secure authentication, CRUD, tag-based filtering, role-based access, and real-time collaboration (invitations, messaging, comments).',
    highlights: [
      'Secure authentication with role-based access control across teams.',
      'Tag-based filtering and full CRUD over projects, issues and members.',
      'Real-time collaboration: invitations, messaging and threaded comments.',
    ],
    chart: [8, 14, 10, 20, 26, 22, 30, 27, 35, 33, 38, 44],
    chartLabel: 'Commits / week',
  },
]

// Career history rendered as a "deploy log"
export const deployLog = [
  {
    id: 'pf',
    org: 'Premium Fulfilment',
    title: 'Technical Systems Manager',
    location: 'London, UK',
    period: 'Jun 2025 — Present',
    current: true,
    tag: 'v3.0 · main',
    bullets: [
      'Designed, built and deployed ARAnalytics, a full-stack inventory intelligence platform (React · Node.js · PostgreSQL) on top of the Mintsoft WMS — replacing manual spreadsheet reporting with real-time dashboards used in daily operations.',
      'Engineered an ETL pipeline against the Mintsoft API (full + nightly incremental syncs) reconciling orders, stock, ASNs and invoices into PostgreSQL, powering 15+ analytical reports.',
      'White-labelled the Mintsoft WMS / client portal with the company branding — turning a generic third-party tool into a branded, first-party experience.',
      'Managed the WMS in a 3PL environment: optimised performance, kept courier/channel integrations running, and resolved integration issues with minimal downtime.',
    ],
  },
  {
    id: 'sakmo-teach',
    org: 'Sakmo Ltd.',
    title: 'Frontend Development Bootcamp Teacher (Part Time)',
    location: 'Remote',
    period: 'Apr 2025 — Present',
    current: true,
    tag: 'v2.1 · teaching',
    bullets: [
      'Design and deliver live online lectures and workshops in HTML, CSS, JavaScript and React.',
      'Create and assess assignments, quizzes and hands-on projects reinforcing real-world application.',
      'Mentor students through interactive Microsoft Teams sessions in an outcome-driven environment.',
    ],
  },
  {
    id: 'sakmo-be',
    org: 'Sakmo Ltd.',
    title: 'Backend Engineer',
    location: 'Remote',
    period: 'Jan 2025 — Apr 2025',
    current: false,
    tag: 'v2.0 · backend',
    bullets: [
      'Led backend development for a CMS (sakmo.com) — a storefront for enrolling in online courses.',
      'Designed and implemented the backend architecture using Node.js and MySQL, including RESTful APIs for authentication and core features.',
      'Worked in a small Agile team with daily stand-ups and Kanban boards.',
    ],
  },
  {
    id: 'uob',
    org: 'University of Birmingham',
    title: 'BSc Computer Science — 2:1',
    location: 'Birmingham, UK',
    period: 'Sep 2021 — Jul 2024',
    current: false,
    tag: 'v1.0 · genesis',
    bullets: ['BSc Computer Science, Upper Second-Class Honours (2:1).'],
  },
]
