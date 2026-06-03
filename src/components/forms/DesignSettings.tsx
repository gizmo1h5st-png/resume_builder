import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { TEMPLATES, COLOR_SCHEMES, FONT_OPTIONS, SPACING_OPTIONS } from '../../constants';
import { FontOption, SpacingOption } from '../../types';

export const DesignSettings: React.FC = () => {
  const config = useResumeStore((s) => s.config);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const setColorScheme = useResumeStore((s) => s.setColorScheme);
  const setFont = useResumeStore((s) => s.setFont);
  const setSpacing = useResumeStore((s) => s.setSpacing);
  const resetData = useResumeStore((s) => s.resetData);

  const cs = config.colorScheme;
  const gradFrom = cs.gradientFrom ?? cs.primary;
  const gradTo   = cs.gradientTo   ?? cs.accent;

  return (
    <div className="space-y-7">

      {/* ── ШАБЛОНЫ ── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Шаблон</p>
        <div className="grid grid-cols-3 gap-2.5">
          {TEMPLATES.map((tpl) => {
            const active = config.templateId === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => setTemplate(tpl.id)}
                className={`relative p-2.5 rounded-2xl border-2 text-left transition-all duration-200 group overflow-hidden ${
                  active ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
                style={active ? { background: `linear-gradient(160deg, #eef2ff 0%, #f5f3ff 100%)` } : {}}
              >
                {/* Active checkmark */}
                {active && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center z-10 shadow">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Mini A4 preview with gradient */}
                <div className="w-full aspect-[3/4] rounded-lg mb-2 overflow-hidden relative"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', background: cs.background }}
                >
                  {tpl.layout === 'single-column' && (
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full flex-shrink-0" style={{
                        height: '28%',
                        background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                      }} />
                      <div className="flex-1 p-1.5 space-y-1">
                        {[90, 75, 85, 65].map((w, i) => (
                          <div key={i} className="h-1 rounded-full"
                            style={{ width: `${w}%`, background: i === 0 ? `linear-gradient(90deg,${gradFrom},${gradTo})` : '#e5e7eb' }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {tpl.layout === 'two-columns-left' && (
                    <div className="w-full h-full flex">
                      <div style={{ width: '38%', background: `linear-gradient(160deg, ${gradFrom}, ${gradTo})` }} />
                      <div className="flex-1 p-1.5 space-y-1">
                        {[80, 65, 75, 60].map((w, i) => (
                          <div key={i} className="h-1 rounded-full bg-gray-200" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {tpl.layout === 'two-columns-right' && (
                    <div className="w-full h-full flex flex-row-reverse">
                      <div style={{ width: '38%', background: `linear-gradient(160deg, ${gradFrom}, ${gradTo})` }} />
                      <div className="flex-1 p-1.5 space-y-1">
                        {[80, 65, 75, 60].map((w, i) => (
                          <div key={i} className="h-1 rounded-full bg-gray-200" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs font-bold text-gray-700">{tpl.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{tpl.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ЦВЕТОВЫЕ СХЕМЫ ── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Цветовая схема</p>
        <div className="space-y-2">
          {COLOR_SCHEMES.map((scheme) => {
            const active = config.colorScheme.id === scheme.id;
            const gFrom = scheme.gradientFrom ?? scheme.primary;
            const gTo   = scheme.gradientTo   ?? scheme.accent;
            return (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme)}
                className={`w-full flex items-center gap-3 rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                  active ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Gradient strip left */}
                <div className="flex-shrink-0 w-12 self-stretch" style={{
                  background: `linear-gradient(160deg, ${gFrom} 0%, ${gTo} 100%)`,
                }} />

                {/* Content */}
                <div className="flex-1 py-2.5 pr-3 flex items-center gap-3"
                  style={{ background: active ? 'linear-gradient(135deg,#eef2ff,#f5f3ff)' : '#fff' }}
                >
                  {/* Swatch dots */}
                  <div className="flex gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ background: scheme.primary }} />
                    <div className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ background: scheme.accent }} />
                    <div className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ background: scheme.background }} />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-gray-700 text-left">{scheme.name}</span>
                  {active && (
                    <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ШРИФТЫ ── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Шрифт</p>
        <div className="grid grid-cols-3 gap-2.5">
          {FONT_OPTIONS.map((font) => {
            const active = config.font === font.value;
            return (
              <button
                key={font.value}
                onClick={() => setFont(font.value as FontOption)}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 text-center ${
                  active ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Gradient header strip */}
                <div className="py-3 flex items-center justify-center"
                  style={{
                    background: active
                      ? `linear-gradient(135deg, ${gradFrom}, ${gradTo})`
                      : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                  }}
                >
                  <span style={{
                    fontFamily: font.css,
                    fontSize: 22,
                    fontWeight: 800,
                    color: active ? '#fff' : '#94a3b8',
                    lineHeight: 1,
                  }}>
                    Aa
                  </span>
                </div>
                <div className="py-1.5" style={{ background: active ? 'linear-gradient(135deg,#eef2ff,#f5f3ff)' : '#fff' }}>
                  <p className="text-xs font-bold text-gray-600">{font.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ОТСТУПЫ ── */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Отступы</p>
        <div className="grid grid-cols-3 gap-2.5">
          {SPACING_OPTIONS.map((sp) => {
            const active = config.spacing === sp.value;
            const gaps = sp.value === 'compact' ? [2, 2, 2] : sp.value === 'normal' ? [4, 4, 4] : [7, 7, 7];
            return (
              <button
                key={sp.value}
                onClick={() => setSpacing(sp.value as SpacingOption)}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 text-center ${
                  active ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Gradient header */}
                <div className="py-3 flex flex-col items-center justify-center gap-0"
                  style={{
                    background: active
                      ? `linear-gradient(135deg, ${gradFrom}, ${gradTo})`
                      : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                  }}
                >
                  {gaps.map((g, i) => (
                    <div key={i} style={{ marginBottom: g }}>
                      <div style={{
                        width: 28, height: 2.5, borderRadius: 99,
                        background: active ? 'rgba(255,255,255,0.85)' : '#cbd5e1',
                      }} />
                    </div>
                  ))}
                </div>
                <div className="py-1.5" style={{ background: active ? 'linear-gradient(135deg,#eef2ff,#f5f3ff)' : '#fff' }}>
                  <p className="text-xs font-bold text-gray-600">{sp.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── СБРОС ── */}
      <div className="pt-2 border-t border-gray-100">
        <button
          onClick={() => {
            if (confirm('Сбросить все данные? Это действие нельзя отменить.')) resetData();
          }}
          className="w-full py-2.5 text-sm text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          Сбросить все данные
        </button>
      </div>
    </div>
  );
};
