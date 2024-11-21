const YOUR_API_KEY = "putYaOwnApiKeyBrothar";
//const YOUR_API_KEY = "";
export default function IsLive() {
  let live = ["", ""];
  live_info().then(res => {
    live = res;
  });

  console.log(live[0]);
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
let date = new Date();
export async function live_info() {
  let earlyexit = false;
    let livestatus = "false";
    //const channelid = "UCDqI2jOz0weumE8s7paEk6g"; // REPLACE WITH YOUR CHANNEL ID
    const channelid = "UC2X643A7Hu0sqeet_wcJ-0g"; // REPLACE WITH YOUR CHANNEL ID
    await Deno.readTextFile("lasthoursync").then(
      function (response) {
        const cur_hour = date.getHours();
        const lastsync = parseInt(response);
        if (cur_hour == lastsync) {
          //console.log("Already checked this hour");
          earlyexit = true;
        }
      }
    )
    if (earlyexit) {
      const id = await Deno.readTextFile("lastid");
      livestatus = await Deno.readTextFile("laststatus");
      return [livestatus, id];
    }
    await fetch('https://www.youtube.com/channel/' + channelid).then(function (response) {
      return response.text();
    }).then(function (html) {
      if (html.includes("AO VIVO")) {
        livestatus = "true";
      }
    }).catch(function (err) {
      console.log(err);
    });
    let id = "";
    await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelid + '&order=date&eventType=completed&type=video&key=' + YOUR_API_KEY).then(function (response) {
        return response.text();
      }).then(function (json) {
        const j = JSON.parse(json);
        console.log(j);
        id = j.items[0].id.videoId;
        Deno.writeTextFile("lastid", id);
        Deno.writeTextFile("laststatus", livestatus);
        Deno.writeTextFile("lasthoursync", date.getHours().toString().trim());
      }).catch(function (err) {
        livestatus = "Error"
        //console.log(err);
      });

    return [livestatus, id];
}