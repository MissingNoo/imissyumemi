import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  const joke = "";
  return <div>Hello {joke}</div>;
}
