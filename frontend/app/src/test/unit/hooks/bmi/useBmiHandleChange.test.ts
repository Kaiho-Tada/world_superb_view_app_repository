import { renderHook } from "@testing-library/react";
import useBmiHandleChange from "hooks/bmi/useBmiHandleChange";
import { useWorldViewListContext as useWorldViewListContextMock } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const mockSetBmiCheckBoxItems = jest.fn();
const mockSetCheckedBmiLabels = jest.fn();
jest.mock("hooks/providers/WorldViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/WorldViewListProvider"),
  useWorldViewListContext: jest.fn(),
}));

const mockContextValue = {
  bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
  setBmiCheckBoxItems: mockSetBmiCheckBoxItems,
  setCheckedBmiLabels: mockSetCheckedBmiLabels,
};

const mockContextValueChecked = {
  bmiCheckBoxItems: [{ label: "0%〜10%", checked: true }],
  setBmiCheckBoxItems: mockSetBmiCheckBoxItems,
  setCheckedBmiLabels: mockSetCheckedBmiLabels,
};

describe("e.target.valueとbmiCheckBoxItemsのlabelプロパティの値が同じである場合", () => {
  test("bmiCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useBmiHandleChange());
    const mockEvent = { target: { value: "0%〜10%" } };
    act(() => {
      result.current.handleChangeBmi(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetBmiCheckBoxItems).toHaveBeenCalledWith([{ label: "0%〜10%", checked: true }]);
    expect(mockSetBmiCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedBmiLabels).toHaveBeenCalledWith(["0%〜10%"]);
    expect(mockSetCheckedBmiLabels).toHaveBeenCalledTimes(1);
  });

  test("bmiCheckBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
    (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValueChecked);
    const { result } = renderHook(() => useBmiHandleChange());
    const mockEvent = { target: { value: "0%〜10%" } };
    act(() => {
      result.current.handleChangeBmi(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetBmiCheckBoxItems).toHaveBeenCalledWith([{ label: "0%〜10%", checked: false }]);
    expect(mockSetBmiCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedBmiLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedBmiLabels).toHaveBeenCalledTimes(1);
  });
});

describe("e.target.valueとbmiCheckBoxItemsのlabelプロパティの値が異なる場合", () => {
  test("bmiCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useBmiHandleChange());
    const mockEvent = { target: { value: "20%〜30%" } };
    act(() => {
      result.current.handleChangeBmi(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetBmiCheckBoxItems).toHaveBeenCalledWith([{ label: "0%〜10%", checked: false }]);
    expect(mockSetBmiCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedBmiLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedBmiLabels).toHaveBeenCalledTimes(1);
  });
});
