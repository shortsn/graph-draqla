import { makeExecutableSchema } from "graphql_tools";
import { directiveResolvers } from "./directiveResolvers.ts";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./typeDefs.ts";

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
  directiveResolvers
})