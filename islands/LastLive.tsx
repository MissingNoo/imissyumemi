import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
const kv = await Deno.openKv();
const lasttw = await kv.get(["last", "twitch"]);
const lastyt = await kv.get(["last", "youtube"]);
const latest = await kv.get(["last", "latest"]);
export default function LastLive() {
    let live_link = "";
    const lastid = Deno.env.get("lastid");
    const firstDate = moment.utc().format("YYYY/MM/DD HH:mm:ss");
    let secondDate = moment.utc().format("YYYY/MM/DD HH:mm:ss");
    switch (latest.value) {
        case "youtube":
            //secondDate = Deno.env.get("lastdate")?.toString().replace("T", " ").replace("Z", "").replaceAll("-", "/");
            secondDate = String(lastyt.value);
            live_link = "https://youtube.com/watch?v=" + lastid;
            break;
    
        case "twitch":
            secondDate = String(lasttw.value);
            live_link = "https://twitch.tv/yumemivt"
            break;
    }
    
    const res = moment.utc(moment(firstDate,"YYYY/MM/DD HH:mm:ss").diff(moment(secondDate,"YYYY/MM/DD HH:mm:ss")));
    
    let months = res.format("MM");
    if (months[0] == "0") {
        months = months.replace("0", "");
        if (months == "0") {
            months = "";
        }
        else {
            months = (Number.parseInt(months) - 1).toString();
            if (Number.parseInt(months) > 1) {
                months = months + " months,";
            }
            else {
                months = months + " month,";
            }
        }
    }
    if (months == "0 month,") {
        months = "";
    }
    let days = res.format("DD");
    if (days[0] == "0") {
        days = days.replace("0", "");
    }

    let hours = res.format("HH");
    if (hours[0] == "0") {
        hours = hours.replace("0", "");
    }

    let minutes = res.format("mm");
    if (minutes[0] == "0") {
        minutes = minutes.replace("0", "");
    }

    let seconds = res.format("ss");
    if (seconds[0] == "0") {
        seconds = seconds.replace("0", "");
    }

    
    const status = Deno.env.get("livestatus");
    if (status == "twitch") {
        return (
            <div class="flex flex-col items-center">
                <p>Yumemi is live!</p>
            </div>
        );
    }
    else if (status == "youtube") {
        return (
            <div class="flex flex-col items-center">
                <p>Yumemi is live!</p>
            </div>
        );
    }
    else if (days == "Invalid date") {
        return (
            <div class="flex flex-col items-center">
                <p>Some error ocurred on the server!</p>
                <p>Maybe api limit was reached</p>
                <p>try reloading the page</p>
            </div>
        );
    }
    else {
        return (
            <div class="flex flex-col items-center">
                <a href={live_link}>{months} {days} days, {hours} hours, {minutes} minutes, {seconds} seconds without Yumemi (on {latest.value})</a>
            </div>
        );
    }
}