import { FreshContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  //const randomIndex = Math.floor(Math.random() * JOKES.length);
  //const body = JOKES[randomIndex];
  const data = {
    "livestatus" : Deno.env.get("livestatus"),
    "lastid" : Deno.env.get("lastid"),
    "lastyoutubelive" : Deno.env.get("lastdate")
  }
  return new Response(JSON.stringify(data));
};
