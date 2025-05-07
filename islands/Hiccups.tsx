// deno-lint-ignore-file no-explicit-any
import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
interface CounterProps {
  count: Signal<number>;
  ymm: Signal<number>;
}

export default function Hiccups(props: CounterProps) {
  //props.count = global_hiccups;
  console.log();
  const mySounds = [
    "sound1",
    "sound2",
    "sound3",
    "sound4",
    "sound5",
    "sound6",
    "sound7",
    "sound8",
    "sound9",
    "sound10",
    "sound11",
    "sound12",
    "sound13",
    "sound14",
    "sound15",
  ];
  return (
    <div class="dreaming flex gap-8 py-6">
      <script>
        <audio id="sound1">
          <source src="hiccups/1.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound2">
          <source src="hiccups/2.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound3">
          <source src="hiccups/3.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound4">
          <source src="hiccups/4.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound5">
          <source src="hiccups/5.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound6">
          <source src="hiccups/6.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound7">
          <source src="hiccups/7.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound8">
          <source src="hiccups/8.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound9">
          <source src="hiccups/9.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound10">
          <source src="hiccups/10.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound11">
          <source src="hiccups/11.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound12">
          <source src="hiccups/12.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound13">
          <source src="hiccups/13.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound14">
          <source src="hiccups/14.mp3" type="audio/mpeg" />
        </audio>
        <audio id="sound15">
          <source src="hiccups/15.mp3" type="audio/mpeg" />
        </audio>
      </script>
      <div class="flex flex-col items-center justify-center">
        <div>
          Hiccup counter: {props.ymm}
        </div>
        <div>
          <Button
            onClick={() => {
              props.count.value += 1;
              const index: number = Math.floor(Math.random() * 1000) %
                mySounds.length;
              const id: string = mySounds[index];
              const audioElement: any = document.getElementById(id);
              audioElement.play();
              fetch("/api/add_hiccup");
            }}
          >
            Click to Hiccup!
          </Button>
        </div>
        <div>
          Global hiccup counter: {props.count}
        </div>
      </div>
    </div>
  );
}
