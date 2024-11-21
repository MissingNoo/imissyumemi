import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import { live_info } from "../../islands/IsLive.tsx";
// We only want to render the content, so disable
// the `_app.tsx` template as well as any potentially
// inherited layouts
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};
let live = ["Offline", ""]
export default defineRoute(async (_req, _ctx) => {
    let force = true;
    let forcelink = "8bhDMOtYBww";
    await live_info().then(res => {
        live = res;
    });
  
  console.log(live[0]);
  if (live[0] == "true") {
    return (
        <Partial name="live">
            <p>
                <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + live[1]}></iframe>
            </p>
        </Partial>
      );
  }
  else if (force) {
    return (
        <Partial name="live">
            <p>
                <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + forcelink}></iframe>
            </p>
        </Partial>
      );
  }
  else {
    return (
        <Partial name="live">
            <p style="color: cyan;">Currently dreaming</p>
        </Partial>
    );
  }
  
});
