import React, { RefObject } from 'react';
import { useExportPdf } from '../hooks/useExportPdf';

interface Props {
  previewRef: RefObject<HTMLDivElement>;
}

export const ExportButton: React.FC<Props> = ({ previewRef }) => {
  const { exportPdf, loading } = useExportPdf(previewRef);

  return (
    <button
      onClick={exportPdf}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      style={{
        background: loading
          ? '#94a3b8'
          : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: '#fff',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Генерация...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Скачать PDF
        </>
      )}
    </button>
  );
};
