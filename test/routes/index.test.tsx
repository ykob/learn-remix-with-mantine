/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/react";
import { render } from "../render";
import Index from "../../app/routes/_index";

it("render the page", () => {
  render(<Index />);

  expect(screen.getByRole("heading")).toHaveTextContent(
    "Learn Remix with Mantine"
  );
});
