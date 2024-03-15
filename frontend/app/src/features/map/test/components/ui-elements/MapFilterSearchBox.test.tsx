import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapFilterSearchBox from "features/map/components/ui-elements/MapFilterSearchBox";
import { act } from "react-dom/test-utils";

const mockSetKeywordDispatch = jest.fn();
const mockSetShouldDebounceDispatch = jest.fn();

test("サーチボックスがレンダリングされていること", () => {
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("テキストボックスがレンダリングされていること", () => {
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、テキストボックスが非活性になっていること", () => {
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  expect(screen.getByRole("textbox")).toBeDisabled();
});

test("引数のplaceholderが表示されていること", () => {
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder="作品名で絞り込み"
    />
  );
  expect(screen.getByPlaceholderText("作品名で絞り込み")).toBeInTheDocument();
});

test("テキストボックスの入力をトリガーにkeywordが更新されること", async () => {
  const user = userEvent.setup();
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  await act(async () => {
    await user.type(screen.getByRole("textbox"), "キーワード");
  });

  expect(mockSetKeywordDispatch).toHaveBeenNthCalledWith(1, "キ");
  expect(mockSetKeywordDispatch).toHaveBeenNthCalledWith(2, "ー");
  expect(mockSetKeywordDispatch).toHaveBeenNthCalledWith(3, "ワ");
  expect(mockSetKeywordDispatch).toHaveBeenNthCalledWith(4, "ー");
  expect(mockSetKeywordDispatch).toHaveBeenNthCalledWith(5, "ド");
  expect(mockSetKeywordDispatch).toHaveBeenCalledTimes(5);
});

test("キーワード更新の際にshouldDebounceがtrueに更新されること", async () => {
  const user = userEvent.setup();
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  await act(async () => {
    await user.type(screen.getByRole("textbox"), "キーワード");
  });
  expect(mockSetShouldDebounceDispatch).toHaveBeenCalledWith(true);
  expect(mockSetShouldDebounceDispatch).toHaveBeenCalledTimes(5);
});

test("クリアボタンがレンダリングされていること", () => {
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  expect(screen.getByRole("button", { name: "クリアボタン" })).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、クリアボタンが非活性になっていること", () => {
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  expect(screen.getByRole("button", { name: "クリアボタン" })).toHaveStyle({
    pointerEvents: "none",
  });
});

test("クリアボタン押下でテキストボックスの文字がリセットされること", async () => {
  const user = userEvent.setup();
  render(
    <MapFilterSearchBox
      keyword=""
      loadingSearchModels={false}
      setKeywordDispatch={mockSetKeywordDispatch}
      setShouldDebounceDispatch={mockSetShouldDebounceDispatch}
      placeholder=""
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "クリアボタン" }));
  });
  expect(mockSetKeywordDispatch).toHaveBeenCalledWith("");
  expect(mockSetKeywordDispatch).toHaveBeenCalledTimes(1);
});
