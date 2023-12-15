import { render, screen } from "@testing-library/react";
import FilterDrawer from "components/organisms/FilterDrawer";
import { WorldViewListProvider } from "hooks/providers/WorldViewListProvider";

jest.mock("hooks/providers/WorldViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    ...jest.requireActual("hooks/providers/WorldViewListProvider").useWorldViewListContext(),
    isOpenFilterDrawer: true,
  }),
}));

test("isOpenFilterDrawerの値がtrueの場合、FilterDrawerAccordionがレンダリングされていること", () => {
  render(
    <WorldViewListProvider>
      <FilterDrawer />
    </WorldViewListProvider>
  );
  expect(screen.getByRole("region", { name: "FilterDrawerAccordion" })).toBeInTheDocument();
});
