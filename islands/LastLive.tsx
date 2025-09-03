import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { exit } from "node:process";

export default function LastTimer(props: { target: string, last : string, status:string, ytlink:string, twlink:string}) {
  const firstDate = useSignal(moment.utc().format("YYYY/MM/DD HH:mm:ss"));
  const secondDate = props.target;
  let end = useSignal("");

  // Set up an interval to update the `now` date every second with the current
  // date as long as the component is mounted.
  useEffect(() => {
    
    const timer = setInterval(() => {
      firstDate.value = moment.utc().format("YYYY/MM/DD HH:mm:ss");
      const res = moment.utc(
        moment(firstDate.value, "YYYY/MM/DD HH:mm:ss").diff(
          moment(secondDate, "YYYY/MM/DD HH:mm:ss"),
        ),
      );
      let months = res.format("MM");
      if (months[0] == "0") {
        months = months.replace("0", "");
        if (months == "0") {
          months = "";
        } else {
          months = (Number.parseInt(months) - 1).toString();
          if (Number.parseInt(months) > 1) {
            months = months + " months, ";
          } else {
            months = months + " month, ";
          }
        }
      }
      if (months == "0 month, ") {
        months = "";
      }

      let days = res.format("DD");
      if (parseInt(days) > 1) {
        days += " days, ";
      } else {
        days += " day, ";
      }
      if (days[0] == "0") {
        days = "";
      }

      let hours = res.format("HH");
      if (parseInt(hours) > 1) {
        hours += " days, ";
      } else {
        hours += " day, ";
      }
      if (hours[0] == "0") {
        hours = "";
      }

      let minutes = res.format("mm");
      if (parseInt(minutes) > 1) {
        minutes += " minutes, ";
      } else {
        minutes += " minute, ";
      }
      if (minutes[0] == "0") {
        minutes = "";
      }

      let seconds = res.format("ss");
      if (parseInt(seconds) > 1) {
        seconds += " seconds ";
      } else {
        seconds += " second ";
      }
      if (
          props.status == "Youtube" || props.status == "Twitch" ||
          props.status == "Youtube|Twitch"
        ) {
            end.value = `<div class="flex flex-col items-center">
                  <p>Yumemi is live!</p>
              </div>`;
        } else if (days == "Invalid date") {
            end.value =  `<div class="flex flex-col items-center">
                  <p>Some error ocurred on the server!</p>
                  <p>Maybe api limit was reached</p>
                  <p>try reloading the page</p>
              </div>`;
        } else {
          let live_link = "";
          switch (props.last) {
            case "youtube":
              live_link = "https://youtube.com/" + props.ytlink;
              break;
            case "twitch":
              live_link = "https://twitch.tv/" + props.twlink;
              break;
          }
          end.value = `<div class="flex flex-col items-center">
                  <a href=` + live_link + `>` + months + days + hours + minutes +
            seconds + ` without Yumemi</a>
                  </div>`;
        }
    }, 1000);
    return () => clearInterval(timer);
  }, [props.target]);
  return <div dangerouslySetInnerHTML={{ __html:  end.value}}></div>
}