import { render, screen } from "@testing-library/react";
import FilterDrawer from "components/organisms/FilterDrawer";
import { SuperbViewListProvider } from "hooks/providers/SuperbViewListProvider";

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext(),
    isOpenFilterDrawer: true,
  }),
}));

test("isOpenFilterDrawerの値がtrueの場合、FilterDrawerAccordionがレンダリングされていること", () => {
  render(
    <SuperbViewListProvider>
      <FilterDrawer />
    </SuperbViewListProvider>
  );
  expect(screen.getByRole("region", { name: "FilterDrawerAccordion" })).toBeInTheDocument();
});
