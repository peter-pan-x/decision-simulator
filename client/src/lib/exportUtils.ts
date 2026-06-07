import { toast } from 'sonner';

export async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);

  if (!element) {
    toast.error('Report export failed', {
      description: 'The report content could not be found.',
    });
    return false;
  }

  const reportTitle = document.title || 'Decision Simulator Report';
  const safeFilename = filename.replace(/\.pdf$/i, '.html').replace(/[^a-z0-9_.-]/gi, '_');
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(reportTitle)}</title>
    <style>
      body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 32px; color: #111827; line-height: 1.55; }
      h1, h2, h3 { color: #0f172a; }
      .meta { margin-bottom: 24px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
      .report { max-width: 1100px; margin: 0 auto; }
      button, svg, canvas, [role="tablist"] { display: none !important; }
      .shadow-sm, .shadow-lg { box-shadow: none !important; }
      * { max-width: 100%; }
    </style>
  </head>
  <body>
    <main class="report">
      <div class="meta">Exported from Decision Simulator on ${new Date().toLocaleString()}</div>
      ${element.outerHTML}
    </main>
  </body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeFilename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  toast.success('Report exported', {
    description: `${safeFilename} has been downloaded.`,
  });

  return true;
}

/**
 * 分享报告链接
 */
export async function shareReport(title: string, text: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  } else {
    // Fallback
    navigator.clipboard.writeText(window.location.href);
    toast.success('Report link copied');
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
