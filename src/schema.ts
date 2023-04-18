import { makeExecutableSchema } from "./deps.ts";
import { directiveResolvers } from "./directive_resolvers.ts";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./type_defs.ts";

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
  directiveResolvers
})