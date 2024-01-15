import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCheckBox from "features/worldView/components/ui-elements/CategoryCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    loadingSearchWorldViews: false,
    loadingCategoryCheckBoxItems: false,
    categoryCheckBoxItems: [
      { label: "滝", parentLabel: "自然", checked: false },
      { label: "塩湖", parentLabel: "自然", checked: false },
      { label: "廃墟", parentLabel: "人工", checked: false },
    ],
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    categoryCheckBoxItems: [
      { label: "滝", parentLabel: "自然", checked: true },
      { label: "塩湖", parentLabel: "自然", checked: true },
      { label: "廃墟", parentLabel: "人工", checked: true },
    ],
  },
};

const mockContextValueLoadingSearchWorldViews = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

const mockContextValueLoadingCategoryCheckBoxItems = {
  state: {
    ...mockContextValue.state,
    loadingCategoryCheckBoxItems: true,
  },
};

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "人工" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "廃墟" })).toBeInTheDocument();
});

test("categoryCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "人工" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "滝" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "廃墟" })).not.toBeChecked();
});

test("categoryCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "廃墟" })).toBeChecked();
});

test("カテゴリーのCheckboxが全てチェックされている場合、分類のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "人工" })).toBeChecked();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "人工" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "滝" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "廃墟" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "人工" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "廃墟" })).toBeDisabled();
});

test("loadingCategoryCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(
    () => mockContextValueLoadingCategoryCheckBoxItems
  );
  render(<CategoryCheckBox />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("親のCheckBox押下でhandleChangeParentCheckBox関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const spyOnHandleChangeParentCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeParentCheckBox"),
    "default"
  );

  const user = userEvent.setup();
  render(<CategoryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "自然" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(spyOnHandleChangeParentCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "自然" }) }),
      checkBoxItems: [
        { label: "滝", parentLabel: "自然", checked: false },
        { label: "塩湖", parentLabel: "自然", checked: false },
        { label: "廃墟", parentLabel: "人工", checked: false },
      ],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});

test("カテゴリーのcheckbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CategoryCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "滝" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CATEGORY_CHECKBOX_ITEMS",
    payload: expect.any(Array),
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_CATEGORY_LABELS",
    payload: expect.any(Array),
  });
});

test("カテゴリーのcheckbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);

  const spyOnHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeCheckBox"),
    "default"
  );

  const user = userEvent.setup();
  render(<CategoryCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "滝" }));
  });

  expect(spyOnHandleChangeCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "滝" }) }),
      checkBoxItems: [
        { label: "滝", parentLabel: "自然", checked: false },
        { label: "塩湖", parentLabel: "自然", checked: false },
        { label: "廃墟", parentLabel: "人工", checked: false },
      ],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});
