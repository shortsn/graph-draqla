import { cli } from "./src/cli.ts";

await cli.parse(Deno.args);

cli.showHelp();