import React, { useRef, useState } from 'react';
import { EditorPanel } from './components/EditorPanel';
import { ResumePreview } from './components/ResumePreview';
import { ExportButton } from './components/ExportButton';
import { useResumeStore } from './store/resumeStore';

type ViewMode = 'split' | 'edit' | 'preview';

export default function App() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [previewScale, setPreviewScale] = useState(0.55);
  const config = useResumeStore((s) => s.config);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* ── TOP BAR ── */}
      <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight">Resume Builder</h1>
              <p className="text-xs text-gray-400 leading-tight">Professional CV Creator</p>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="hidden md:flex items-center gap-0.5 bg-gray-100 p-0.5 rounded-lg ml-4">
            {([
              { id: 'edit',    label: 'Форма',   icon: '📝' },
              { id: 'split',   label: 'Split',   icon: '⊟'  },
              { id: 'preview', label: 'Preview', icon: '👁'  },
            ] as { id: ViewMode; label: string; icon: string }[]).map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === mode.id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{mode.icon}</span>
                <span className="hidden lg:inline">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Scale control */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
            <button
              onClick={() => setPreviewScale((s) => Math.max(0.3, +(s - 0.05).toFixed(2)))}
              className="text-gray-500 hover:text-gray-700 font-mono text-sm leading-none"
            >−</button>
            <span className="text-xs font-medium text-gray-600 w-10 text-center">
              {Math.round(previewScale * 100)}%
            </span>
            <button
              onClick={() => setPreviewScale((s) => Math.min(1, +(s + 0.05).toFixed(2)))}
              className="text-gray-500 hover:text-gray-700 font-mono text-sm leading-none"
            >+</button>
          </div>

          {/* Active color indicator */}
          <div className="hidden sm:flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.colorScheme.primary }} />
            <span className="text-xs text-gray-600 font-medium">{config.colorScheme.name}</span>
          </div>

          <ExportButton previewRef={previewRef} />
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 flex overflow-hidden">

        {/* Editor panel */}
        {(viewMode === 'split' || viewMode === 'edit') && (
          <div className={`flex flex-col flex-shrink-0 overflow-hidden border-r border-gray-200 ${
            viewMode === 'edit' ? 'w-full' : 'w-[420px] min-w-[360px]'
          }`}>
            <EditorPanel />
          </div>
        )}

        {/* Preview panel */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="flex-1 overflow-auto bg-gray-200 p-6 flex flex-col items-center">

            {/* Toolbar */}
            <div className="flex items-center justify-between w-full mb-4" style={{ maxWidth: 794 * previewScale + 48 }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-xs text-gray-400 ml-2 font-medium">
                  Предпросмотр A4 · {Math.round(previewScale * 100)}%
                </span>
              </div>
              <ExportButton previewRef={previewRef} />
            </div>

            {/* The preview component manages both hidden (1:1) and visible (scaled) copies */}
            <ResumePreview ref={previewRef} scale={previewScale} />

            <p className="mt-3 text-xs text-gray-400">794 × 1123 px (A4 @ 96 dpi)</p>
          </div>
        )}
      </main>

      {/* ── MOBILE BOTTOM TABS ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around z-50">
        {([
          { id: 'edit',    label: 'Редактор', icon: '📝' },
          { id: 'preview', label: 'Просмотр', icon: '👁'  },
        ] as { id: ViewMode; label: string; icon: string }[]).map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === mode.id ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'
            }`}
          >
            <span className="text-lg">{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
        <ExportButton previewRef={previewRef} />
      </div>
    </div>
  );
}
