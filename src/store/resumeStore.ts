import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ResumeConfig, Personal, Experience, Education, Skill, Language } from '../types';
import { TEMPLATES, COLOR_SCHEMES } from '../constants';

const defaultPersonal: Personal = {
  fullName: 'Александр Иванов',
  jobTitle: 'Senior Frontend Developer',
  email: 'alex.ivanov@email.com',
  phone: '+7 (999) 123-45-67',
  location: 'Москва, Россия',
  photo: '',
  links: [
    { id: 'link-linkedin-default', label: 'LinkedIn', url: 'linkedin.com/in/alexivanov' },
    { id: 'link-github-default', label: 'GitHub', url: 'github.com/alexivanov' },
  ],
};

const defaultExperience: Experience[] = [
  {
    id: '1',
    company: 'TechCorp',
    position: 'Senior Frontend Developer',
    startDate: '2021-03',
    endDate: '',
    current: true,
    description: 'Разработка высоконагруженных веб-приложений на React/TypeScript.',
    highlights: [
      'Снизил время загрузки на 40% через оптимизацию бандла',
      'Руководил командой из 5 разработчиков',
      'Внедрил CI/CD pipeline на GitHub Actions',
    ],
  },
  {
    id: '2',
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    startDate: '2019-06',
    endDate: '2021-02',
    current: false,
    description: 'Создание UI компонентов и интеграция с REST API.',
    highlights: [
      'Разработал дизайн-систему с 50+ компонентами',
      'Перевёл проект с jQuery на React',
    ],
  },
];

const defaultEducation: Education[] = [
  {
    id: '1',
    institution: 'МГУ им. Ломоносова',
    degree: 'Бакалавр',
    field: 'Компьютерные науки',
    startYear: '2015',
    endYear: '2019',
  },
];

const defaultSkills: Skill[] = [
  { id: '1', name: 'React', level: 5 },
  { id: '2', name: 'TypeScript', level: 5 },
  { id: '3', name: 'Node.js', level: 4 },
  { id: '4', name: 'GraphQL', level: 3 },
  { id: '5', name: 'Docker', level: 3 },
];

const defaultLanguages: Language[] = [
  { id: '1', name: 'Русский', proficiency: 'Native' },
  { id: '2', name: 'Английский', proficiency: 'C1' },
];

const defaultData: ResumeData = {
  personal: defaultPersonal,
  summary:
    'Опытный Frontend-разработчик с 6+ годами практики создания масштабируемых веб-приложений. Специализируюсь на React, TypeScript и современных инструментах разработки. Стремлюсь создавать отзывчивые интерфейсы с отличным UX.',
  experience: defaultExperience,
  education: defaultEducation,
  skills: defaultSkills,
  languages: defaultLanguages,
};

const defaultConfig: ResumeConfig = {
  templateId: TEMPLATES[0].id,
  colorScheme: COLOR_SCHEMES[0],
  font: 'sans',
  spacing: 'normal',
};

interface ResumeStore {
  data: ResumeData;
  config: ResumeConfig;
  // Personal
  updatePersonal: (personal: Partial<Personal>) => void;
  updateSummary: (summary: string) => void;
  // Experience
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (list: Experience[]) => void;
  // Education
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (list: Skill[]) => void;
  // Languages
  addLanguage: (lang: Language) => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  // Config
  setTemplate: (templateId: string) => void;
  setColorScheme: (scheme: ResumeConfig['colorScheme']) => void;
  setFont: (font: ResumeConfig['font']) => void;
  setSpacing: (spacing: ResumeConfig['spacing']) => void;
  // Reset
  resetData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultData,
      config: defaultConfig,

      updatePersonal: (personal) =>
        set((s) => ({ data: { ...s.data, personal: { ...s.data.personal, ...personal } } })),
      updateSummary: (summary) => set((s) => ({ data: { ...s.data, summary } })),

      addExperience: (exp) =>
        set((s) => ({ data: { ...s.data, experience: [exp, ...s.data.experience] } })),
      updateExperience: (id, exp) =>
        set((s) => ({
          data: {
            ...s.data,
            experience: s.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
        })),
      removeExperience: (id) =>
        set((s) => ({
          data: { ...s.data, experience: s.data.experience.filter((e) => e.id !== id) },
        })),
      reorderExperience: (list) => set((s) => ({ data: { ...s.data, experience: list } })),

      addEducation: (edu) =>
        set((s) => ({ data: { ...s.data, education: [edu, ...s.data.education] } })),
      updateEducation: (id, edu) =>
        set((s) => ({
          data: {
            ...s.data,
            education: s.data.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
          },
        })),
      removeEducation: (id) =>
        set((s) => ({
          data: { ...s.data, education: s.data.education.filter((e) => e.id !== id) },
        })),

      addSkill: (skill) =>
        set((s) => ({ data: { ...s.data, skills: [...s.data.skills, skill] } })),
      updateSkill: (id, skill) =>
        set((s) => ({
          data: {
            ...s.data,
            skills: s.data.skills.map((sk) => (sk.id === id ? { ...sk, ...skill } : sk)),
          },
        })),
      removeSkill: (id) =>
        set((s) => ({ data: { ...s.data, skills: s.data.skills.filter((sk) => sk.id !== id) } })),
      reorderSkills: (list) => set((s) => ({ data: { ...s.data, skills: list } })),

      addLanguage: (lang) =>
        set((s) => ({ data: { ...s.data, languages: [...s.data.languages, lang] } })),
      updateLanguage: (id, lang) =>
        set((s) => ({
          data: {
            ...s.data,
            languages: s.data.languages.map((l) => (l.id === id ? { ...l, ...lang } : l)),
          },
        })),
      removeLanguage: (id) =>
        set((s) => ({
          data: { ...s.data, languages: s.data.languages.filter((l) => l.id !== id) },
        })),

      setTemplate: (templateId) => set((s) => ({ config: { ...s.config, templateId } })),
      setColorScheme: (colorScheme) => set((s) => ({ config: { ...s.config, colorScheme } })),
      setFont: (font) => set((s) => ({ config: { ...s.config, font } })),
      setSpacing: (spacing) => set((s) => ({ config: { ...s.config, spacing } })),

      resetData: () => set({ data: defaultData, config: defaultConfig }),
    }),
    { name: 'resume-builder-v2' }
  )
);
