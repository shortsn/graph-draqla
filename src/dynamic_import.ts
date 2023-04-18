// const url = new URL('./tasks/test.ts', import.meta.url);

import { bundle, encodeBase64 } from "./deps.ts";

export async function dynamicImport(url: URL) {
  const { code } = await bundle(url);
  return await import(`data:application/typescript;base64,${encodeBase64(code)}`);
}
