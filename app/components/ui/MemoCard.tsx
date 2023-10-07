import { Card, CloseButton, Flex, Text } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { type MemoRecord } from "~/data";

export default function MemoCard({ memo }: { memo: MemoRecord }) {
  const fetcher = useFetcher();

  const handleDelete = async () => {
    await fetcher.submit(null, {
      method: "delete",
      action: `memo/${memo.id}/destroy/`,
    });
  };

  return (
    <Card padding="lg" shadow="sm">
      <Flex gap="md" justify="space-between">
        <Flex direction="column" gap="md">
          <Text>{memo.text}</Text>
          <Text c="gray" size="xs">
            {memo.createdAt}
          </Text>
        </Flex>
        <CloseButton onClick={handleDelete} type="submit" />
      </Flex>
    </Card>
  );
}
