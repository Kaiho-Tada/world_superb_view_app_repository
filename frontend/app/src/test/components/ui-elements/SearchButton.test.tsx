import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchButton from "components/ui-elements/SearchButton";
import { act } from "react-dom/test-utils";

const mockhandleClick = jest.fn();

test("SearchButtonがレンダリングされていること", () => {
  const { getByRole } = render(
    <SearchButton handleClick={mockhandleClick} loadingSearchModels={false} disabled={false} />
  );
  expect(getByRole("button", { name: "検索" })).toBeInTheDocument();
});

test("loadingSearchModelsがtureの場合、SearchButtonが非活性であること", () => {
  const { getByRole } = render(
    <SearchButton handleClick={mockhandleClick} loadingSearchModels disabled={false} />
  );
  expect(getByRole("button", { name: "検索" })).toHaveStyle({
    opacity: 0.5,
    pointerEvents: "none",
  });
});

test("loadingSearchModelsがtureの場合、SearchButtonが非活性であること", () => {
  const { getByRole } = render(
    <SearchButton handleClick={mockhandleClick} loadingSearchModels={false} disabled />
  );
  expect(getByRole("button", { name: "検索" })).toHaveStyle({
    opacity: 0.5,
    pointerEvents: "none",
  });
});

test("SearchButton押下でhandleClick関数が呼び出されること", async () => {
  const user = userEvent.setup();
  const { getByRole } = render(
    <SearchButton handleClick={mockhandleClick} loadingSearchModels={false} disabled={false} />
  );
  await act(async () => {
    await user.click(getByRole("button", { name: "検索" }));
  });
  expect(mockhandleClick).toHaveBeenCalledTimes(1);
});
