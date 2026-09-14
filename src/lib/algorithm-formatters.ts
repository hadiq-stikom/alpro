/**
 * Utilitas pemformatan algoritma untuk Pseudocode, Flowchart, dan Naratif
 * Mengikuti Standar Pedagogis Web-Alpro (CLRS & Materi Bab 3)
 */

export function formatOutputArgsForPseudocode(raw: string): string {
  let s = raw.trim();

  // 1. Deteksi f-string Python: f"..." atau f'...'
  if (/^f["']/.test(s) && (s.endsWith('"') || s.endsWith("'"))) {
    const content = s.slice(2, -1);
    const tokens: string[] = [];
    let lastIdx = 0;
    const regex = /\{([^}]+)\}/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      const textBefore = content.slice(lastIdx, match.index);
      if (textBefore) tokens.push(JSON.stringify(textBefore));
      let varExpr = match[1].trim();
      // Bersihkan format specifier Python seperti {total:,} atau {nilai:.2f}
      if (varExpr.includes(':') && !varExpr.includes(' if ') && !varExpr.includes('?')) {
        varExpr = varExpr.split(':')[0].trim();
      }
      tokens.push(varExpr);
      lastIdx = regex.lastIndex;
    }
    const textAfter = content.slice(lastIdx);
    if (textAfter) tokens.push(JSON.stringify(textAfter));
    return tokens.join(', ');
  }

  // 2. Deteksi template literal JavaScript: `...`
  if (/^`.*`$/.test(s)) {
    const content = s.slice(1, -1);
    const tokens: string[] = [];
    let lastIdx = 0;
    const regex = /\$\{([^}]+)\}/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      const textBefore = content.slice(lastIdx, match.index);
      if (textBefore) tokens.push(JSON.stringify(textBefore));
      tokens.push(match[1].trim());
      lastIdx = regex.lastIndex;
    }
    const textAfter = content.slice(lastIdx);
    if (textAfter) tokens.push(JSON.stringify(textAfter));
    return tokens.join(', ');
  }

  // 3. Bersihkan pembungkus str() atau String(): str(x) -> x
  s = s.replace(/\b(?:str|String)\(([^)]+)\)/g, '$1');

  return s;
}
