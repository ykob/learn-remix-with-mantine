import { type MetaFunction } from "@remix-run/node";
import Content from "./content";
import Drawer from "./drawer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function DrawerIndex() {
  return (
    <>
      <Content />
      <Drawer />
    </>
  );
}
