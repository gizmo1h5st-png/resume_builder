import { Template, ColorScheme } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Одна колонка, фото справа в шапке',
    layout: 'single-column',
    photoPosition: 'header-right',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Две колонки, боковая панель слева',
    layout: 'two-columns-left',
    photoPosition: 'sidebar',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Две колонки, боковая панель справа',
    layout: 'two-columns-right',
    photoPosition: 'sidebar',
  },
];

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    primary: '#1E3A8A',
    background: '#F8FAFC',
    text: '#1E293B',
    accent: '#3B82F6',
    sidebar: '#1E3A8A',
    // gradient: from primary to accent
    gradientFrom: '#1E3A8A',
    gradientTo: '#3B82F6',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    primary: '#166534',
    background: '#F0FDF4',
    text: '#14532D',
    accent: '#22C55E',
    sidebar: '#166534',
    gradientFrom: '#166534',
    gradientTo: '#22C55E',
  },
  {
    id: 'warm-sunset',
    name: 'Warm Sunset',
    primary: '#C2410C',
    background: '#FFF7ED',
    text: '#431407',
    accent: '#F97316',
    sidebar: '#C2410C',
    gradientFrom: '#C2410C',
    gradientTo: '#F97316',
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    primary: '#6B21A8',
    background: '#FAF5FF',
    text: '#3B0764',
    accent: '#A855F7',
    sidebar: '#6B21A8',
    gradientFrom: '#6B21A8',
    gradientTo: '#A855F7',
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    primary: '#1F2937',
    background: '#FFFFFF',
    text: '#111827',
    accent: '#4B5563',
    sidebar: '#1F2937',
    gradientFrom: '#1F2937',
    gradientTo: '#4B5563',
  },
];

export const FONT_OPTIONS = [
  { value: 'sans', label: 'Sans-serif', css: "'Inter', 'Helvetica Neue', Arial, sans-serif" },
  { value: 'serif', label: 'Serif', css: "'Georgia', 'Times New Roman', serif" },
  { value: 'mono', label: 'Monospace', css: "'JetBrains Mono', 'Courier New', monospace" },
];

export const SPACING_OPTIONS = [
  { value: 'compact', label: 'Compact', px: 12 },
  { value: 'normal', label: 'Normal', px: 20 },
  { value: 'comfortable', label: 'Comfortable', px: 28 },
];

export const PROFICIENCY_LABELS: Record<string, string> = {
  A1: 'A1 — Beginner',
  A2: 'A2 — Elementary',
  B1: 'B1 — Intermediate',
  B2: 'B2 — Upper-Intermediate',
  C1: 'C1 — Advanced',
  C2: 'C2 — Proficient',
  Native: 'Native',
};
