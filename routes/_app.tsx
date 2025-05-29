import Socials from "../islands/Socials.tsx";
import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
      	<meta http-equiv="refresh" content="0; url=http://imissyumemi.337494.xyz/" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>imissyumemi</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-[#DB95EE]">
        <Component />
      </body>
      <footer>
      </footer>
    </html>
  );
}
