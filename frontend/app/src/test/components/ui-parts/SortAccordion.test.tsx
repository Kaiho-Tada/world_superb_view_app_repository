import { Heading } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortAccordion from "components/ui-parts/SortAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

test("アコーディオンがレンダリングされていること", () => {
  render(
    <SortAccordion>
      <Heading>content</Heading>
    </SortAccordion>
  );
  expect(screen.getByRole("region", { name: "並び替えのアコーディオン" })).toBeInTheDocument();
});

test("アコーディオンボタンがレンダリングされていること", () => {
  render(
    <SortAccordion>
      <Heading>content</Heading>
    </SortAccordion>
  );
  expect(screen.getByRole("button", { name: "並び替え" })).toBeInTheDocument();
});

test("アコーディオンボタン押下で子要素が表示されること", async () => {
  const user = userEvent.setup();
  render(
    <SortAccordion>
      <Heading>content</Heading>
    </SortAccordion>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "並び替え" }));
  });
  expect(screen.getByRole("heading", { name: "content" })).toBeInTheDocument();
});
