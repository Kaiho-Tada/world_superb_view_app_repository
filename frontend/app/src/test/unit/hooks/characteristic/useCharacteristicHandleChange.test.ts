import { renderHook } from "@testing-library/react";
import useCharacteristicHandleChange from "hooks/characteristic/useCharacteristicHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValueCheckedFalse = {
  dispatch: mockDispatch,
  state: {
    characteristicCheckBoxItems: [
      {
        label: "幻想・神秘的",
        checked: false,
      },
    ],
  },
};

const mockContextValueCheckedTrue = {
  dispatch: mockDispatch,
  state: {
    characteristicCheckBoxItems: [
      {
        label: "幻想・神秘的",
        checked: true,
      },
    ],
  },
};

describe("handleChangeCharacteristic関数の挙動のテスト", () => {
  test("characteristicCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useCharacteristicHandleChange());
    const mockEvent = { target: { value: "幻想・神秘的" } };
    act(() => {
      result.current.handleChangeCharacteristic(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: [
        {
          label: "幻想・神秘的",
          checked: true,
        },
      ],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_CHARACTERISTIC_LABELS",
      payload: ["幻想・神秘的"],
    });
  });

  test("characteristicCheckBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useCharacteristicHandleChange());
    const mockEvent = { target: { value: "幻想・神秘的" } };
    act(() => {
      result.current.handleChangeCharacteristic(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
      payload: [
        {
          label: "幻想・神秘的",
          checked: false,
        },
      ],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHECKED_CHARACTERISTIC_LABELS",
      payload: [],
    });
  });
});
