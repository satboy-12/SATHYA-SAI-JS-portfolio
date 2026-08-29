import { PortfolioData, ProjectCaseStudy, Milestone, SkillItem, SocialLink } from '../types';

export const portfolioData: PortfolioData = {
  firstName: "SATHYA SAI",
  lastName: "JS",
  rolePrimary: "Cyber Security Engineer",
  roleSecondary: "Software Developer",
  roleExtra: "Data Analyst",
  intro: "Motivated Security Engineering student with hands-on experience across software development, data analytics and network security — passionate about application security, penetration testing and secure-by-design outcomes.",
  logoInitials: "SS.",
  fullName: "Sathya Sai J S",
  age: "--",
  location: "Chennai, Tamil Nadu, India",
  email: "sathyasaijs12@gmail.com",
  phone: "+91 7305662449",
  photo: "/images/sathya-portfolio-photo.jpg",
  secondaryPhoto: "/images/sathya-image-1.jpg",
  aboutText: "I'm a B.E. Cyber Security student at Sri Ram Engineering College with a diploma in Electronics & Communication and hands-on industry exposure spanning security training support, data analysis and multiple internships in network security and blockchain. My focus: finding vulnerabilities before attackers do, and building systems designed to be secure from day one.",
  resumeUrl: "#",
  skills: [
    {
      icon: "shield",
      title: "Cyber Security",
      desc: "Network & information security, vulnerability assessment, threat analysis, risk assessment and security fundamentals.",
      tags: ["Threat Analysis", "Vulnerability Assessment", "Risk Assessment", "Network Defense", "Zero-Trust"]
    },
    {
      icon: "code",
      title: "Programming",
      desc: "Python, Java, C, C++ and SQL — across scripting, backend logic and secure application development.",
      tags: ["Python", "Java", "C / C++", "SQL", "Secure Scripting", "Backend Logic"]
    },
    {
      icon: "mobile",
      title: "Software Development",
      desc: "Building working tools end-to-end, from Streamlit platforms to structured documentation and tested implementations.",
      tags: ["Streamlit", "Automation", "Tooling", "Documentation", "Testing", "System Integration"]
    },
    {
      icon: "chart",
      title: "Data Analytics",
      desc: "Power BI dashboards, SQL-based data preparation, visualization and insights that drive business decisions.",
      tags: ["Power BI", "SQL Data Prep", "KPI Dashboards", "Data Modeling", "Business Intelligence"]
    },
    {
      icon: "rocket",
      title: "Security Testing Tools",
      desc: "Wireshark, Kali, Burp Suite — traffic analysis, evidence collection and penetration-testing readiness.",
      tags: ["Wireshark", "Kali Linux", "Burp Suite", "Traffic Analysis", "Evidence Collection", "Pen-Testing"]
    },
    {
      icon: "megaphone",
      title: "Workflow & Tooling",
      desc: "Git, GitHub, MySQL, VS Code and Jupyter Notebook with disciplined reporting and cross-functional collaboration.",
      tags: ["Git & GitHub", "MySQL", "VS Code", "Jupyter Notebook", "Structured Reporting"]
    }
  ],
  projects: [
    {
      id: "lead-classification-system",
      number: "01",
      name: "Lead Classification Management System",
      title: "Lead Classification Management System",
      subtitle: "Python · Automation · Analytical Platform",
      category: "Python · Automation",
      desc: "Lead classification platform for educational institutions covering all 38 districts of Tamil Nadu. Automated categorization rules, validation checks, dashboard visualizations and analytical reports for faster responsibility-based decisions.",
      description: "Lead classification platform for educational institutions covering all 38 districts of Tamil Nadu. Automated categorization rules, validation checks, dashboard visualizations and analytical reports for faster responsibility-based decisions.",
      longDescription: "Architected an automated multi-district educational lead classification engine in Python and Streamlit. The system implements rule-based decision trees, automated input sanitization, dynamic geographical filters across Tamil Nadu, and exportable executive intelligence summaries.",
      image: "/images/project_ai_lead_ui_1787069025615.jpg",
      tags: ["Python", "Streamlit", "Excel", "Automation", "Data Validation"],
      tech: ["Python", "Streamlit", "Excel", "Automation"],
      metrics: [
        { label: "DISTRICT COVERAGE", value: "38 Districts" },
        { label: "DECISION LATENCY", value: "5x Faster" },
        { label: "AUTOMATION RATE", value: "100% Rules" }
      ],
      highlights: [
        "Automated categorization rules and validation checks across all 38 districts of Tamil Nadu",
        "Streamlit-based responsive dashboard with real-time query filtering and data hygiene pipelines",
        "Automated analytical report generation enabling faster responsibility-based institutional choices"
      ],
      githubUrl: "https://github.com/satboy-12"
    },
    {
      id: "blockchain-firmware-update",
      number: "02",
      name: "Blockchain Safe Firmware Update System",
      title: "Blockchain Safe Firmware Update System",
      subtitle: "Vehicular Security · SIMATS Conference Research",
      category: "Blockchain · Cyber Security · Research",
      desc: "Secure blockchain-based firmware update mechanism for modern vehicles with tamper-evident and integrity controls. Presented as a research paper at SIMATS Engineering Conference.",
      description: "Secure blockchain-based firmware update mechanism for modern vehicles with tamper-evident and integrity controls. Presented as a research paper at SIMATS Engineering Conference.",
      longDescription: "Authored and presented academic research on zero-trust over-the-air (OTA) automotive firmware dissemination. The architecture employs smart contract validation and cryptographic hash chain verification to prevent malicious firmware injection on vehicular electronic control units (ECUs).",
      image: "/images/project_firmware_ui_1787069039612.jpg",
      tags: ["Blockchain", "Cyber Security", "Research", "Smart Contracts", "Cryptographic Verification"],
      tech: ["Blockchain", "Cyber Security", "Research", "Smart Contracts"],
      metrics: [
        { label: "CONFERENCE", value: "SIMATS 2024" },
        { label: "INTEGRITY GUARANTEE", value: "Tamper-Evident" },
        { label: "TARGET DOMAIN", value: "Vehicular ECUs" }
      ],
      highlights: [
        "Published & presented research paper at the prestigious SIMATS Engineering Conference",
        "Tamper-evident hash validation ensuring firmware authenticity prior to vehicular execution",
        "Decentralized ledger consensus preventing single-point-of-failure OTA update attacks"
      ],
      githubUrl: "https://github.com/satboy-12"
    },
    {
      id: "data-analytics-dashboard",
      number: "03",
      name: "Data Analytics Dashboard",
      title: "Data Analytics Dashboard",
      subtitle: "Business Intelligence & SQL-Driven KPI Modeling",
      category: "Power BI · SQL",
      desc: "Interactive business dashboards enabling faster KPI monitoring with clear filters and drill-down views. Actionable insights generated from large datasets via SQL-based preparation and validation.",
      description: "Interactive business dashboards enabling faster KPI monitoring with clear filters and drill-down views. Actionable insights generated from large datasets via SQL-based preparation and validation.",
      longDescription: "Engineered high-density analytical dashboards in Power BI and SQL, transforming transactional logs into intuitive executive summaries. Implemented robust multi-table relational models, automated data cleansing, and parametric drill-down hierarchies.",
      image: "/images/cyber_workspace_1787052364862.jpg",
      tags: ["Power BI", "SQL", "Excel", "DAX", "Data Modeling"],
      tech: ["Power BI", "SQL", "Excel", "Data Modeling"],
      metrics: [
        { label: "KPI QUERY SPEED", value: "Sub-Second" },
        { label: "DATA PREPARATION", value: "SQL Pipeline" },
        { label: "METRIC ACCURACY", value: "100% Verified" }
      ],
      highlights: [
        "Interactive KPI monitoring panels with multi-dimensional slicers and cross-filtering",
        "SQL-based dataset extraction, deduplication, and relational star-schema preparation",
        "Actionable business intelligence reporting directly supporting stakeholder decision-making"
      ],
      githubUrl: "https://github.com/satboy-12"
    },
    {
      id: "network-security-analysis",
      number: "04",
      name: "Network Security Analysis",
      title: "Network Security Analysis",
      subtitle: "Deep Packet Inspection & Threat Assessment",
      category: "Wireshark · Kali Linux",
      desc: "Traffic analysis and security assessment identifying suspicious patterns in simulated environments. Vulnerabilities documented with prioritized security improvements aligned to threat-analysis methodology.",
      description: "Traffic analysis and security assessment identifying suspicious patterns in simulated environments. Vulnerabilities documented with prioritized security improvements aligned to threat-analysis methodology.",
      longDescription: "Conducted simulated penetration testing and deep packet captures using Kali Linux and Wireshark. Synthesized detailed vulnerability matrices, identified suspicious payload anomalies, and formulated prioritized mitigation roadmaps.",
      image: "/images/cyber_shield_core_1787052350028.jpg",
      tags: ["Wireshark", "Kali Linux", "Threat Analysis", "Packet Capture", "Vulnerability Assessment"],
      tech: ["Wireshark", "Kali Linux", "Threat Analysis", "Packet Capture"],
      metrics: [
        { label: "ANALYSIS DEPTH", value: "L2–L7 Telemetry" },
        { label: "TOOL SUITE", value: "Kali & Wireshark" },
        { label: "REMEDIATION", value: "Prioritized Plan" }
      ],
      highlights: [
        "Packet capture telemetry analysis uncovering hidden anomalous payloads and spoofed headers",
        "Systematic threat analysis and attack-vector classification across simulated networks",
        "Comprehensive vulnerability documentation with immediate actionable remediation steps"
      ],
      githubUrl: "https://github.com/satboy-12"
    }
  ],
  experience: [
    {
      year: "2020",
      title: "Diploma — ECE, CPCL Polytechnic College",
      subtitle: "Electronics & Communication Engineering",
      desc: "Completed Diploma in Electronics and Communication Engineering with 86%.",
      description: "Completed Diploma in Electronics and Communication Engineering with 86%. Built foundational expertise in digital electronics, microprocessors, signal processing, and communication protocols.",
      active: false
    },
    {
      year: "2023",
      title: "Data Analysis & Testing Associate",
      subtitle: "Operations & Fraud Prevention",
      desc: "End-to-end analysis and testing supporting operations — improved customer satisfaction by 90% and cut fraudulent charges by 50% through pattern analysis.",
      description: "End-to-end analysis and testing supporting operations — improved customer satisfaction by 90% and cut fraudulent charges by 50% through pattern analysis.",
      active: false
    },
    {
      year: "2024",
      title: "Cyber Security Intern — Prodigy Infotech",
      subtitle: "Threat Analysis & Vulnerability Assessment",
      desc: "Threat analysis, security awareness activities and vulnerability-assessment exposure, validating risks through structured testing. Also interned in Network Security (Red Hat) and Blockchain.",
      description: "Threat analysis, security awareness activities and vulnerability-assessment exposure, validating risks through structured testing. Also interned in Network Security (Red Hat) and Blockchain.",
      active: false
    },
    {
      year: "2024",
      title: "B.E. Cyber Security — Sri Ram Engineering College",
      subtitle: "Space Technology Domain • Smart India Hackathon",
      desc: "Began Bachelor of Engineering in Cyber Security; national-level Smart India Hackathon participant in the Space Technology domain.",
      description: "Began Bachelor of Engineering in Cyber Security; national-level Smart India Hackathon participant in the Space Technology domain.",
      active: false
    },
    {
      year: "2025",
      title: "Technical Associate — Braiil Academy",
      subtitle: "Cyber Security & Analytics Mentorship",
      desc: "Supporting security-aligned technical training, software development guidance and academic project implementation across cyber security and analytics tracks.",
      description: "Supporting security-aligned technical training, software development guidance and academic project implementation across cyber security and analytics tracks.",
      active: false
    },
    {
      year: "Now",
      title: "Toward Security Engineering",
      subtitle: "Application Security & Pentesting",
      desc: "Seeking internship and entry-level opportunities in Cyber Security and Software Engineering — application security, pentesting and secure-by-design work.",
      description: "Seeking internship and entry-level opportunities in Cyber Security and Software Engineering — application security, pentesting and secure-by-design work.",
      active: true
    }
  ],
  socialLinks: [
    { label: "GitHub", icon: "github", url: "https://github.com/satboy-12" },
    { label: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/sathyasaijs" },
    { label: "Email", icon: "mail", url: "mailto:sathyasaijs12@gmail.com" }
  ]
};

export const PORTFOLIO_PROFILE = {
  ...portfolioData,
  name: portfolioData.fullName,
  role: `${portfolioData.rolePrimary} • ${portfolioData.roleExtra}`,
  bio: portfolioData.intro,
  profileImage: portfolioData.photo,
  milestones: portfolioData.experience,
  github: "https://github.com/satboy-12",
  linkedin: "https://linkedin.com/in/sathyasaijs",
  instagram: "https://linkedin.com/in/sathyasaijs",
  whatsapp: "https://wa.me/917305662449",
  titles: [
    portfolioData.rolePrimary,
    portfolioData.roleSecondary,
    portfolioData.roleExtra
  ]
};

