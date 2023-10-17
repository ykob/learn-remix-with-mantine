/**
 * @jest-environment jsdom
 */

import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import Index from "../../app/routes/_index";

it("render the page", () => {
  render(
    <MantineProvider>
      <Index />
    </MantineProvider>
  );

  expect(screen.getByRole("heading")).toHaveTextContent(
    "Learn Remix with Mantine"
  );
});
