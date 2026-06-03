# 📄 Resume Builder

Профессиональный конструктор резюме на React 18 + TypeScript + Tailwind CSS с экспортом в PDF.

## ✨ Возможности

- **3 шаблона**: Classic (одна колонка), Modern (боковая панель слева), Executive (боковая панель справа)
- **5 цветовых схем**: Classic Blue, Forest Green, Warm Sunset, Elegant Purple, Minimal Dark
- **3 шрифта**: Sans-serif, Serif, Monospace
- **3 варианта отступов**: Compact, Normal, Comfortable
- **Экспорт в PDF** через `html2canvas` + `jsPDF` (A4, без лишних полей)
- **Автосохранение** в `localStorage` — данные сохраняются при перезагрузке
- **Drag & Drop** для порядка опыта и навыков
- **Загрузка фото** с конвертацией в base64
- **Real-time preview** — предпросмотр обновляется мгновенно
- **Режимы просмотра**: Split / Только форма / Только превью

## 🚀 Установка и запуск

```bash
# Клонировать / распаковать проект
cd resume-builder

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

Приложение откроется на `http://localhost:5173`

## 📁 Структура проекта

```
src/
├── types/          # TypeScript интерфейсы (ResumeData, ResumeConfig, ...)
├── constants/      # Шаблоны, цветовые схемы, шрифты, отступы
├── store/          # Zustand стор (resumeStore.ts)
├── hooks/          # useExportPdf.ts
├── utils/          # Утилиты (форматирование дат, base64, ...)
└── components/
    ├── templates/  # ClassicTemplate, ModernTemplate
    ├── forms/      # PersonalForm, ExperienceForm, EducationForm,
    │               # SkillsForm, LanguagesForm, DesignSettings
    ├── EditorPanel.tsx    # Левая панель с вкладками
    ├── ResumePreview.tsx  # Обёртка предпросмотра
    ├── TemplateRenderer.tsx # Выбор шаблона
    └── ExportButton.tsx   # Кнопка экспорта PDF
```

## 🛠 Стек

| Технология | Версия | Назначение |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 | Типизация |
| Vite | 5 | Бандлер |
| Tailwind CSS | 3 | Стили |
| Zustand | 4 | Глобальный стейт |
| html2canvas | 1.4 | Снимок DOM |
| jsPDF | 2.5 | Генерация PDF |
| react-beautiful-dnd | 13 | Drag & Drop |
| uuid | 9 | Генерация ID |

## 📋 Интерфейсы данных

### ResumeData
```typescript
interface ResumeData {
  personal: {
    fullName, jobTitle, email, phone, location,
    photo: string,    // base64
    links: SocialLink[]
  };
  summary: string;
  experience: Experience[];   // + drag & drop
  education: Education[];
  skills: Skill[];            // + drag & drop, level 1-5
  languages: Language[];      // A1-C2, Native
}
```

### ResumeConfig
```typescript
interface ResumeConfig {
  templateId: 'classic' | 'modern' | 'executive';
  colorScheme: ColorScheme;  // primary, background, text, accent
  font: 'sans' | 'serif' | 'mono';
  spacing: 'compact' | 'normal' | 'comfortable';
}
```

## 💡 Советы

- Для лучшего PDF включите режим **Preview** и установите масштаб 100%
- Фото загружается как base64 — работает оффлайн
- Все данные автоматически сохраняются в `localStorage`
- Кнопка «Сбросить все данные» в разделе «Дизайн» → в конце страницы
