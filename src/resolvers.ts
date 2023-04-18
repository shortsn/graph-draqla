// deno-lint-ignore-file no-explicit-any no-unused-vars
import { IResolvers, parseCSV } from "./deps.ts";

const pick = (obj: Record<string, unknown>, keys: string[]) => Object.fromEntries(
  keys
    .filter(key => key in obj)
    .map(key => [key, obj[key]])
)

const omit = (obj: Record<string, unknown>, keys: string[]) => Object.fromEntries(
  Object.entries(obj)
    .filter(([key]) => !keys.includes(key))
)

const file = (name: string) => {
  const ext = name.split('.').slice(-1).pop();
  return { name, ext };
}

const knownTypes = new Set(['csv', 'txt']);

const readFile = (name: string) => Deno.readTextFile(`./csv/${name}`)
const text = ({ name }: any, args: any, context: any) => readFile(`./csv/${name}`);
const size = ({ name }: any, args: any, context: any) => Deno.stat(`./csv/${name}`).then(({ size }) => size);

export const resolvers: IResolvers = {
  Query: {
    files: async () => {
      const files = [];
      for await (const dirEntry of Deno.readDir("./csv")) {
        if (!dirEntry.isFile) {
          continue;
        }
        files.push(file(dirEntry.name))
      }
      return files;
    },
    file: (root: any, { name }: any, context: any) => file(name)
  },

  File: {
    __resolveType: ({ ext }: any, context: any) => knownTypes.has(ext) ? ext : 'unknown',
  },

  unknown: {
    size,
  },

  txt: {
    text,
    size,
  },

  csv: {
    name: ({ name }: any, args: any, context: any) => name,
    text,
    size,
    rows: async ({ name }: any, { include, exclude }: any, context: any) => {
      const rows = parseCSV(await readFile(name), { skipFirstRow: true });
      if (include?.length) {
        return rows.map(row => pick(row, include))
      }
      if (exclude?.length) {
        return rows.map(row => omit(row, exclude))
      }
      return rows;
    }
  }
} as const;