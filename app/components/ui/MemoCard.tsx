import { Card, CloseButton, Flex, Text } from "@mantine/core";
import { Form } from "@remix-run/react";
import { type MemoRecord } from "~/data";

export default function MemoCard({ memo }: { memo: MemoRecord }) {
  return (
    <Card padding="lg" shadow="sm">
      <Flex gap="md" justify="space-between">
        <Flex direction="column" gap="md">
          <Text>{memo.text}</Text>
          <Text c="gray" size="xs">
            {memo.createdAt}
          </Text>
        </Flex>
        <Form method="delete" action={`memo/${memo.id}/destroy`}>
          <CloseButton type="submit" />
        </Form>
      </Flex>
    </Card>
  );
}
