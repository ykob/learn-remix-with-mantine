import { type MetaFunction } from "@remix-run/node";
import { createStore, Provider } from "jotai";
import Content from "./content";
import Drawer from "./drawer";

const store = createStore();

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function DrawerIndex() {
  return (
    <Provider store={store}>
      <Content />
      <Drawer />
    </Provider>
  );
}
