import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacteristicCheckBox from "components/molecules/CharacteristicCheckBox";
import { act } from "react-dom/test-utils";

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    loadingSearchSuperbViews: false,
    getAllCharacteristicsWithCheckBoxData: jest.fn(),
    loadingCharacteristicsWithCheckBoxData: false,
    characteristicsWithCheckBoxData: [
      {
        label: "雄大",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
  }),
}));
const mockHandleChange = jest.fn();
jest.mock("hooks/api/characteristic/useCharacteristicCheckBoxHandleChange", () => ({
  __esModule: true,
  default: () => ({ handleChange: mockHandleChange }),
}));

test("CheckBoxがレンダリングされていること", () => {
  render(<CharacteristicCheckBox />);
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeInTheDocument();
});

test("CheckBox押下でhandleChange関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<CharacteristicCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "雄大" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
});
