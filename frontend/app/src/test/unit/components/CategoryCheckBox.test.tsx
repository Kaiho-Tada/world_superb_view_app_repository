import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCheckBox from "components/molecules/CategoryCheckBox";
import { act } from "react-dom/test-utils";

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    loadingSearchSuperbViews: false,
    getAllCategoriesWithCheckBoxData: jest.fn(),
    loadingCategoriesWithCheckBoxData: false,
    categoriesWithCheckBoxData: [
      {
        label: "滝",
        classification: "自然",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
  }),
}));
const mockHandleChange = jest.fn();
jest.mock("hooks/api/category/useCategoryCheckBoxHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChange: mockHandleChange }),
}));

test("CheckBoxがレンダリングされていること", () => {
  render(<CategoryCheckBox categoryClassification="自然" />);
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
});

test("categoriesWithCheckBoxDataのclassificationとpropsで渡されたcategoryClassificationの値が異なる場合、レンダリングされないこと", () => {
  render(<CategoryCheckBox categoryClassification="人工" />);
  expect(screen.queryByRole("checkbox", { name: "滝" })).not.toBeInTheDocument();
});

test("CheckBox押下でhandleChange関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<CategoryCheckBox categoryClassification="自然" />);
  const CheckBox = screen.getByRole("checkbox", { name: "滝" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
});
