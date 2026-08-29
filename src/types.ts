export interface Metric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  id: string;
  number: string;
  name: string;
  title?: string;
  subtitle?: string;
  category: string;
  description: string;
  desc?: string;
  longDescription?: string;
  image: string;
  tags: string[];
  tech?: string[];
  metrics?: Metric[];
  highlights?: string[];
  architecturePoints?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Milestone {
  year: string;
  title: string;
  subtitle?: string;
  type?: string;
  description: string;
  desc?: string;
  icon?: string;
  highlights?: string[];
  active?: boolean;
}

export interface SkillItem {
  icon: string;
  title: string;
  desc: string;
  tags?: string[];
}

export interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

export interface PortfolioData {
  firstName: string;
  lastName: string;
  rolePrimary: string;
  roleSecondary: string;
  roleExtra: string;
  intro: string;
  logoInitials: string;
  fullName: string;
  age: string;
  location: string;
  email: string;
  phone: string;
  photo: string;
  secondaryPhoto?: string;
  aboutText: string;
  resumeUrl: string;
  skills: SkillItem[];
  projects: ProjectCaseStudy[];
  experience: Milestone[];
  socialLinks: SocialLink[];
}
