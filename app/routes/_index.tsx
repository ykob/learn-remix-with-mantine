import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { getMemos } from "~/data";
import { MemoCard } from "~/components/ui/";
import { type action as createMemoAction } from "./memo.create";

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
  const fetcher = useFetcher<typeof createMemoAction>();
  const { memos } = useLoaderData<typeof loader>();
  const form = useRef<HTMLFormElement>(null);

  useEffect(
    function resetFormOnSuccess() {
      if (fetcher.state === "idle" && fetcher.data?.success) {
        form.current?.reset();
      }
    },
    [fetcher.state, fetcher.data]
  );

  return (
    <Container size="xl" pt="xl" pb="xl">
      <Title mb="xl" c="white">
        Memo
      </Title>
      <Grid columns={2}>
        <Grid.Col span={{ base: 2, md: 1 }}>
          <fetcher.Form method="post" ref={form} action="/memo/create">
            <Card padding="lg" shadow="sm">
              <Flex direction="column" gap="lg">
                <Textarea
                  label="Add a memo"
                  name="text"
                  styles={{
                    input: {
                      height: "240px",
                    },
                  }}
                />
                {fetcher.data?.error && (
                  <Text c="red">{fetcher.data?.error}</Text>
                )}
                <Button type="submit" loading={fetcher.state !== "idle"}>
                  Submit
                </Button>
              </Flex>
            </Card>
          </fetcher.Form>
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
