#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
import * as util from "node:util";
import * as child_process from "node:child_process";

export function exec(command: string){
  child_process.exec(command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
  
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

Deno.serve({ port: 4242 }, (req) => {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.addEventListener("open", () => {
    //console.log("A client just connected!");
    exec('ls');
  });
  socket.addEventListener("message", (event) => {
    if (event.data === "hey") {
      socket.send("yo");
    }
  });
  socket.addEventListener("close", () => {
    console.log("Disconnected!");
  });
  return response;
});
