import { Container, Flex, Grid, Title } from "@mantine/core";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMemos } from "~/data";
import { MemoCreateForm, MemoCard } from "~/components/ui/";

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
    <Container size="xl" pt="xl" pb="xl">
      <Title mb="xl" c="white">
        Memo
      </Title>
      <Grid columns={2} gutter="xl">
        <Grid.Col span={{ base: 2, md: 1 }}>
          <MemoCreateForm />
        </Grid.Col>
        <Grid.Col span={{ base: 2, md: 1 }}>
          <Flex direction="column" gap="lg">
            {memos.map((o) => (
              <MemoCard key={o.id} memo={o} />
            ))}
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
