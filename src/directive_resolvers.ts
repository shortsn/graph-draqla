// deno-lint-ignore-file no-explicit-any no-unused-vars
import { IDirectiveResolvers } from "./deps.ts";

export const directiveResolvers: IDirectiveResolvers = {
  fump: (next: () => any, source: any, args: any, ctx: any): any => {
    return next();
  }
} as const;
