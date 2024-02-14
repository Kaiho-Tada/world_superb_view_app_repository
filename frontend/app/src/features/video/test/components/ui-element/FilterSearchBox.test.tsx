import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSearchBox from "features/video/components/ui-element/FilterSearchBox";
import { act } from "react-dom/test-utils";

const mockkeywordDispatch = jest.fn();
const mockShouldDebounceDispatch = jest.fn();

test("サーチボックスがレンダリングされていること", () => {
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels={false}
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("テキストボックスがレンダリングされていること", () => {
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels={false}
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、テキストボックスが非活性になっていること", () => {
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  expect(screen.getByRole("textbox")).toBeDisabled();
});

test("テキストボックスの入力をトリガーにkeywordが更新されること", async () => {
  const user = userEvent.setup();
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels={false}
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  await act(async () => {
    await user.type(screen.getByRole("textbox"), "キー");
  });
  expect(mockkeywordDispatch).toHaveBeenNthCalledWith(1, "キ");
  expect(mockkeywordDispatch).toHaveBeenNthCalledWith(2, "ー");
  expect(mockkeywordDispatch).toHaveBeenCalledTimes(2);
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels={false}
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  await act(async () => {
    await user.type(screen.getByRole("textbox"), "キー");
  });
  expect(mockShouldDebounceDispatch).toHaveBeenNthCalledWith(1, true);
  expect(mockShouldDebounceDispatch).toHaveBeenNthCalledWith(2, true);
  expect(mockShouldDebounceDispatch).toHaveBeenCalledTimes(2);
});

test("クリアボタンがレンダリングされていること", () => {
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels={false}
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  expect(screen.getByRole("img", { name: "クリアボタン" })).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、クリアボタンが非活性になっていること", () => {
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  expect(screen.getByRole("img", { name: "クリアボタン" })).toHaveStyle({ pointerEvents: "none" });
});

test("クリアボタン押下でテキストボックスの文字がリセットされること", async () => {
  const user = userEvent.setup();
  render(
    <FilterSearchBox
      keyword=""
      loadingSearchModels={false}
      keywordDispatch={mockkeywordDispatch}
      shouldDebounceDispatch={mockShouldDebounceDispatch}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("img", { name: "クリアボタン" }));
  });
  expect(mockkeywordDispatch).toHaveBeenCalledWith("");
  expect(mockkeywordDispatch).toHaveBeenCalledTimes(1);
});
