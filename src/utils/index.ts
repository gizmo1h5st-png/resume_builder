import { FontOption, SpacingOption } from '../types';
import { FONT_OPTIONS, SPACING_OPTIONS } from '../constants';

export function getFontFamily(font: FontOption): string {
  return FONT_OPTIONS.find((f) => f.value === font)?.css ?? FONT_OPTIONS[0].css;
}

export function getSpacingPx(spacing: SpacingOption): number {
  return SPACING_OPTIONS.find((s) => s.value === spacing)?.px ?? 20;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year) return '';
  if (!month) return year;
  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
  ];
  const m = parseInt(month, 10);
  return `${months[m - 1] || ''} ${year}`;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
