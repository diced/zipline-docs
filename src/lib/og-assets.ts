import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

let logoDataUrl: string | undefined;

export async function getOgLogoDataUrl(): Promise<string> {
  if (logoDataUrl) return logoDataUrl;

  const buffer = await readFile(join(process.cwd(), 'public/img/zipline.png'));
  logoDataUrl = `data:image/png;base64,${buffer.toString('base64')}`;

  return logoDataUrl;
}
