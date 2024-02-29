import { Heading } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordion from "components/ui-parts/FilterAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

test("アコーディオンがレンダリングされていること", () => {
  render(
    <FilterAccordion>
      <Heading>Content</Heading>
    </FilterAccordion>
  );
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("アコーディオンボタンがレンダリングされていること", () => {
  render(
    <FilterAccordion>
      <Heading>Content</Heading>
    </FilterAccordion>
  );
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
});

test("アコーディオンボタン押下で子要素が表示されること", async () => {
  const user = userEvent.setup();
  render(
    <FilterAccordion>
      <Heading>Content</Heading>
    </FilterAccordion>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(screen.getByRole("heading", { name: "Content" })).toBeInTheDocument();
});
