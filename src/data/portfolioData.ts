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
    "CYBER SECURITY ENGINEER",
    "SOFTWARE DEVELOPER",
    "DATA ANALYST"
  ],
  roleTitle: "Cyber Security Engineer • Software Developer • Data Analyst",
  tagline: "I build secure systems, intelligent applications and data-driven digital experiences.",
  quote: "I build secure systems, intelligent applications and data-driven digital experiences.",
  
  // Extended Bio from user's authentic portfolio
  aboutHeadline: "Turning Ideas Into Secure Digital Solutions",
  bio: "I'm a passionate Cyber Security Engineer, Software Developer and Data Analyst who loves solving complex problems and building impactful digital solutions. I work at the intersection of cybersecurity, software development and data analytics, transforming technical problems into practical digital solutions.",
  
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

  // Key Numerical Stats (Exact from Images)
  stats: [
    { value: "3+", label: "YEARS EXPERIENCE", desc: "Hands-on engineering & analysis" },
    { value: "20+", label: "PROJECTS COMPLETED", desc: "Production apps, labs & systems" },
    { value: "10+", label: "TECHNOLOGIES MASTERED", desc: "Full-stack & security tooling" }
  ],

  // 4 Core Philosophy Pillars (Exact from Images)
  pillars: [
    {
      id: "secure",
      number: "01",
      title: "SECURE",
      description: "I build systems that protect and defend against modern cyber threats."
    },
    {
      id: "develop",
      number: "02",
      title: "DEVELOP",
      description: "I code, build and bring ideas to life with scalable architectures."
    },
    {
      id: "analyze",
      number: "03",
      title: "ANALYZE",
      description: "I analyze data and extract valuable insights to power decision-making."
    },
    {
      id: "innovate",
      number: "04",
      title: "INNOVATE",
      description: "I explore new technologies and create lasting positive impact."
    }
  ],

  // Tech Stack Logos / Badges
  technologiesWorkedWith: [
    { name: "Python", category: "Core Backend & AI" },
    { name: "C++", category: "Systems & Firmware" },
    { name: "Java", category: "Enterprise Software" },
    { name: "JavaScript", category: "Web Engineering" },
    { name: "React", category: "Frontend Ecosystem" },
    { name: "Linux", category: "OS & Kernel Hardening" },
    { name: "Power BI", category: "Business Intelligence" },
    { name: "SQL", category: "Relational Databases" }
  ],

  // My Journey / Timeline (Exact from Images)
  timeline: [
    {
      period: "2020 - 2023",
      degree: "Diploma in ECE",
      institution: "CPCL Polytechnic College",
      location: "Chennai, India",
      highlight: "Electronics & Communication Engineering foundations, microcontroller systems and hardware protocols."
    },
    {
      period: "2024 - 2027",
      degree: "B.E. Cyber Security",
      institution: "Sri Ram Engineering College",
      location: "Chennai, India",
      highlight: "Specialized focus on network defense, penetration testing, cryptography and secure software lifecycle."
    },
    {
      period: "2025 - Present",
      degree: "Technical Associate",
      institution: "Braiil Academy",
      location: "Chennai, India",
      highlight: "Providing technical academic support to students & faculty, developing educational materials, assisting in data management, and automating learning platforms."
    }
  ],

  // Toolkit / Skills Domain (Exact from Images)
  toolkitCategories: [
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
      id: "development",
      name: "Development",
      label: "Development",
      count: 6,
      skills: [
        "React & Vite Architecture",
        "Node.js & Express REST APIs",
        "Tailwind CSS Design Systems",
        "Full-Stack Web Engineering",
        "CI/CD Workflows",
        "Secure API Endpoints"
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

  // Featured Projects / Selected Work (Exact from Images)
  projects: [
    {
      id: "ai-lead-classification",
      num: "01",
      number: "01",
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
      num: "02",
      number: "02",
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
      num: "03",
      number: "03",
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
      num: "04",
      number: "04",
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

  // Open Source Repositories (Exact from Image 2 "CODE. BUILD. SHIP.")
  openSourceRepos: [
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

  // Verified Certifications (Exact from Images)
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
