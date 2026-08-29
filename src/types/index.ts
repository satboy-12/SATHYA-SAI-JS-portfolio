export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'CYBER SECURITY' | 'WEB PLATFORM' | 'MOBILE APPLICATION' | 'DATA ANALYTICS' | 'VENTURE MEDIA';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecturePoints: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Milestone {
  year: string;
  type: 'EXPERIENCE' | 'EDUCATION' | 'CERTIFICATIONS' | 'VENTURE';
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface SkillDomain {
  id: string;
  name: string;
  code: string;
  lead: string;
  skills: string[];
}
