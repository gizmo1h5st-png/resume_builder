import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Experience } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { formatDate } from '../../utils';

const inputClass =
  'w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-300 text-gray-700';
const labelClass = 'block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide';

const emptyExp = (): Experience => ({
  id: uuidv4(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: [''],
});

interface ExpCardProps {
  exp: Experience;
  index: number;
  onUpdate: (id: string, data: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

const ExpCard: React.FC<ExpCardProps> = ({ exp, index, onUpdate, onRemove }) => {
  const [open, setOpen] = useState(index === 0);

  const addHighlight = () => onUpdate(exp.id, { highlights: [...exp.highlights, ''] });
  const updateHighlight = (i: number, val: string) => {
    const h = [...exp.highlights];
    h[i] = val;
    onUpdate(exp.id, { highlights: h });
  };
  const removeHighlight = (i: number) => {
    onUpdate(exp.id, { highlights: exp.highlights.filter((_, idx) => idx !== i) });
  };

  return (
    <Draggable draggableId={exp.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`border rounded-xl overflow-hidden transition-shadow ${snapshot.isDragging ? 'shadow-lg border-indigo-300' : 'border-gray-200'}`}
        >
          {/* Card header */}
          <div className="flex items-center bg-white px-3 py-2.5 gap-2">
            <div {...provided.dragHandleProps} className="cursor-grab text-gray-300 hover:text-gray-400 flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 6a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm8-16a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <button onClick={() => setOpen(!open)} className="flex-1 text-left min-w-0">
              <p className="font-semibold text-sm text-gray-700 truncate">{exp.position || 'Новая позиция'}</p>
              <p className="text-xs text-gray-400 truncate">
                {exp.company || 'Компания'} {exp.startDate ? `· ${formatDate(exp.startDate)} — ${exp.current ? 'н.в.' : formatDate(exp.endDate)}` : ''}
              </p>
            </button>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setOpen(!open)} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button onClick={() => onRemove(exp.id)} className="p-1.5 text-gray-300 hover:text-red-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {open && (
            <div className="bg-gray-50 p-3 space-y-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Должность</label>
                  <input className={inputClass} value={exp.position} placeholder="Senior Developer" onChange={(e) => onUpdate(exp.id, { position: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Компания</label>
                  <input className={inputClass} value={exp.company} placeholder="TechCorp" onChange={(e) => onUpdate(exp.id, { company: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Начало</label>
                  <input type="month" className={inputClass} value={exp.startDate} onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Конец</label>
                  <input type="month" className={inputClass} value={exp.endDate} disabled={exp.current} onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })} />
                  <label className="flex items-center gap-1.5 mt-1.5 cursor-pointer">
                    <input type="checkbox" checked={exp.current} onChange={(e) => onUpdate(exp.id, { current: e.target.checked, endDate: '' })} className="rounded" />
                    <span className="text-xs text-gray-500">По настоящее время</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Описание</label>
                <textarea className={`${inputClass} resize-none`} rows={2} value={exp.description} placeholder="Краткое описание роли..." onChange={(e) => onUpdate(exp.id, { description: e.target.value })} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass}>Достижения</label>
                  <button onClick={addHighlight} className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">+ Добавить</button>
                </div>
                <div className="space-y-1.5">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input className={`${inputClass} flex-1`} value={h} placeholder="Достижение..." onChange={(e) => updateHighlight(i, e.target.value)} />
                      <button onClick={() => removeHighlight(i)} className="p-1.5 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export const ExperienceForm: React.FC = () => {
  const experience = useResumeStore((s) => s.data.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const reorderExperience = useResumeStore((s) => s.reorderExperience);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(experience);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    reorderExperience(items);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Перетащите карточки для изменения порядка</p>
        <button
          onClick={() => addExperience(emptyExp())}
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors"
        >
          + Добавить
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experience">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {experience.map((exp, index) => (
                <ExpCard
                  key={exp.id}
                  exp={exp}
                  index={index}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
                />
              ))}
              {provided.placeholder}
              {experience.length === 0 && (
                <div className="text-center py-8 text-gray-300">
                  <p className="text-3xl mb-2">📋</p>
                  <p className="text-sm">Добавьте опыт работы</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
