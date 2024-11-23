import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

export default function LastLive() {
    let firstDate = moment.utc().format("YYYY/MM/DD HH:mm:ss");
    let secondDate = Deno.env.get("lastdate")?.toString().replace("T", " ").replace("Z", "").replaceAll("-", "/");
    let res = moment.utc(moment(firstDate,"YYYY/MM/DD HH:mm:ss").diff(moment(secondDate,"YYYY/MM/DD HH:mm:ss")));
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
    let lastid = Deno.env.get("lastid");
    if (Deno.env.get("livestatus") == "twitch") {
        return (
            <div class="flex flex-col items-center">
                <p>Yumemi is live!</p>
            </div>
        );
    }
    else {
        return (
            <div class="flex flex-col items-center">
                <a href={"https://youtube.com/watch?v=" + lastid}>{days} days, {hours} hours, {minutes} minutes, {seconds} seconds without Yumemi (on YouTube)</a>
            </div>
        );
    }
}