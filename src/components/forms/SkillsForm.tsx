import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Skill } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const inputClass =
  'w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all placeholder-gray-300 text-gray-700';

const LEVEL_LABELS = ['', 'Начинающий', 'Базовый', 'Средний', 'Продвинутый', 'Эксперт'];

interface AddSkillFormProps {
  onAdd: (skill: Skill) => void;
}

const AddSkillForm: React.FC<AddSkillFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(3);

  const submit = () => {
    if (!name.trim()) return;
    onAdd({ id: uuidv4(), name: name.trim(), level });
    setName('');
    setLevel(3);
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 space-y-2">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Новый навык</p>
      <div className="flex gap-2">
        <input
          className={`${inputClass} flex-1`}
          value={name}
          placeholder="Название навыка"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        <button
          onClick={submit}
          className="px-3 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition-colors flex-shrink-0"
        >
          +
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Уровень: <strong>{LEVEL_LABELS[level]}</strong></span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-gray-300 mt-0.5">
          {LEVEL_LABELS.slice(1).map((l) => <span key={l}>{l.slice(0, 3)}</span>)}
        </div>
      </div>
    </div>
  );
};

export const SkillsForm: React.FC = () => {
  const skills = useResumeStore((s) => s.data.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const reorderSkills = useResumeStore((s) => s.reorderSkills);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(skills);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    reorderSkills(items);
  };

  return (
    <div className="space-y-3">
      <AddSkillForm onAdd={addSkill} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skills">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {skills.map((skill, index) => (
                <Draggable key={skill.id} draggableId={skill.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2 transition-shadow ${snapshot.isDragging ? 'shadow-md border-indigo-200' : 'border-gray-200'}`}
                    >
                      <div {...provided.dragHandleProps} className="text-gray-300 hover:text-gray-400 cursor-grab flex-shrink-0">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 6a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm8-16a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4zm0 8a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <input
                        className="flex-1 text-sm text-gray-700 bg-transparent border-none outline-none min-w-0"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                      />
                      <div className="flex gap-1 flex-shrink-0">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <button
                            key={i}
                            onClick={() => updateSkill(skill.id, { level: i })}
                            title={LEVEL_LABELS[i]}
                            className={`w-3.5 h-3.5 rounded-full transition-colors ${i <= skill.level ? 'bg-indigo-500' : 'bg-gray-200 hover:bg-indigo-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 w-16 text-right flex-shrink-0">{LEVEL_LABELS[skill.level]}</span>
                      <button onClick={() => removeSkill(skill.id)} className="p-1 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {skills.length === 0 && (
                <div className="text-center py-6 text-gray-300">
                  <p className="text-3xl mb-2">⚡</p>
                  <p className="text-sm">Добавьте навыки</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
