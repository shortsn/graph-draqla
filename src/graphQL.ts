import { GraphQLHTTP, runHttpQuery, serveHttp } from "./deps.ts";
import { schema } from "./schema.ts";

export function run(query: string) {
  return runHttpQuery({ query }, { schema });
}

export function serve(graphiql: boolean, port: number) {
  return serveHttp(async (req) => {
    const { pathname } = new URL(req.url)

    return pathname === '/graphql'
      ? await GraphQLHTTP<Request>({
        schema,
        graphiql,
      })(req)
      : new Response('Not Found', { status: 404 })
  }, {
    port,
    onListen: ({ hostname, port }) =>
      console.log(`☁  Started on http://${hostname}:${port}/graphql`),
  })
}