import { Drawer as MantineDrawer, Title } from "@mantine/core";
import { useAtom, useStore } from "jotai";
import { openDrawerAtom } from "./atom";

export default function Drawer() {
  const [opened] = useAtom(openDrawerAtom);
  const store = useStore();

  const close = () => store.set(openDrawerAtom, false);

  return (
    <MantineDrawer opened={opened} onClose={close}>
      <Title>Drawer</Title>
    </MantineDrawer>
  );
}
