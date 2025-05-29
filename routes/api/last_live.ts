// deno-lint-ignore-file no-explicit-any
/// <reference lib="deno.unstable" />
import { FreshContext } from "$fresh/server.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import { live_status } from "./is_live.ts";
import { redis, twitch_channel_id, youtube_channel_link } from "../../data.ts";

let first_check: any = "";
let last_site: any = "Offline";
async function get_last() {
  try {
    const last = await redis.get("latest");
    last_site = last;
    if (last_site != "Offline") {
      await redis.get(last_site).then((res) => {
        first_check = { value: res };
      });
    }
  } catch (error) {
    console.log(error);
  }
}
await get_last();
const last_live = first_check;

export function time_since_last() {
  const firstDate = moment.utc().format("YYYY/MM/DD HH:mm:ss");
  let secondDate = last_live.value;
  const res = moment.utc(
    moment(firstDate, "YYYY/MM/DD HH:mm:ss").diff(
      moment(secondDate, "YYYY/MM/DD HH:mm:ss"),
    ),
  );

  let months = res.format("MM");
  if (months[0] == "0") {
    months = months.replace("0", "");
    if (months == "0") {
      months = "";
    } else {
      months = (Number.parseInt(months) - 1).toString();
      if (Number.parseInt(months) > 1) {
        months = months + " months, ";
      } else {
        months = months + " month, ";
      }
    }
  }
  if (months == "0 month, ") {
    months = "";
  }

  let days = res.format("DD");
  if (parseInt(days) > 1) {
    days += " days, ";
  } else {
    days += " day, ";
  }
  if (days[0] == "0") {
    days = "";
  }

  let hours = res.format("HH");
  if (parseInt(hours) > 1) {
    hours += " days, ";
  } else {
    hours += " day, ";
  }
  if (hours[0] == "0") {
    hours = "";
  }

  let minutes = res.format("mm");
  if (parseInt(minutes) > 1) {
    minutes += " minutes, ";
  } else {
    minutes += " minute, ";
  }
  if (minutes[0] == "0") {
    minutes = "";
  }

  let seconds = res.format("ss");
  if (parseInt(seconds) > 1) {
    seconds += " seconds ";
  } else {
    seconds += " second ";
  }

  if (
    live_status == "Youtube" || live_status == "Twitch" ||
    live_status == "Youtube|Twitch"
  ) {
    return `<div class="flex flex-col items-center">
            <p>Yumemi is live!</p>
        </div>`;
  } else if (days == "Invalid date") {
    return `<div class="flex flex-col items-center">
            <p>Some error ocurred on the server!</p>
            <p>Maybe api limit was reached</p>
            <p>try reloading the page</p>
        </div>`;
  } else {
    let live_link = "";
    switch (last_site) {
      case "youtube":
        live_link = "https://youtube.com/" + youtube_channel_link;
        break;
      case "twitch":
        live_link = "https://twitch.tv/" + twitch_channel_id;
        break;
    }
    return `<div class="flex flex-col items-center">
            <a href=` + live_link + `>` + months + days + hours + minutes +
      seconds + ` without Yumemi</a>
            </div>`;
  }
}

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = last_live;
  return new Response(body);
};
