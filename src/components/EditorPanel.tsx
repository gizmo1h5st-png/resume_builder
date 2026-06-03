import React, { useState } from 'react';
import { EditorTab } from '../types';
import { PersonalForm } from './forms/PersonalForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { DesignSettings } from './forms/DesignSettings';

interface TabConfig {
  id: EditorTab;
  label: string;
  icon: string;
  component: React.FC;
}

const TABS: TabConfig[] = [
  { id: 'personal', label: 'Личные', icon: '👤', component: PersonalForm },
  { id: 'experience', label: 'Опыт', icon: '💼', component: ExperienceForm },
  { id: 'education', label: 'Образование', icon: '🎓', component: EducationForm },
  { id: 'skills', label: 'Навыки', icon: '⚡', component: SkillsForm },
  { id: 'languages', label: 'Языки', icon: '🌍', component: LanguagesForm },
  { id: 'design', label: 'Дизайн', icon: '🎨', component: DesignSettings },
];

export const EditorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EditorTab>('personal');

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component ?? PersonalForm;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-sm font-bold text-gray-800">Resume Builder</h1>
        </div>
        <p className="text-xs text-gray-400">Автосохранение включено</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100 overflow-x-auto flex-shrink-0">
        <div className="flex min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-2.5 text-xs font-medium transition-all duration-150 border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50/60'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <ActiveComponent />
      </div>
    </div>
  );
};
