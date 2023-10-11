import { Button, Card, Flex, Text, Textarea } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { type action as createMemoAction } from "~/routes/memo.create/route";

export default function MemoCreateForm() {
  const fetcher = useFetcher<typeof createMemoAction>();
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
    <fetcher.Form method="post" ref={form} action="/memo/create/">
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
          {fetcher.data?.error && <Text c="red">{fetcher.data?.error}</Text>}
          <Button type="submit" loading={fetcher.state === "submitting"}>
            Submit
          </Button>
        </Flex>
      </Card>
    </fetcher.Form>
  );
}
