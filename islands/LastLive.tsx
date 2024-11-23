import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

export default function LastLive() {
    const firstDate = moment.utc().format("YYYY/MM/DD HH:mm:ss");
    const secondDate = Deno.env.get("lastdate")?.toString().replace("T", " ").replace("Z", "").replaceAll("-", "/");
    const res = moment.utc(moment(firstDate,"YYYY/MM/DD HH:mm:ss").diff(moment(secondDate,"YYYY/MM/DD HH:mm:ss")));
    
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

    const lastid = Deno.env.get("lastid");
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
                <a href={"https://youtube.com/watch?v=" + lastid}>{days} days, {hours} hours, {minutes} minutes, {seconds} seconds without Yumemi (on YouTube)</a>
            </div>
        );
    }
}