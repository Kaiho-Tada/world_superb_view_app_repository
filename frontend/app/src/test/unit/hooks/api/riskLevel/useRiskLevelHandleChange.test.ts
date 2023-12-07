import { renderHook } from "@testing-library/react";
import useRiskLevelHandleChange from "hooks/api/riskLevel/useRiskLevelHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const mockSetRiskLevels = jest.fn();
const mockSetCheckedRiskLevelLabels = jest.fn();

const mockContextValueCheckedFalse = {
  setRiskLevels: mockSetRiskLevels,
  setCheckedRiskLevelLabels: mockSetCheckedRiskLevelLabels,
  riskLevels: [
    {
      label: "4",
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  setRiskLevels: mockSetRiskLevels,
  setCheckedRiskLevelLabels: mockSetCheckedRiskLevelLabels,
  riskLevels: [
    {
      label: "4",
      checked: true,
    },
  ],
};

describe("handleChangeRiskLevel関数の挙動のテスト", () => {
  test("categoriesWithCheckBoxDataのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useRiskLevelHandleChange());
    const mockEvent = { target: { value: "4" } };
    act(() => {
      result.current.handleChangeRiskLevel(mockEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(mockSetRiskLevels).toHaveBeenCalledWith([
      {
        label: "4",
        checked: true,
      },
    ]);
    expect(mockSetRiskLevels).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledWith(["4"]);
    expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledTimes(1);
  });

  test("categoriesWithCheckBoxDataのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useRiskLevelHandleChange());
    const mockEvent = { target: { value: "4" } };
    act(() => {
      result.current.handleChangeRiskLevel(mockEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(mockSetRiskLevels).toHaveBeenCalledWith([
      {
        label: "4",
        checked: false,
      },
    ]);
    expect(mockSetRiskLevels).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedRiskLevelLabels).toHaveBeenCalledTimes(1);
  });
});
