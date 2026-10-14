import fs from 'fs';
import path from 'path';

// Baca file markdown
const mdPath = 'LAPORAN_AUDIT_INTEGRITAS_ESAI.md';
const mdContent = fs.readFileSync(mdPath, 'utf8');

// Baca file tanda tangan dan konversi ke base64
const ttdPath = 'public/ttdKu.png';
let ttdBase64 = '';
if (fs.existsSync(ttdPath)) {
  const ttdBuffer = fs.readFileSync(ttdPath);
  ttdBase64 = `data:image/png;base64,${ttdBuffer.toString('base64')}`;
}

// Helper sederhana untuk parse markdown ke HTML profesional
function parseMarkdownToHtml(md) {
  let html = md;

  // Ganti path ttdKu.png dengan base64
  if (ttdBase64) {
    html = html.replace(/<img\s+src=["']\.\/public\/ttdKu\.png["'][^>]*\/>/g, 
      `<img src="${ttdBase64}" alt="Tanda Tangan Dosen" style="max-width: 170px; height: auto; margin: 10px 0;" />`);
    html = html.replace(/<img\s+src=["']\/ttdKu\.png["'][^>]*\/>/g, 
      `<img src="${ttdBase64}" alt="Tanda Tangan Dosen" style="max-width: 170px; height: auto; margin: 10px 0;" />`);
  }

  // Pisahkan blok mermaid
  const mermaidBlocks = [];
  html = html.replace(/```mermaid([\s\S]*?)```/g, (match, code) => {
    const id = `mermaid-placeholder-${mermaidBlocks.length}`;
    mermaidBlocks.push(code.trim());
    return `<div class="mermaid-container"><div class="mermaid">${code.trim()}</div></div>`;
  });

  // Pisahkan blok kode biasa
  html = html.replace(/```([a-z]*)([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="code-block"><code>${code.trim()}</code></pre>`;
  });

  // Math inline $...$ dan block $$...$$
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block">$$$1$$</div>');
  html = html.replace(/\$([^\$\n]+)\$/g, '<span class="math-inline">$$$1$$</span>');

  // Headings
  html = html.replace(/^# (.*$)/gim, '<h1 class="doc-title">$1</h1>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="doc-subtitle">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="section-title">$1</h2>');
  html = html.replace(/^#### (.*$)/gim, '<h4 class="sub-section-title">$1</h4>');

  // Horizontal Rule
  html = html.replace(/^---$/gim, '<hr class="doc-divider" />');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="quote-block">$1</blockquote>');

  // Tables
  html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableText) => {
    const lines = tableText.trim().split('\n').filter(Boolean);
    if (lines.length < 2) return tableText;

    let tableHtml = '<div class="table-wrapper"><table class="audit-table">';
    // Header
    const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
    tableHtml += '<thead><tr>' + headers.map(h => `<th>${formatInline(h)}</th>`).join('') + '</tr></thead>';

    // Body
    tableHtml += '<tbody>';
    for (let i = 2; i < lines.length; i++) {
      const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
      tableHtml += '<tr>' + cells.map(c => {
        let cellClass = '';
        if (c.includes('🔴')) cellClass = ' class="badge-danger"';
        else if (c.includes('🟢')) cellClass = ' class="badge-success"';
        else if (c.includes('🟡')) cellClass = ' class="badge-warning"';
        return `<td${cellClass}>${formatInline(c)}</td>`;
      }).join('') + '</tr>';
    }
    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ordered">$1</li>');

  // Wrap consecutive li
  html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, (match) => {
    return `<ul class="doc-list">${match}</ul>`;
  });

  // Paragraphs
  const paras = html.split(/\n{2,}/);
  html = paras.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<hr') || p.startsWith('<div') || 
        p.startsWith('<ul') || p.startsWith('<table') || p.startsWith('<blockquote') ||
        p.startsWith('<pre')) {
      return p;
    }
    return `<p>${formatInline(p)}</p>`;
  }).join('\n\n');

  return html;
}

function formatInline(str) {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
}

const parsedBody = parseMarkdownToHtml(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Audit Forensik Digital Integritas Akademik - Web-Alpro</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  
  <!-- Mermaid JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'neutral',
      fontFamily: 'Plus Jakarta Sans',
      flowchart: { curve: 'basis' }
    });
  </script>

  <!-- MathJax CDN for formulas -->
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

  <style>
    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --text-main: #0f172a;
      --text-muted: #475569;
      --bg-card: #ffffff;
      --border: #e2e8f0;
      --danger: #dc2626;
      --danger-bg: #fef2f2;
      --success: #16a34a;
      --success-bg: #f0fdf4;
      --warning: #d97706;
      --warning-bg: #fffbeb;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--text-main);
      background-color: #f8fafc;
      line-height: 1.65;
      font-size: 13.5px;
      -webkit-font-smoothing: antialiased;
    }

    /* Floating Print Action Toolbar */
    .toolbar-container {
      position: sticky;
      top: 0;
      z-index: 999;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .toolbar-title {
      font-weight: 700;
      font-size: 14px;
      color: var(--primary-dark);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-print {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(2, 132, 199, 0.35);
    }

    .btn-print:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }

    .print-tip {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Paper Container (A4 Proportions) */
    .paper {
      max-width: 960px;
      margin: 32px auto;
      background: var(--bg-card);
      padding: 56px 64px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
      border: 1px solid var(--border);
    }

    /* Kop Surat Header */
    .kop-surat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px double #0f172a;
      padding-bottom: 18px;
      margin-bottom: 28px;
    }

    .kop-logo {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -1px;
      color: #0369a1;
    }

    .kop-instansi {
      text-align: right;
      font-size: 11.5px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .kop-instansi strong {
      color: var(--text-main);
      font-size: 13px;
      display: block;
    }

    /* Headings */
    h1.doc-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.3;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: -0.5px;
    }

    h3.doc-subtitle {
      font-size: 14px;
      font-weight: 700;
      color: #0369a1;
      margin-bottom: 18px;
    }

    h2.section-title {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 32px;
      margin-bottom: 12px;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    h4.sub-section-title {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      margin-top: 20px;
      margin-bottom: 8px;
    }

    p {
      margin-bottom: 14px;
      text-align: justify;
      color: #334155;
    }

    hr.doc-divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 24px 0;
    }

    /* Tables */
    .table-wrapper {
      margin: 20px 0;
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    table.audit-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }

    table.audit-table th {
      background: #f1f5f9;
      color: #0f172a;
      padding: 10px 12px;
      font-weight: 700;
      border-bottom: 2px solid #cbd5e1;
      white-space: nowrap;
    }

    table.audit-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: middle;
    }

    table.audit-table tr:nth-child(even) {
      background: #fafafa;
    }

    table.audit-table tr:hover {
      background: #f1f5f9;
    }

    /* Badges */
    .badge-danger {
      background: #fef2f2 !important;
      color: #991b1b !important;
      font-weight: 700;
    }

    .badge-success {
      background: #f0fdf4 !important;
      color: #166534 !important;
      font-weight: 700;
    }

    .badge-warning {
      background: #fffbeb !important;
      color: #92400e !important;
      font-weight: 700;
    }

    /* Blockquotes */
    blockquote.quote-block {
      border-left: 4px solid #0284c7;
      background: #f0f9ff;
      padding: 12px 18px;
      margin: 14px 0;
      font-size: 12.5px;
      color: #0c4a6e;
      border-radius: 0 8px 8px 0;
      font-style: normal;
    }

    /* Mermaid */
    .mermaid-container {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      margin: 20px 0;
      display: flex;
      justify-content: center;
      page-break-inside: avoid;
    }

    .mermaid {
      max-width: 100%;
    }

    /* Lists */
    ul.doc-list {
      margin: 12px 0 16px 24px;
      color: #334155;
    }

    ul.doc-list li {
      margin-bottom: 6px;
    }

    ul.doc-list li.ordered {
      list-style-type: decimal;
    }

    code.inline-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    .math-block {
      background: #f8fafc;
      padding: 10px;
      border-radius: 6px;
      text-align: center;
      margin: 12px 0;
      border: 1px dashed #cbd5e1;
    }

    /* PRINT RULES */
    @media print {
      body {
        background: #ffffff !important;
        font-size: 11pt !important;
        color: #000000 !important;
      }

      .toolbar-container {
        display: none !important;
      }

      .paper {
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
        max-width: 100% !important;
      }

      @page {
        size: A4 portrait;
        margin: 18mm 15mm 18mm 15mm;
      }

      h2.section-title {
        page-break-after: avoid;
        margin-top: 24px;
      }

      h4.sub-section-title {
        page-break-after: avoid;
      }

      .table-wrapper, table.audit-table, .mermaid-container, blockquote.quote-block {
        page-break-inside: avoid;
      }

      table.audit-table th {
        background: #f1f5f9 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .badge-danger, .badge-success, .badge-warning {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  </style>
</head>
<body>

  <!-- Floating Print Toolbar -->
  <div class="toolbar-container">
    <div class="toolbar-title">
      <span>📄 Dokumen Siap Cetak: Laporan Audit Forensik Integritas Akademik</span>
      <span class="print-tip">(Gunakan ukuran kertas A4, margin Default/Minimum)</span>
    </div>
    <button class="btn-print" onclick="window.print()">
      🖨️ Cetak / Simpan sebagai PDF
    </button>
  </div>

  <!-- Document Paper Body -->
  <div class="paper">
    
    <!-- Kop Surat Resmi -->
    <div class="kop-surat">
      <div class="kop-logo">WEB-ALPRO</div>
      <div class="kop-instansi">
        <strong>PROGRAM STUDI TEKNIK INFORMATIKA</strong>
        Mata Kuliah Dasar Algoritma & Pemrograman (PP112601)<br/>
        Tahun Akademik 2026/2027 — Semester Ganjil
      </div>
    </div>

    <!-- Konten Dokumen yang Diparse dari Markdown -->
    <div class="doc-body">
      ${parsedBody}
    </div>

  </div>

</body>
</html>
`;

// Tulis ke LAPORAN_AUDIT_INTEGRITAS_ESAI.html
fs.writeFileSync('LAPORAN_AUDIT_INTEGRITAS_ESAI.html', fullHtml);
console.log('✅ Berhasil membuat file LAPORAN_AUDIT_INTEGRITAS_ESAI.html siap cetak PDF!');
