import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

export default function LastLive() {
    let firstDate = moment.utc().format("YYYY/MM/DD HH:mm:ss");
    let secondDate = Deno.env.get("lastdate")?.toString().replace("T", " ").replace("Z", "").replaceAll("-", "/");
    let res = moment.utc(moment(firstDate,"YYYY/MM/DD HH:mm:ss").diff(moment(secondDate,"YYYY/MM/DD HH:mm:ss"))).format("HH:mm:ss");
    let lastid = Deno.env.get("lastid");
    return (
        <div class="flex flex-col items-center">
            <p>Time since last stream</p>
            <a href={"https://youtube.com/watch?v=" + lastid}>{res}</a>
        </div>
    );
}