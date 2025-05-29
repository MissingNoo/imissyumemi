export const youtube_channel_id: string = "UC2X643A7Hu0sqeet_wcJ-0g";
export const youtube_channel_link: string = "@yumemivt";
export const twitch_channel_id: string = "yumemivt";
export const base_url: string = "http://192.168.0.105:8000";
//export const youtube_channel_id = "UC_WC6plpIdL_buebR9vSVkg";
//export const twitch_channel_id = "alanzoka";
import { MongoClient } from "npm:mongodb@6.1.0";
const client = new MongoClient("mongodb://192.168.0.105:27017");
//const client = new MongoClient("mongodb://0.tcp.sa.ngrok.io:15005");
import { createClient } from "npm:redis@^4.5";
export const redis = createClient({
	  url: "redis://localhost:6379",
});

await client.connect();
await redis.connect();
export const db = client.db("yumemi");
export interface Hiccups {
  _id: string;
  vtuber: string;
  yumemi: number;
  global: number;
}
export const hiccupscol = db.collection<Hiccups>("Hiccups");
/*export const kv = await Deno.openKv(
  "https://api.deno.com/databases/bf8227ba-a33f-4a47-9e9a-239fd39426e9/connect",
);*/
//export const kv = await Deno.openKv();
