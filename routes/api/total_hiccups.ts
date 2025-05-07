import { useSignal } from "@preact/signals";
import { FreshContext } from "$fresh/server.ts";
import { hiccupscol } from "../../data.ts";
let first_check: any = 0;
async function get_hiccups() {
  const dbres = await hiccupscol.findOne({ vtuber: "yumemi" });
  first_check = dbres;
}
await get_hiccups();
export const global_hiccups: any = first_check.global;
export const yumemi_hiccups: any = first_check.yumemi;
export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = global_hiccups;
  return new Response(body);
};
