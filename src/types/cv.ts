export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  url?: string;
  techStack: string[];
}

export interface CVData {
  name: string;
  title: string;
  summary: string;
  experience: Job[];
  projects: Project[];
}
