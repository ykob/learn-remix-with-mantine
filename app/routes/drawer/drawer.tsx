import { Drawer as MantineDrawer, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { openDrawerAtom } from "./atom";

export default function Drawer() {
  const [opened, setOpened] = useAtom(openDrawerAtom);

  const close = () => setOpened(false);

  return (
    <MantineDrawer opened={opened} onClose={close}>
      <Title>Drawer</Title>
    </MantineDrawer>
  );
}
