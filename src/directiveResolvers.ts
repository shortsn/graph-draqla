// deno-lint-ignore-file no-explicit-any no-unused-vars
import { IDirectiveResolvers } from "graphql_tools/utils/interfaces.ts";

export const directiveResolvers: IDirectiveResolvers = {
  fump: (next: () => any, source: any, args: any, ctx: any): any => {
    return next();
  }
} as const;
