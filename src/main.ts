import { readLines } from "https://deno.land/std@0.183.0/io/read_lines.ts";

import { Command } from "cliffy/command";
import { run, serve } from "./graphQL.ts";

async function readStdin() {
  const lines: string[] = [];
  if (!Deno.isatty(Deno.stdin.rid)) {
    for await (const line of readLines(Deno.stdin)) {
      line && lines.push(line);
    }
  }
  return lines.join('\n');
}

const command = new Command()
  .name("graph")
  .version("0.0.1")
  .description("local graphQL")
  .command("run", "run graphQL query")
  .option("-f, --file <file:string>", "run query from file")
  .action(async ({ file }) => {
    const query = file ? await Deno.readTextFile(file) : await readStdin();
    console.log(JSON.stringify(await run(query), null, 2));
    Deno.exit();
  })
  .command("serve", "serve graphQL api")
  .option("-g, --graphiql", "graphiQL", { default: true })
  .option("-p, --port <port:number>", "port", { default: 3000 })
  .action(({ graphiql, port }) => serve(graphiql, port));

await command
  .parse(Deno.args);

command.showHelp();