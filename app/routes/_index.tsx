import { Card, CloseButton, Container, Flex, Text, Title } from "@mantine/core";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMemos } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const memos = await getMemos();
  return json({ memos });
};

export default function Index() {
  const { memos } = useLoaderData<typeof loader>();
  return (
    <Container size="sm" pt="xl" pb="xl">
      <Title mb="xl" c="white">
        Memo
      </Title>
      <Flex direction="column" gap="lg">
        {memos.map((o) => (
          <Card key={o.id} padding="lg" shadow="sm">
            <Flex gap="md">
              <Text>{o.text}</Text>
              <CloseButton />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Container>
  );
}
