import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCheckBox from "components/molecules/CategoryCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockContextValue = {
  loadingSearchWorldViews: false,
  loadingCategoryCheckBoxItems: false,
  categoryCheckBoxItems: [
    {
      label: "滝",
      classification: "自然",
      checked: false,
    },
    {
      label: "塩湖",
      classification: "自然",
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...mockContextValue,
  categoryCheckBoxItems: [
    {
      label: "滝",
      classification: "自然",
      checked: true,
    },
    {
      label: "塩湖",
      classification: "自然",
      checked: true,
    },
  ],
};

const mockContextValueLoadingSearchWorldViews = {
  ...mockContextValue,
  loadingSearchWorldViews: true,
};

const mockContextValueLoadingCategoryCheckBoxItems = {
  ...mockContextValue,
  loadingCategoryCheckBoxItems: true,
};

const mockHandleChangeClassification = jest.fn();
const mockHandleChangeCategory = jest.fn();
jest.mock("hooks/api/category/useCategoryHandleChange", () => ({
  __esModule: true,
  default: () => ({
    handleChangeClassification: mockHandleChangeClassification,
    handleChangeCategory: mockHandleChangeCategory,
  }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).toBeInTheDocument();
});

test("categoryCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "滝" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).not.toBeChecked();
});

test("categoryCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "人工" })).toBeChecked();
});

test("カテゴリーのCheckboxが全てチェックされている場合、分類のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeChecked();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "自然" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "滝" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "塩湖" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<CategoryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeDisabled();
});

test("loadingCategoryCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(
    () => mockContextValueLoadingCategoryCheckBoxItems
  );
  render(<CategoryCheckBox />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("分類のCheckBox押下でhandleChangeClassification関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CategoryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "自然" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeClassification).toHaveBeenCalledTimes(1);
});

test("カテゴリーのCheckBox押下でhandleChangeCategory関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CategoryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "滝" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeCategory).toHaveBeenCalledTimes(1);
});
