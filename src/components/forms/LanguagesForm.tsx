import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Language } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { PROFICIENCY_LABELS } from '../../constants';

const inputClass =
  'w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-300 text-gray-700';

const PROFICIENCY_OPTIONS: Language['proficiency'][] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

interface AddLangFormProps {
  onAdd: (lang: Language) => void;
}

const AddLangForm: React.FC<AddLangFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState<Language['proficiency']>('B2');

  const submit = () => {
    if (!name.trim()) return;
    onAdd({ id: uuidv4(), name: name.trim(), proficiency });
    setName('');
    setProficiency('B2');
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 space-y-2">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Новый язык</p>
      <div className="flex gap-2">
        <input
          className={`${inputClass} flex-1`}
          value={name}
          placeholder="Английский"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        <select
          className={`${inputClass} w-40 flex-shrink-0`}
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value as Language['proficiency'])}
        >
          {PROFICIENCY_OPTIONS.map((p) => (
            <option key={p} value={p}>{p} — {PROFICIENCY_LABELS[p]?.split(' — ')[1] || p}</option>
          ))}
        </select>
        <button
          onClick={submit}
          className="px-3 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition-colors flex-shrink-0"
        >
          +
        </button>
      </div>
    </div>
  );
};

export const LanguagesForm: React.FC = () => {
  const languages = useResumeStore((s) => s.data.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  return (
    <div className="space-y-3">
      <AddLangForm onAdd={addLanguage} />
      <div className="space-y-2">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5">
            <span className="text-lg">🌐</span>
            <input
              className="flex-1 text-sm text-gray-700 bg-transparent border-none outline-none min-w-0 font-medium"
              value={lang.name}
              onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
            />
            <select
              className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer"
              value={lang.proficiency}
              onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as Language['proficiency'] })}
            >
              {PROFICIENCY_OPTIONS.map((p) => (
                <option key={p} value={p}>{PROFICIENCY_LABELS[p]}</option>
              ))}
            </select>
            <button onClick={() => removeLanguage(lang.id)} className="p-1 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        {languages.length === 0 && (
          <div className="text-center py-6 text-gray-300">
            <p className="text-3xl mb-2">🌍</p>
            <p className="text-sm">Добавьте языки</p>
          </div>
        )}
      </div>
    </div>
  );
};
