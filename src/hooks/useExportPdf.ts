import { RefObject, useState } from 'react';

export function useExportPdf(ref: RefObject<HTMLElement>) {
  const [loading, setLoading] = useState(false);

  const exportPdf = async () => {
    if (!ref.current) return;
    setLoading(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = ref.current;

      // Temporarily reset any CSS transform so html2canvas sees real pixels
      const prevTransform = element.style.transform;
      const prevPosition = element.style.position;
      element.style.transform = 'none';
      element.style.position = 'relative';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: 1123,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123,
        onclone: (clonedDoc) => {
          // Make sure cloned element has no transform
          const clonedEl = clonedDoc.body.querySelector('[data-pdf-capture]') as HTMLElement;
          if (clonedEl) {
            clonedEl.style.transform = 'none';
            clonedEl.style.position = 'relative';
          }
        },
      });

      // Restore original styles
      element.style.transform = prevTransform;
      element.style.position = prevPosition;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      // A4 in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = 210;   // mm
      const pageHeight = 297;  // mm

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // mm per pixel
      const mmPerPx = pageWidth / canvasW;
      const totalHeightMm = canvasH * mmPerPx;

      if (totalHeightMm <= pageHeight) {
        // Single page
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, totalHeightMm);
      } else {
        // Multi-page: slice canvas row by row
        const pxPerPage = Math.floor(pageHeight / mmPerPx);
        let offsetPx = 0;

        while (offsetPx < canvasH) {
          const slicePx = Math.min(pxPerPage, canvasH - offsetPx);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvasW;
          sliceCanvas.height = slicePx;
          const ctx = sliceCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvasW, slicePx);
            ctx.drawImage(canvas, 0, offsetPx, canvasW, slicePx, 0, 0, canvasW, slicePx);
          }
          const sliceData = sliceCanvas.toDataURL('image/jpeg', 1.0);
          if (offsetPx > 0) pdf.addPage();
          pdf.addImage(sliceData, 'JPEG', 0, 0, pageWidth, slicePx * mmPerPx);
          offsetPx += slicePx;
        }
      }

      pdf.save('resume.pdf');
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Ошибка при генерации PDF:\n' + String(err));
    } finally {
      setLoading(false);
    }
  };

  return { exportPdf, loading };
}
