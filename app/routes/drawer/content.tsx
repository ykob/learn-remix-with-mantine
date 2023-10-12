import { Button, Card, Container, Flex, Title } from "@mantine/core";
import { useStore } from "jotai";
import { openDrawerAtom } from "./atom";

export default function Content() {
  const store = useStore();

  const open = () => store.set(openDrawerAtom, true);

  return (
    <Container size="sm" pt="xl" pb="xl">
      <Card padding="lg" shadow="sm">
        <Flex direction="column" align="center" gap="md">
          <Title>Drawer</Title>
          <Button onClick={open}>Toggle Drawer</Button>
        </Flex>
      </Card>
    </Container>
  );
}
