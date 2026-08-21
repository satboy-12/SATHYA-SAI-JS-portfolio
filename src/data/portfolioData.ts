import profileImage from '../assets/profileImage';
import projectAiLeadUi from '../assets/images/project_ai_lead_ui_1787069025615.jpg';
import projectFirmwareUi from '../assets/images/project_firmware_ui_1787069039612.jpg';
import archWorkspaceWarm from '../assets/images/arch_workspace_warm_1787069059927.jpg';

export interface ProjectCaseStudy {
  id: string;
  num?: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  liveUrl?: string;
  githubUrl: string;
  architectureDetails: string[];
}

export interface SkillCategory {
  id?: string;
  name: string;
  label?: string;
  icon: string;
  skills: { name: string; level: number; tag: string }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  category?: string;
  issuer: string;
  year: string;
  badge: string;
  credentialId: string;
  description: string;
  skills?: string[];
}

export type CertificateItem = CertificationItem;

export const PORTFOLIO_PROFILE = {
  // Identity & Core Info
  name: "SATHYA SAI JS",
  brandMark: "SJS",
  brandShort: "SJS",
  shortName: "Sathya",
  signature: "Sathya Sai JS",
  availability: "AVAILABLE FOR OPPORTUNITIES",
  availabilityStatus: "AVAILABLE FOR OPPORTUNITIES",
  
  // Professional Titles
  roles: [
    "WEB & APP DEVELOPER",
    "CYBER SECURITY ENGINEER",
    "DATA ANALYST"
  ],
  roleTitle: "Web & App Developer @ BSRocks • Cyber Security Engineer • Data Analyst",
  tagline: "I build high-performance web & mobile applications, secure system architectures, and data-driven digital experiences.",
  quote: "I engineer intuitive web and app platforms, fortified by zero-trust security and powered by real-time data intelligence.",
  
  // Extended Bio from user's authentic portfolio
  aboutHeadline: "Building Impactful Web & Mobile Apps with Fortified Security",
  bio: "I'm a Web & App Developer at BSRocks, Cyber Security Engineer, and Data Analyst with a passion for building seamless digital products. At BSRocks, I architect modern responsive web platforms and cross-platform mobile apps. I operate at the intersection of frontend engineering, mobile development, cybersecurity defense, and data analytics to turn complex requirements into elegant, high-impact digital solutions.",
  
  // Contact & Location
  email: "sathyasaijs12@gmail.com",
  phone: "+91 12345 67890",
  whatsapp: "+91 12345 67890",
  location: "Chennai, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/sathya-sai-js",
  instagram: "https://instagram.com/sathya_sai_js",
  github: "https://github.com/satboy-12",
  resumeUrl: "#download-cv",

  socials: {
    linkedin: "https://www.linkedin.com/in/sathya-sai-js",
    github: "https://github.com/satboy-12",
    instagram: "https://instagram.com/sathya_sai_js",
    whatsapp: "https://wa.me/911234567890",
    email: "mailto:sathyasaijs12@gmail.com"
  },

  // Key Numerical Stats
  stats: [
    { value: "3+", label: "YEARS EXPERIENCE", desc: "Web, app & security engineering" },
    { value: "25+", label: "PROJECTS DELIVERED", desc: "Production web, mobile apps & systems" },
    { value: "100%", label: "CLIENT SATISFACTION", desc: "High performance & robust uptime" }
  ],

  // 4 Core Philosophy Pillars
  pillars: [
    {
      id: "develop",
      number: "01",
      title: "BUILD & SHIP",
      description: "I architect high-performance web applications and mobile apps with clean, scalable codebases."
    },
    {
      id: "secure",
      number: "02",
      title: "FORTIFY",
      description: "I build systems that protect and defend against modern cyber threats with zero-trust defense."
    },
    {
      id: "analyze",
      number: "03",
      title: "ANALYZE",
      description: "I extract valuable insights from telemetry and data to power executive decision-making."
    },
    {
      id: "innovate",
      number: "04",
      title: "INNOVATE",
      description: "I explore cutting-edge technologies to create lasting, user-centric positive impact."
    }
  ],

  // Tech Stack Logos / Badges
  technologiesWorkedWith: [
    { name: "React & React Native", category: "Web & Mobile" },
    { name: "TypeScript & JavaScript", category: "Frontend Engine" },
    { name: "Node.js & Express", category: "Backend REST APIs" },
    { name: "Tailwind CSS", category: "Design Systems" },
    { name: "Python", category: "Core Backend & AI" },
    { name: "Linux Kali / Ubuntu", category: "Security & Hardening" },
    { name: "Power BI", category: "Business Intelligence" },
    { name: "SQL & PostgreSQL", category: "Relational Databases" }
  ],

  // My Journey / Timeline
  timeline: [
    {
      period: "2025 - Present",
      degree: "Web & App Developer",
      institution: "BSRocks",
      location: "Chennai, India",
      highlight: "Leading frontend web engineering and cross-platform mobile application development. Building high-performance responsive interfaces in React/TypeScript, integrating backend REST APIs, optimizing mobile touch UX, and implementing secure state architecture."
    },
    {
      period: "2025 - Present",
      degree: "Technical Associate",
      institution: "Braiil Academy",
      location: "Chennai, India",
      highlight: "Providing technical academic support to students & faculty, developing educational materials, assisting in data management, and automating learning platforms."
    },
    {
      period: "2024 - 2027",
      degree: "B.E. Cyber Security",
      institution: "Sri Ram Engineering College",
      location: "Chennai, India",
      highlight: "Specialized focus on network defense, penetration testing, cryptography and secure software lifecycle."
    },
    {
      period: "2020 - 2023",
      degree: "Diploma in ECE",
      institution: "CPCL Polytechnic College",
      location: "Chennai, India",
      highlight: "Electronics & Communication Engineering foundations, microcontroller systems and hardware protocols."
    }
  ],

  // Toolkit / Skills Domain
  toolkitCategories: [
    {
      id: "web_app_development",
      name: "Web & App Dev",
      label: "Web & App Dev",
      count: 8,
      skills: [
        "React.js & Vite Architecture",
        "React Native Mobile Apps",
        "TypeScript & JavaScript (ES6+)",
        "Tailwind CSS & UI/UX Systems",
        "Node.js & Express REST APIs",
        "State Management (Redux/Zustand)",
        "Mobile Responsive Design",
        "CI/CD Deployment & Git"
      ]
    },
    {
      id: "cyber_security",
      name: "Cyber Security",
      label: "Cyber Security",
      count: 9,
      skills: [
        "Network Security",
        "Web Application Security",
        "Malware Analysis",
        "Security Automation",
        "Blockchain Security",
        "Cloud Security",
        "Cyber Forensics",
        "Ethical Hacking",
        "Security Fundamentals"
      ]
    },
    {
      id: "data_analysis",
      name: "Data Analysis",
      label: "Data Analysis",
      count: 6,
      skills: [
        "Power BI Dashboards",
        "Data Analytics Certification",
        "Pandas & NumPy",
        "Plotly Data Visualizations",
        "DAX Modeling",
        "Statistical Intelligence"
      ]
    },
    {
      id: "programming",
      name: "Programming",
      label: "Programming",
      count: 6,
      skills: [
        "Python",
        "JavaScript / TypeScript",
        "C / C++",
        "Java",
        "Bash / Shell Scripting",
        "SQL Query Optimization"
      ]
    },
    {
      id: "tools",
      name: "Tools & Infrastructure",
      label: "Tools & Infrastructure",
      count: 6,
      skills: [
        "Wireshark Packet Analysis",
        "Burp Suite Professional",
        "Metasploit Framework",
        "Nmap Security Scanner",
        "Git & GitHub Repositories",
        "Linux Kali & Ubuntu"
      ]
    }
  ],

  // Featured Projects / Selected Work
  projects: [
    {
      id: "bsrocks-enterprise-web-platform",
      num: "01",
      number: "01",
      title: "BSROCKS ENTERPRISE WEB PLATFORM",
      category: "WEB DEVELOPMENT • REACT • BSRocks",
      shortDesc: "High-performance enterprise web application engineered at BSRocks featuring interactive client interfaces, modular components, and real-time data sync.",
      description: "A flagship production web platform engineered for BSRocks. Features component-driven architecture with React and TypeScript, sub-millisecond route transitions with Vite, Tailwind CSS design system, and secure JWT authentication pipelines.",
      tags: ["React", "TypeScript", "Tailwind CSS", "REST API", "BSRocks", "Vite"],
      metrics: [
        { label: "Lighthouse Performance", value: "99/100" },
        { label: "Load Time", value: "< 0.8s" },
        { label: "Uptime Metric", value: "99.98%" }
      ],
      image: archWorkspaceWarm,
      liveUrl: "https://bsrocks.com",
      githubUrl: "https://github.com/satboy-12/bsrocks-web-platform",
      architectureDetails: [
        "Modular React component design system with reusable atomic patterns",
        "Type-safe data contracts across frontend views and REST backend microservices",
        "Optimized asset delivery pipeline and code-splitting achieving sub-second initial loads"
      ]
    },
    {
      id: "bsrocks-mobile-app",
      num: "02",
      number: "02",
      title: "BSROCKS CROSS-PLATFORM MOBILE APP",
      category: "MOBILE APP • REACT NATIVE • BSRocks",
      shortDesc: "Native-grade cross-platform mobile application developed at BSRocks delivering fluid user interactions, push notifications, and offline caching.",
      description: "A comprehensive mobile experience engineered for iOS and Android platforms at BSRocks. Incorporates smooth 60fps gesture navigation, biometric user login, local offline state synchronization, and real-time client notification services.",
      tags: ["React Native", "Mobile App", "TypeScript", "BSRocks", "Push Notifications"],
      metrics: [
        { label: "Frame Rate", value: "60 FPS" },
        { label: "Crash-Free Rate", value: "99.9%" },
        { label: "Offline Storage", value: "SQLite Sync" }
      ],
      image: projectAiLeadUi,
      liveUrl: "https://bsrocks.com/app",
      githubUrl: "https://github.com/satboy-12/bsrocks-mobile-app",
      architectureDetails: [
        "Cross-platform codebase utilizing React Native and TypeScript",
        "Robust offline-first architecture with localized SQLite caching and sync queue",
        "Native bridge integrations for biometric authentication and push notifications"
      ]
    },
    {
      id: "ai-lead-classification",
      num: "03",
      number: "03",
      title: "AI LEAD CLASSIFICATION PLATFORM",
      category: "AI • DATA ANALYTICS • PYTHON",
      shortDesc: "Intelligent system to validate, classify and analyze large lead datasets with advanced analytics.",
      description: "An intelligent data engine built to ingest, sanitize, and classify prospective lead datasets in real-time. Features interactive visual telemetry, anomaly detection, and automated predictive scoring models.",
      tags: ["Python", "Streamlit", "Pandas", "Plotly", "AI Classification"],
      metrics: [
        { label: "Data Throughput", value: "50k records/min" },
        { label: "Classification Accuracy", value: "98.4%" },
        { label: "Processing Latency", value: "< 240ms" }
      ],
      image: projectAiLeadUi,
      githubUrl: "https://github.com/satboy-12/ai-lead-analysis-bot",
      architectureDetails: [
        "Vectorized preprocessing using Pandas and NumPy",
        "Interactive analytics dashboards powered by Plotly & Streamlit",
        "REST API microservice for seamless CRM and database sync"
      ]
    },
    {
      id: "blockchain-secure-firmware",
      num: "04",
      number: "04",
      title: "BLOCKCHAIN SECURE FIRMWARE UPDATE SYSTEM",
      category: "BLOCKCHAIN • SECURITY • EMBEDDED",
      shortDesc: "Blockchain-enhanced secure firmware update system with cryptographic hash verification.",
      description: "A tamper-evident firmware deployment protocol leveraging decentralized cryptographic consensus to guarantee zero unauthorized microcode execution on IoT controllers.",
      tags: ["Python", "Blockchain", "Security", "Cryptographic Signatures"],
      metrics: [
        { label: "Tamper Immunity", value: "100%" },
        { label: "Node Verification", value: "12 Validator Nodes" },
        { label: "Rollback Protection", value: "Enforced" }
      ],
      image: projectFirmwareUi,
      githubUrl: "https://github.com/satboy-12/blockchain-secure-firmware",
      architectureDetails: [
        "ECDSA digital signature validation for firmware binaries",
        "Smart contract registry for firmware hash immutable logs",
        "Hardware-level anti-rollback and integrity checks"
      ]
    },
    {
      id: "data-analytics-powerbi",
      num: "05",
      number: "05",
      title: "POWER BI DATA ANALYTICS SUITE",
      category: "DATA ANALYTICS • BUSINESS INTELLIGENCE",
      shortDesc: "Collection of Power BI dashboards and data analytics projects for high-impact decision support.",
      description: "Multi-dimensional analytical dashboards processing enterprise metrics, customer conversion cohorts, and operational health KPIs with DAX-optimized calculations.",
      tags: ["Power BI", "DAX", "SQL", "Data Modeling"],
      metrics: [
        { label: "Dashboards Built", value: "15+ Suites" },
        { label: "Query Optimization", value: "4x Faster" },
        { label: "Visual Reports", value: "Automated" }
      ],
      image: archWorkspaceWarm,
      githubUrl: "https://github.com/satboy-12/data-analytics-powerbi",
      architectureDetails: [
        "Advanced DAX measures for dynamic time-intelligence calculations",
        "Star-schema relational data model with normalized tables",
        "Automated data refresh schedules connected to SQL databases"
      ]
    },
    {
      id: "cyber-security-lab",
      num: "06",
      number: "06",
      title: "CYBER SECURITY LAB & EXPLOIT FRAMEWORK",
      category: "OFFENSIVE SECURITY • AUTOMATION",
      shortDesc: "Collection of cybersecurity testing tools, automated scanning scripts, and penetration testing labs.",
      description: "A comprehensive laboratory repository featuring custom network scanners, payload testing harnesses, and automated vulnerability validation modules.",
      tags: ["Security", "Python", "Bash", "Kali Linux"],
      metrics: [
        { label: "Automated Test Modules", value: "35+ Scripts" },
        { label: "OWASP Coverage", value: "Top 10" },
        { label: "Recon Automation", value: "Instant" }
      ],
      image: projectAiLeadUi,
      githubUrl: "https://github.com/satboy-12/cyber-security-lab",
      architectureDetails: [
        "Custom Python scripts for port scanning and banner grabbing",
        "Automated reporting engine generating CVE vulnerability matrices",
        "Isolated Docker containers simulating vulnerable target topologies"
      ]
    }
  ],

  // Open Source Repositories
  openSourceRepos: [
    {
      id: "repo_bsrocks_web",
      name: "bsrocks-web-platform",
      description: "Enterprise web application built for BSRocks with React, TypeScript and Tailwind CSS.",
      tags: ["React", "TypeScript", "Tailwind", "BSRocks"],
      stars: 52,
      forks: 24,
      url: "https://github.com/satboy-12/bsrocks-web-platform"
    },
    {
      id: "repo_bsrocks_app",
      name: "bsrocks-mobile-app",
      description: "Cross-platform iOS and Android application with real-time sync and smooth touch UX.",
      tags: ["React Native", "TypeScript", "Mobile", "BSRocks"],
      stars: 48,
      forks: 19,
      url: "https://github.com/satboy-12/bsrocks-mobile-app"
    },
    {
      id: "repo_1",
      name: "ai-lead-analysis-bot",
      description: "AI powered lead analysis and classification platform with interactive visual analytics.",
      tags: ["Python", "Streamlit", "Pandas"],
      stars: 45,
      forks: 18,
      url: "https://github.com/satboy-12/ai-lead-analysis-bot"
    },
    {
      id: "repo_2",
      name: "blockchain-secure-firmware",
      description: "Blockchain enhanced secure firmware update system with cryptographic validation.",
      tags: ["Python", "Blockchain", "Security"],
      stars: 32,
      forks: 12,
      url: "https://github.com/satboy-12/blockchain-secure-firmware"
    },
    {
      id: "repo_3",
      name: "data-analytics-powerbi",
      description: "Power BI dashboards and data analytics projects for business intelligence.",
      tags: ["Power BI", "DAX", "SQL"],
      stars: 28,
      forks: 9,
      url: "https://github.com/satboy-12/data-analytics-powerbi"
    },
    {
      id: "repo_4",
      name: "cyber-security-lab",
      description: "Collection of cybersecurity testing tools, automation scripts, and defense labs.",
      tags: ["Security", "Python", "Bash"],
      stars: 36,
      forks: 14,
      url: "https://github.com/satboy-12/cyber-security-lab"
    }
  ],

  // Verified Certifications
  certifications: [
    {
      id: "cert_power_bi",
      title: "Power BI Data Analytics",
      category: "DATA ANALYTICS",
      issuer: "Microsoft / Authorized Certification",
      year: "2025",
      badge: "DATA SPECIALIST",
      credentialId: "MS-PBI-99410",
      description: "Demonstrated expertise in enterprise business intelligence, DAX modeling, data shaping, and analytical visual reporting.",
      skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"]
    },
    {
      id: "cert_data_analytics",
      title: "Data Analytics Certification",
      category: "DATA SCIENCE",
      issuer: "Google / Industry Accredited",
      year: "2024",
      badge: "ANALYTICS CORE",
      credentialId: "GOOG-DA-77218",
      description: "Comprehensive credential covering statistical analysis, exploratory data analysis, SQL querying, and predictive visualization.",
      skills: ["SQL", "Data Cleaning", "Data Analytics", "Visualization"]
    },
    {
      id: "cert_python",
      title: "Python Programming",
      category: "PROGRAMMING",
      issuer: "Python Institute / Certified Associate",
      year: "2024",
      badge: "CODE MASTERY",
      credentialId: "PY-PCAP-44091",
      description: "Core fluency in object-oriented programming, data structures, algorithm optimization, and automated security scripting.",
      skills: ["Python", "Algorithms", "Automation", "OOP"]
    },
    {
      id: "cert_cyber_sec",
      title: "Cyber Security Fundamentals",
      category: "CYBER SECURITY",
      issuer: "EC-Council & Cisco Networking",
      year: "2024",
      badge: "SECURITY VERIFIED",
      credentialId: "ECC-CS-88301",
      description: "Specialized training in defense-in-depth security principles, network vulnerability scanning, cryptography, and access controls.",
      skills: ["Network Security", "Ethical Hacking", "Cryptography", "Vulnerability Scanning"]
    }
  ],

  images: {
    heroPortrait: profileImage,
    aboutPortrait: profileImage,
    footerPortrait: profileImage,
    archWorkspace: archWorkspaceWarm,
    aiLeadUi: projectAiLeadUi,
    firmwareUi: projectFirmwareUi
  }
};

// Aliases for backward compatibility
export const SELECTED_PROJECTS = PORTFOLIO_PROFILE.projects;
export const CERTIFICATIONS_LIST = PORTFOLIO_PROFILE.certifications;
export const GITHUB_REPOSITORIES = PORTFOLIO_PROFILE.openSourceRepos;
export const SKILL_CATEGORIES: SkillCategory[] = PORTFOLIO_PROFILE.toolkitCategories.map(c => ({
  id: c.id,
  name: c.name,
  label: c.name,
  icon: 'Shield',
  skills: c.skills.map(s => ({ name: s, level: 90, tag: c.name }))
}));
