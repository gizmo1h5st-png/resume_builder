import React, { forwardRef } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { TemplateRenderer } from './TemplateRenderer';

interface Props {
  /** Visual scale for the on-screen preview (default 1). The PDF capture
   *  always uses the un-scaled element via the forwarded ref. */
  scale?: number;
  className?: string;
}

/**
 * Renders TWO copies of the resume:
 *  1. A hidden, always-1:1 element (ref forwarded) — used by html2canvas.
 *  2. A visible scaled element — what the user sees on screen.
 *
 * This avoids the "ref is inside CSS transform" problem that makes
 * html2canvas produce a blank/wrong capture.
 */
export const ResumePreview = forwardRef<HTMLDivElement, Props>(
  ({ scale = 1, className }, ref) => {
    const data = useResumeStore((s) => s.data);
    const config = useResumeStore((s) => s.config);

    const a4Style: React.CSSProperties = {
      width: 794,
      minHeight: 1123,
      backgroundColor: config.colorScheme.background,
      overflow: 'hidden',
      position: 'relative',
    };

    return (
      <div className={className} style={{ position: 'relative' }}>
        {/* ── Hidden 1:1 element for PDF capture ── */}
        <div
          ref={ref}
          data-pdf-capture="true"
          style={{
            ...a4Style,
            position: 'absolute',
            top: 0,
            left: 0,
            // Pushed far off-screen so it's not visible but still rendered
            transform: 'translateX(-9999px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <TemplateRenderer data={data} config={config} />
        </div>

        {/* ── Visible scaled element ── */}
        <div
          style={{
            width: 794 * scale,
            height: 1123 * scale,
            position: 'relative',
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          }}
        >
          <div
            style={{
              ...a4Style,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <TemplateRenderer data={data} config={config} />
          </div>
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
