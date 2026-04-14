import fs from 'fs/promises';
import path from 'path';

function headerToQuestion(header: string): string {
  if (header.endsWith('?')) return header;
  const cleaned = header.replace(/^The\s+/i, '');
  return `What is ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}?`;
}

export async function getSection1Questions(): Promise<string[]> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'Thoughtworks AI_works- Knowledge Base.md'
  );
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');

  let inSection1 = false;
  const headers: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## SECTION 1:')) {
      inSection1 = true;
      continue;
    }
    if (inSection1 && (line.startsWith('## ') || line === '---')) break;
    if (inSection1 && line.startsWith('### ')) {
      headers.push(line.replace(/^###\s+/, ''));
    }
  }

  return headers.map(headerToQuestion);
}
