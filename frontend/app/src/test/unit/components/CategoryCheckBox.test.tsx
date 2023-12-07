import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCheckBox from "components/molecules/CategoryCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockContextValue = {
  loadingSearchSuperbViews: false,
  loadingCategoriesWithCheckBoxData: false,
  categoriesWithCheckBoxData: [
    {
      label: "滝",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...mockContextValue,
  categoriesWithCheckBoxData: [
    {
      label: "滝",
      classification: "自然",
      superbViewNames: ["superbView1", "superbView2"],
      checked: true,
    },
  ],
};

const mockContextValueLoadingSearchSuperbViews = {
  ...mockContextValue,
  loadingSearchSuperbViews: true,
};

const mockContextValueLoadingCategoriesWithCheckBoxData = {
  ...mockContextValue,
  loadingCategoriesWithCheckBoxData: true,
};

const mockHandleChangeCategory = jest.fn();
jest.mock("hooks/api/category/useCategoryHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChangeCategory: mockHandleChangeCategory }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox categoryClassification="自然" />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "滝" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "滝" })).not.toBeDisabled();
});

test("categoriesWithCheckBoxDataのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
  render(<CategoryCheckBox categoryClassification="自然" />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeChecked();
});

test("loadingSearchSuperbViewsがtureの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSearchSuperbViews);
  render(<CategoryCheckBox categoryClassification="自然" />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeDisabled();
});

test("loadingCategoriesWithCheckBoxDataがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(
    () => mockContextValueLoadingCategoriesWithCheckBoxData
  );
  render(<CategoryCheckBox categoryClassification="自然" />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("categoriesWithCheckBoxDataのclassificationとpropsで渡されたcategoryClassificationの値が異なる場合、レンダリングされないこと", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<CategoryCheckBox categoryClassification="人工" />);
  expect(screen.queryByRole("checkbox", { name: "滝" })).not.toBeInTheDocument();
});

test("CheckBox押下でhandleChangeCategory関数が実行されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CategoryCheckBox categoryClassification="自然" />);
  const CheckBox = screen.getByRole("checkbox", { name: "滝" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeCategory).toHaveBeenCalledTimes(1);
});
