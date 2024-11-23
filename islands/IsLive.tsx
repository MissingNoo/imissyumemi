const YOUR_API_KEY = Deno.env.get("YTKEY");
const date = new Date();
let live = ["", ""];
await live_info();
export default function IsLive() {
  console.log(live)
  if (live[0] == "true") {
    return (
      <p>
        <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + live[1]}></iframe>
      </p>
    );
  }
  else if (live[0] == "twitch") {
    return (
      <p style="color: #9146ff;"><a href="https://www.twitch.tv/yumemivt">Live on Twitch!</a></p>
    );
  }
  else {
    return (
        <p style="color: cyan;">Currently dreaming</p>
    );
  }
}


export async function result() {
  
}

export async function live_info() {
  let earlyexit = false;
    let livestatus = "false";
    //const channelid = "UCyKsg-57XC9pyHbP7v3kCPQ"; // REPLACE WITH YOUR CHANNEL ID
    const channelid = "UC2X643A7Hu0sqeet_wcJ-0g"; // REPLACE WITH YOUR CHANNEL ID
    const cur_hour = date.getHours();
    const lastsync = Deno.env.get("lasthoursync");
    //lastsync = "0";
    let lasthour = -1;
    if (lastsync != undefined) {
      lasthour = parseInt(lastsync);
    }
    const laststatus = Deno.env.get("laststatus");
    if (laststatus != undefined) {
      livestatus = laststatus;
    }
    console.log("Now: " + cur_hour + " Last: " + lasthour);
    if (cur_hour == lasthour) {
      console.log("Exit early because of recent check");
      earlyexit = true;
    }

    fetch('https://www.youtube.com/channel/' + channelid).then(function (response) {
      return response.text();
    }).then(function (html) {
      if (html.includes("AO VIVO")) {
        livestatus = "true";
        console.log("Channel is live!");
      }
      else {
        livestatus = "false";
        console.log("Channel is not live");
        if (Deno.env.get("lastid") != undefined) {
          earlyexit = true;
        }
      }
      Deno.env.set("laststatus", livestatus);
    }).catch(function (err) {
      console.log(err);
    });
    let id = "";
    if (livestatus == "false") {
      //console.log(Check_Twitch("yumemivt"));
      let bt = livestatus;
      if (await Check_Twitch("yumemivt")) {
        earlyexit = true;
        livestatus = "twitch";
        Deno.env.set("livestatus", livestatus);
      }
      else {
        livestatus = bt;
        Deno.env.set("livestatus", livestatus);
      }
    }

    if (earlyexit) {
      console.log("exiting early");
      const id = Deno.env.get("lastid");
      Deno.env.set("livestatus", livestatus);
      live = [livestatus, id?id:""];
      console.log("a:" + live);
      return live;
    }
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

export function Check_Youtube() {
  
}

export async function Check_Twitch(username: string) {
  let live = false;
  const response = await fetch(`https://twitch.tv/${username}`).then(function (response) {
    return response.text();
  }).then(function (res) {
    if (res.includes('isLiveBroadcast')) {
      live = true;
      console.log("s ");
    }
  });
  return live;
}