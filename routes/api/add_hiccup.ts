// deno-lint-ignore-file no-explicit-any
import { FreshContext } from "$fresh/server.ts";
import { hiccupscol } from "../../data.ts";
import { add_count } from "../index.tsx";
let allhiccups = await hiccupscol.findOne({ vtuber: "yumemi" });

let first_check: any = undefined;
async function get_hiccups() {
  try {
    first_check = allhiccups?.global;
    const newh = first_check + 1;
    await hiccupscol.updateOne({ vtuber: "yumemi" }, {
      $set: {
        _id: allhiccups?._id,
        vtuber: allhiccups?.vtuber,
        yumemi: allhiccups?.yumemi,
        global: newh,
      },
    }).then(() => {
      update_hicups();
    });
  } catch (error) {
    console.log(error);
  }
}

async function update_hicups() {
  allhiccups = await hiccupscol.findOne({ vtuber: "yumemi" });
  add_count();
}

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  get_hiccups();
  const body = first_check;
  return new Response(body);
};
