export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface Personal {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  photo: string; // base64
  links: SocialLink[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

export interface ResumeData {
  personal: Personal;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}

export type FontOption = 'sans' | 'serif' | 'mono';
export type SpacingOption = 'compact' | 'normal' | 'comfortable';
export type LayoutType = 'single-column' | 'two-columns-left' | 'two-columns-right';
export type PhotoPosition = 'header-right' | 'sidebar' | 'hidden';

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  background: string;
  text: string;
  accent: string;
  sidebar?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  layout: LayoutType;
  photoPosition: PhotoPosition;
}

export interface ResumeConfig {
  templateId: string;
  colorScheme: ColorScheme;
  font: FontOption;
  spacing: SpacingOption;
}

export type EditorTab = 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'design';
