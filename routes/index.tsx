// deno-lint-ignore-file react-no-danger
import { global_hiccups, yumemi_hiccups } from "./api/total_hiccups.ts";
import { signal } from "@preact/signals";
import { livestring } from "../routes/api/is_live.ts";
import { last_site, time_since_last } from "./api/last_live.ts";
import { live_status } from "./api/is_live.ts";
import Hiccups from "../islands/Hiccups.tsx";
import LastTimer from "../islands/LastLive.tsx";
import { twitch_channel_id, youtube_channel_link } from "../data.ts";
const count = signal(global_hiccups);
const ymmhic = signal(yumemi_hiccups);
export function add_count() {
  count.value++;
}
export default function Home() {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return (
    <div class="px-4 py-8 mx-auto my-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">I Miss Yumemi</h1>
        <img
          class="vtuber-icon my-6"
          src="/yumemi.jpg"
          width="128"
          height="128"
          alt="Yumemi Caelestis picture"
        />
        <div
          class="dreaming flex flex-col items-center justify-center"
          dangerouslySetInnerHTML={{ __html: livestring }}
        >
        </div>
        <div class="dreaming flex flex-col items-center justify-center" //dangerouslySetInnerHTML={{ __html:  }}
        >
          <LastTimer target={time_since_last()} last={last_site} status={live_status} ytlink={youtube_channel_link} twlink={twitch_channel_id}></LastTimer>
        </div>
        <Hiccups count={count} ymm={ymmhic} />
      </div>
    </div>
  );
}
