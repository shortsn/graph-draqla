import { encode } from 'base64';
import { bundle } from 'emit';

// const url = new URL('./tasks/test.ts', import.meta.url);

export async function dynamicImport(url: URL) {
  const { code } = await bundle(url);
  return await import(`data:application/typescript;base64,${encode(code)}`);
}
