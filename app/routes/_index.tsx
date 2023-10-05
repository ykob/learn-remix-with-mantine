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
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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
    <Container size="xl" pt="xl" pb="xl">
      <Title mb="xl" c="white">
        Memo
      </Title>
      <Grid columns={2}>
        <Grid.Col span={{ base: 2, md: 1 }}>
          <Form>
            <Card padding="lg" shadow="sm">
              <Flex direction="column" gap="lg">
                <Textarea
                  label="Add a memo"
                  styles={{
                    input: {
                      height: "240px",
                    },
                  }}
                />
                <Button>Submit</Button>
              </Flex>
            </Card>
          </Form>
        </Grid.Col>
        <Grid.Col span={{ base: 2, md: 1 }}>
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
        </Grid.Col>
      </Grid>
    </Container>
  );
}
