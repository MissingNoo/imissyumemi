import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Partial } from "$fresh/runtime.ts";
import Hiccup from "../islands/Hiccups.tsx";
import LastLive from "../islands/LastLive.tsx";
import IsLive from "../islands/IsLive.tsx";
import Socials from "../islands/Socials.tsx";

export default function Home() {
  const count = useSignal(2);
  return (
    <div class="bg-[#d1aaf3]">
      <div class="flex flex-col items-center justify-center">
        <h1>Yumemi Caelestis</h1>
        <img
          class="my-6 rounded-full"
          src="/yumemi.png"
          width="256"
          border-radius="30"
          alt="Yumemi's profile icon"
        />
        <div class="dreaming flex flex-col items-center">
          <p>Current Stream</p>
          <IsLive></IsLive>
        </div>
        <div class="dreaming flex flex-col items-center">
          <LastLive></LastLive>
        </div>
        <div class="dreaming flex flex-col items-center">
          <p>Hiccup counter</p>
          <Hiccup></Hiccup>
        </div>
        <Socials></Socials>
      </div>
    </div>
  );
}