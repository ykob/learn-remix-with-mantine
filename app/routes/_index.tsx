import { Container, Title } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Container size="xl" pt="xl" pb="xl">
      <Title mb="xl" c="white">
        Learn Remix with Mantine
      </Title>
    </Container>
  );
}
