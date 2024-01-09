import { render, screen } from "@testing-library/react";
import FilterDrawer from "features/worldView/components/ui-parts/FilterDrawer";
import { WorldViewListProvider } from "providers/WorldViewListProvider";

jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    state: {
      ...jest.requireActual("providers/WorldViewListProvider").useWorldViewListContext().state,
      isOpenFilterDrawer: true,
    },
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
