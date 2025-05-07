// deno-lint-ignore-file react-no-danger
import { global_hiccups, yumemi_hiccups } from "./api/total_hiccups.ts";
import { signal } from "@preact/signals";
import { livestring } from "../routes/api/is_live.ts";
import { time_since_last } from "./api/last_live.ts";
import Hiccups from "../islands/Hiccups.tsx";
const count = signal(global_hiccups);
const ymmhic = signal(yumemi_hiccups);
export function add_count() {
  count.value++;
}
export default function Home() {
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
        <div
          class="dreaming flex flex-col items-center justify-center"
          dangerouslySetInnerHTML={{ __html: time_since_last() }}
        >
        </div>
        <Hiccups count={count} ymm={ymmhic} />
      </div>
    </div>
  );
}
