export interface ProjectItem {
  id: string;
  caseNum: string;
  title: string;
  category: string;
  role: string;
  description: string;
  detailedOverview?: string;
  architecturePoints: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  securityFeature: string;
  metrics: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: string[];
  description: string;
}

export interface TimelineChapter {
  id: string;
  timeStart: number;
  timeEnd: number;
  title: string;
  subtitle: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  focusSection: 'intro' | 'hero' | 'projects' | 'skills' | 'contact' | 'finale';
}
