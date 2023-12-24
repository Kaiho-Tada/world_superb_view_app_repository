import { renderHook } from "@testing-library/react";
import useBmiHandleChange from "hooks/bmi/useBmiHandleChange";
import { useWorldViewListContext as useWorldViewListContextMock } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

jest.mock("hooks/providers/WorldViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/WorldViewListProvider"),
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  state: { bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }] },
  dispatch: mockDispatch,
};

const mockContextValueChecked = {
  state: { bmiCheckBoxItems: [{ label: "0%〜10%", checked: true }] },
  dispatch: mockDispatch,
};

describe("e.target.valueとbmiCheckBoxItemsのlabelプロパティの値が同じである場合", () => {
  test("bmiCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValue);
    const { result } = renderHook(() => useBmiHandleChange());
    const mockEvent = { target: { value: "0%〜10%" } };
    act(() => {
      result.current.handleChangeBmi(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BMI_CHECKBOX_ITEMS",
      payload: [{ label: "0%〜10%", checked: true }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_BMI_LABELS",
      payload: ["0%〜10%"],
    });
  });

  test("bmiCheckBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
    (useWorldViewListContextMock as jest.Mock).mockImplementation(() => mockContextValueChecked);
    const { result } = renderHook(() => useBmiHandleChange());
    const mockEvent = { target: { value: "0%〜10%" } };
    act(() => {
      result.current.handleChangeBmi(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BMI_CHECKBOX_ITEMS",
      payload: [{ label: "0%〜10%", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_BMI_LABELS",
      payload: [],
    });
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
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BMI_CHECKBOX_ITEMS",
      payload: [{ label: "0%〜10%", checked: false }],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_BMI_LABELS",
      payload: [],
    });
  });
});
