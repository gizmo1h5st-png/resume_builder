import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Education } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const inputClass =
  'w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-300 text-gray-700';
const labelClass = 'block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide';

const emptyEdu = (): Education => ({
  id: uuidv4(),
  institution: '',
  degree: '',
  field: '',
  startYear: '',
  endYear: '',
});

interface EduCardProps {
  edu: Education;
  index: number;
  onUpdate: (id: string, data: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

const EduCard: React.FC<EduCardProps> = ({ edu, index, onUpdate, onRemove }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center bg-white px-3 py-2.5 gap-2">
        <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-500 text-sm">🎓</span>
        </div>
        <button onClick={() => setOpen(!open)} className="flex-1 text-left min-w-0">
          <p className="font-semibold text-sm text-gray-700 truncate">{edu.institution || 'Учебное заведение'}</p>
          <p className="text-xs text-gray-400 truncate">
            {edu.degree}{edu.field ? `, ${edu.field}` : ''} {edu.startYear ? `· ${edu.startYear}${edu.endYear ? `–${edu.endYear}` : ''}` : ''}
          </p>
        </button>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button onClick={() => onRemove(edu.id)} className="p-1.5 text-gray-300 hover:text-red-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="bg-gray-50 p-3 space-y-3 border-t border-gray-100">
          <div>
            <label className={labelClass}>Учебное заведение</label>
            <input className={inputClass} value={edu.institution} placeholder="МГУ им. Ломоносова" onChange={(e) => onUpdate(edu.id, { institution: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Степень</label>
              <input className={inputClass} value={edu.degree} placeholder="Бакалавр" onChange={(e) => onUpdate(edu.id, { degree: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Специальность</label>
              <input className={inputClass} value={edu.field} placeholder="Информатика" onChange={(e) => onUpdate(edu.id, { field: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Год начала</label>
              <input type="number" min="1950" max="2099" className={inputClass} value={edu.startYear} placeholder="2015" onChange={(e) => onUpdate(edu.id, { startYear: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Год окончания</label>
              <input type="number" min="1950" max="2099" className={inputClass} value={edu.endYear} placeholder="2019" onChange={(e) => onUpdate(edu.id, { endYear: e.target.value })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const EducationForm: React.FC = () => {
  const education = useResumeStore((s) => s.data.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <button
          onClick={() => addEducation(emptyEdu())}
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors"
        >
          + Добавить
        </button>
      </div>
      <div className="space-y-2">
        {education.map((edu, index) => (
          <EduCard key={edu.id} edu={edu} index={index} onUpdate={updateEducation} onRemove={removeEducation} />
        ))}
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-300">
            <p className="text-3xl mb-2">🎓</p>
            <p className="text-sm">Добавьте образование</p>
          </div>
        )}
      </div>
    </div>
  );
};
