import { Card, Container, Grid, Title } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

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
      <Grid columns={12} gutter="sm">
        <Grid.Col span={{ base: 6, sm: 4, md: 3 }}>
          <Link to="/drawer">
            <Card padding="lg" shadow="sm">
              Drawer
            </Card>
          </Link>
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 4, md: 3 }}>
          <Link to="/memo">
            <Card padding="lg" shadow="sm">
              Memo
            </Card>
          </Link>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
