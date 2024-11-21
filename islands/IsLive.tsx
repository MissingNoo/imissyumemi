const YOUR_API_KEY = Deno.env.get("YTKEY");
let live = ["", ""];
export default function IsLive() {
  live_info();
  //console.log(live)
  if (live[0] == "true") {
    return (
      <p>
        <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + live[1]}></iframe>
      </p>
    );
  }
  else {
    return (
        <p style="color: cyan;">Currently dreaming</p>
    );
  }
}
const date = new Date();

export function live_info() {
  let earlyexit = false;
    let livestatus = "false";
    //const channelid = "UCyKsg-57XC9pyHbP7v3kCPQ"; // REPLACE WITH YOUR CHANNEL ID
    const channelid = "UC2X643A7Hu0sqeet_wcJ-0g"; // REPLACE WITH YOUR CHANNEL ID
    const cur_hour = date.getHours();
    const lastsync = Deno.env.get("lasthoursync");
    //lastsync = "0";
    let lasthour = 0;
    if (lastsync != undefined) {
      lasthour = parseInt(lastsync);
    }
    const laststatus = Deno.env.get("laststatus");
    if (laststatus != undefined) {
      livestatus = laststatus;
    }
    if (cur_hour == lasthour) {
      earlyexit = true;
    }
    if (earlyexit) {
      const id = Deno.env.get("lastid");
      live = [livestatus, id];
      return [livestatus, id];
    }
    fetch('https://www.youtube.com/channel/' + channelid).then(function (response) {
      return response.text();
    }).then(function (html) {
      if (html.includes("AO VIVO")) {
        livestatus = "true";
      }
      else {
        livestatus = "false";
      }
      Deno.env.set("laststatus", livestatus);
    }).catch(function (err) {
      console.log(err);
    });
    let id = "";
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelid + '&order=date&eventType=completed&type=video&key=' + YOUR_API_KEY).then(function (response) {
        return response.text();
      }).then(function (json) {
        const j = JSON.parse(json);
        console.log(j);
        id = j.items[0].id.videoId;
        Deno.env.set("lastdate", j.items[0].snippet.publishedAt);
        Deno.env.set("lastid", id);
        Deno.env.set("laststatus", livestatus);
        Deno.env.set("lasthoursync", date.getHours().toString().trim());
      }).catch(function (err) {
        livestatus = "Error";
        Deno.env.set("laststatus", livestatus);
        //console.log(err);
      });
    return [livestatus, id];
}