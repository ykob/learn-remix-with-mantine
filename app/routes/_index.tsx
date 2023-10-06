import {
  Button,
  Card,
  CloseButton,
  Container,
  Flex,
  Grid,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createNewMemo, getMemos } from "~/data";

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

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  let error = null;
  let memo = null;
  let success = false;

  try {
    memo = await createNewMemo(updates);
    success = true;
  } catch (e) {
    error = e instanceof Error ? e.message : "Occuered unknown error.";
  }
  return json({
    error,
    memo,
    success,
  });
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const { memos } = useLoaderData<typeof loader>();
  const form = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "idle" && actionData?.success) {
        form.current?.reset();
      }
    },
    [navigation.state, actionData]
  );

  return (
    <Container size="xl" pt="xl" pb="xl">
      <Title mb="xl" c="white">
        Memo
      </Title>
      <Grid columns={2}>
        <Grid.Col span={{ base: 2, md: 1 }}>
          <Form method="post" ref={form}>
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
                {actionData?.error && <div>{actionData?.error}</div>}
                <Button type="submit">Submit</Button>
              </Flex>
            </Card>
          </Form>
        </Grid.Col>
        <Grid.Col span={{ base: 2, md: 1 }}>
          <Flex direction="column" gap="lg">
            {memos.map((o) => (
              <Card key={o.id} padding="lg" shadow="sm">
                <Flex gap="md" justify="space-between">
                  <Flex direction="column" gap="md">
                    <Text>{o.text}</Text>
                    <Text c="gray" size="xs">
                      {o.createdAt}
                    </Text>
                  </Flex>
                  <CloseButton />
                </Flex>
              </Card>
            ))}
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
