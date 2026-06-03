import React, { useRef } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { fileToBase64 } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { SocialLink } from '../../types';

const inputClass =
  'w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-300 text-gray-700';
const labelClass = 'block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide';

export const PersonalForm: React.FC = () => {
  const personal = useResumeStore((s) => s.data.personal);
  const summary = useResumeStore((s) => s.data.summary);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);
  const updateSummary = useResumeStore((s) => s.updateSummary);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    updatePersonal({ photo: b64 });
    // reset input so same file can be re-selected
    e.target.value = '';
  };

  const addLink = () => {
    const link: SocialLink = { id: uuidv4(), label: '', url: '' };
    updatePersonal({ links: [...personal.links, link] });
  };

  const updateLink = (id: string, field: keyof SocialLink, value: string) => {
    updatePersonal({
      links: personal.links.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  // Fix: compare by id strictly, using String() to handle legacy numeric ids
  const removeLink = (id: string) => {
    const next = personal.links.filter((l) => String(l.id) !== String(id));
    updatePersonal({ links: next });
  };

  return (
    <div className="space-y-4">
      {/* Photo */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-16 h-16 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-400 cursor-pointer transition-colors flex items-center justify-center bg-white flex-shrink-0"
        >
          {personal.photo ? (
            <img src={personal.photo} alt="photo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">👤</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => fileRef.current?.click()}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors text-left"
          >
            {personal.photo ? 'Изменить фото' : 'Загрузить фото'}
          </button>
          <p className="text-xs text-gray-400">JPG, PNG до 5 MB</p>
          {personal.photo && (
            <button
              onClick={() => updatePersonal({ photo: '' })}
              className="text-xs text-red-400 hover:text-red-500 transition-colors text-left"
            >
              Удалить фото
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
      </div>

      {/* Name + Job */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Имя и фамилия</label>
          <input
            className={inputClass}
            value={personal.fullName}
            placeholder="Александр Иванов"
            onChange={(e) => updatePersonal({ fullName: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Должность</label>
          <input
            className={inputClass}
            value={personal.jobTitle}
            placeholder="Frontend Developer"
            onChange={(e) => updatePersonal({ jobTitle: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Email</label>
          <input
            className={inputClass}
            type="email"
            value={personal.email}
            placeholder="email@example.com"
            onChange={(e) => updatePersonal({ email: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Телефон</label>
          <input
            className={inputClass}
            value={personal.phone}
            placeholder="+7 (999) 000-00-00"
            onChange={(e) => updatePersonal({ phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Местоположение</label>
        <input
          className={inputClass}
          value={personal.location}
          placeholder="Москва, Россия"
          onChange={(e) => updatePersonal({ location: e.target.value })}
        />
      </div>

      {/* Summary */}
      <div>
        <label className={labelClass}>О себе / Summary</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={4}
          value={summary}
          placeholder="Краткое профессиональное описание..."
          onChange={(e) => updateSummary(e.target.value)}
        />
      </div>

      {/* Links */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Ссылки</label>
          <button
            onClick={addLink}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg"
          >
            + Добавить
          </button>
        </div>

        {personal.links.length === 0 && (
          <p className="text-xs text-gray-300 text-center py-3">Ссылок пока нет</p>
        )}

        <div className="space-y-2">
          {personal.links.map((link) => (
            <div key={link.id} className="flex gap-2 items-center bg-gray-50 rounded-lg p-2 border border-gray-100">
              <input
                className="px-2 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 w-24 flex-shrink-0 text-gray-700"
                placeholder="LinkedIn"
                value={link.label}
                onChange={(e) => updateLink(link.id, 'label', e.target.value)}
              />
              <input
                className="px-2 py-1.5 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 flex-1 min-w-0 text-gray-700"
                placeholder="linkedin.com/in/..."
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors border border-red-100"
                title="Удалить ссылку"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
