// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_json from "./routes/api/json.ts";
import * as $index from "./routes/index.tsx";
import * as $partials_live from "./routes/partials/live.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Footer from "./islands/Footer.tsx";
import * as $Hiccups from "./islands/Hiccups.tsx";
import * as $IsLive from "./islands/IsLive.tsx";
import * as $LastLive from "./islands/LastLive.tsx";
import * as $Socials from "./islands/Socials.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/json.ts": $api_json,
    "./routes/index.tsx": $index,
    "./routes/partials/live.tsx": $partials_live,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/Footer.tsx": $Footer,
    "./islands/Hiccups.tsx": $Hiccups,
    "./islands/IsLive.tsx": $IsLive,
    "./islands/LastLive.tsx": $LastLive,
    "./islands/Socials.tsx": $Socials,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
