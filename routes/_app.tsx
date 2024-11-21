import { type PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, target-densitydpi=device-dpi, initial-scale=0, maximum-scale=1, user-scalable=yes" />
        <title>I Miss Yumemi</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body f-client-nav style="background-color:#d1aaf3; height:100%;">
        <Partial name="body">
            <Component />
        </Partial>
      </body>
    </html>
  );
}
