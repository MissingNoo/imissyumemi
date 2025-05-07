import { FreshContext } from "$fresh/server.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import { kv, twitch_channel_id, youtube_channel_id } from "../../data.ts";
let firststatus = "Offline";
async function Check_Youtube() {
  await fetch(`https://www.youtube.com/channel/${youtube_channel_id}`).then(
    function (response) {
      return response.text();
    },
  ).then(function (html) {
    if (
      html.includes("AO VIVO") ||
      html.includes('<div class="badge-shape-wiz__text">LIVE</div>')
    ) {
      firststatus = "Youtube";
      kv.set(["last", "youtube"], moment.utc().format("YYYY/MM/DD HH:mm:ss"));
      kv.set(["last", "latest"], "youtube");
    }
  }).catch(function (err) {
    console.log(err);
  });
}

async function Check_Twitch() {
  await fetch(`https://twitch.tv/${twitch_channel_id}`).then(
    function (response) {
      return response.text();
    },
  ).then(function (res) {
    if (res.includes("isLiveBroadcast")) {
      if (firststatus == "Offline") {
        firststatus = "Twitch";
      } else {
        firststatus += "|Twitch";
      }

      kv.set(["last", "twitch"], moment.utc().format("YYYY/MM/DD HH:mm:ss"));
      kv.set(["last", "latest"], "twitch");
    }
  });
}

await Check_Youtube();
await Check_Twitch();

export const live_status = firststatus;
export let livestring = "";
switch (live_status) {
  case "Youtube":
    livestring = `<p>
        <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + Deno.env.get("lastid")}></iframe>
      </p>`;
    break;
  case "twitch":
    livestring = `<p style="color: #9146ff;"><a href="https://www.twitch.tv/` +
      twitch_channel_id + `">Live on Twitch!</a></p>`;
    break;
  case "Youtube|Twitch":
    livestring = `<p style="color: #9146ff;"><a href="https://www.twitch.tv/` +
      twitch_channel_id + `">Live on Twitch!</a></p><p>And on Youtube!</p>`;
    break;
  default:
    livestring = `<p style="color: cyan;">Currently dreaming</p>`;
    break;
}
export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = live_status;
  return new Response(body);
};
