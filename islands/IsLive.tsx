//const channelid = "UClSHdqgOYiV5tTI6RiF4-Dg";
const channelid = "UC2X643A7Hu0sqeet_wcJ-0g";
const username = "yumemivt";
const YOUR_API_KEY = Deno.env.get("YTKEY");
const date = new Date();
const cur_hour = date.getHours();
let lasthour = Deno.env.get("lasthoursync") ?? -1;
let liveon = "nowhere";

await live_info();
export default function IsLive() {
  live_info();
  Deno.env.set("livestatus", liveon);
  switch (liveon) {
    case "youtube":
      return (
        <p>
          <iframe width="420" height="315" src={"https://www.youtube.com/embed/" + Deno.env.get("lastid")}></iframe>
        </p>
      );
    case "twitch":
      return (
        <p style="color: #9146ff;"><a href="https://www.twitch.tv/yumemivt">Live on Twitch!</a></p>
      );
    default:
      return (
        <p style="color: cyan;">Currently dreaming</p>
      );
  }
}

export async function live_info() {
  lasthour = Deno.env.get("lasthoursync") ?? -1;
  console.log("====================");
  await Check_Youtube();
  await Check_Twitch();
  console.log("Now: " + cur_hour + "h Last: " + lasthour + "h");

  if (cur_hour == lasthour) {
    console.log("Exiting early");
    return;
  }

  //In case streamer is live only on youtube, grab current stream id
  if (liveon == "youtube") {
    await Last_Youtube_live("live");
  }
  else if (liveon == "nowhere") {
    //In case streamer is not live in any place, grab the latest completed youtube live and store the id/date
    await Last_Youtube_live("completed");
  }
}

export async function Check_Youtube() {
  await fetch('https://www.youtube.com/channel/' + channelid).then(function (response) {
    return response.text();
  }).then(function (html) {
    if (html.includes('AO VIVO') || html.includes('<div class="badge-shape-wiz__text">LIVE</div>')) {
      liveon = "youtube";
      console.log("Channel is live on YouTube!");
    }
    else {
      console.log("Channel is not live on YouTube");
    }
  }).catch(function (err) {
    console.log(err);
  });
}

export async function Last_Youtube_live(status: string) {
  console.log("Fetching last live ID");
  await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelid + '&order=date&eventType=' + status + '&type=video&key=' + YOUR_API_KEY).then(function (response) {
    return response.text();
  }).then(function (json) {
    const j = JSON.parse(json);
    console.log(j);
    const id = j.items[0].id.videoId;
    Deno.env.set("lastdate", j.items[0].snippet.publishedAt);
    Deno.env.set("lastid", id);
    Deno.env.set("lasthoursync", date.getHours().toString().trim());
  }).catch(function (err) {
    console.log(err);
  });
}

export async function Check_Twitch() {
  await fetch(`https://twitch.tv/${username}`).then(function (response) {
    return response.text();
  }).then(function (res) {
    if (res.includes('isLiveBroadcast')) {
      liveon = "twitch";
      console.log("Channel is live on Twitch!");
    }
    else {
      console.log("Channel is not live on Twitch");
    }
  });
}