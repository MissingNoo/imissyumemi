// deno-lint-ignore-file react-no-danger
import { signal } from "@preact/signals";
export function handler(req: Request): Response {
  return Response.redirect("http://imissyumemi.337494.xyz", 307);
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
      </div>
    </div>
  );
}
