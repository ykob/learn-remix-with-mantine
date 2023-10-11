import { Button, Card, Container, Drawer, Flex, Title } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function DrawerIndex() {
  const [opened, setOpened] = useState(false);
  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return (
    <>
      <Container size="sm" pt="xl" pb="xl">
        <Card padding="lg" shadow="sm">
          <Flex direction="column" align="center" gap="md">
            <Title>Drawer</Title>
            <Button onClick={open}>Toggle Drawer</Button>
          </Flex>
        </Card>
      </Container>
      <Drawer opened={opened} onClose={close}>
        <Title>Drawer</Title>
      </Drawer>
    </>
  );
}
