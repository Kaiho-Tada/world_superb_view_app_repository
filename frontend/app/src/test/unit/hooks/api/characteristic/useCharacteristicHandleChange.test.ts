import { renderHook } from "@testing-library/react";
import useCharacteristicHandleChange from "hooks/api/characteristic/useCharacteristicHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockSetCharacteristicCheckBoxItems = jest.fn();
const mockSetCheckedCharacteristicLabels = jest.fn();

const mockContextValueCheckedFalse = {
  setCharacteristicCheckBoxItems: mockSetCharacteristicCheckBoxItems,
  setCheckedCharacteristicLabels: mockSetCheckedCharacteristicLabels,
  characteristicCheckBoxItems: [
    {
      label: "幻想・神秘的",
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  setCharacteristicCheckBoxItems: mockSetCharacteristicCheckBoxItems,
  setCheckedCharacteristicLabels: mockSetCheckedCharacteristicLabels,
  characteristicCheckBoxItems: [
    {
      label: "幻想・神秘的",
      checked: true,
    },
  ],
};

describe("handleChangeCharacteristic関数の挙動のテスト", () => {
  test("characteristicCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useCharacteristicHandleChange());
    const mockEvent = { target: { value: "幻想・神秘的" } };
    act(() => {
      result.current.handleChangeCharacteristic(mockEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(mockSetCharacteristicCheckBoxItems).toHaveBeenCalledWith([
      {
        label: "幻想・神秘的",
        checked: true,
      },
    ]);
    expect(mockSetCharacteristicCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith(["幻想・神秘的"]);
    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledTimes(1);
  });

  test("characteristicCheckBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useCharacteristicHandleChange());
    const mockEvent = { target: { value: "幻想・神秘的" } };
    act(() => {
      result.current.handleChangeCharacteristic(mockEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(mockSetCharacteristicCheckBoxItems).toHaveBeenCalledWith([
      {
        label: "幻想・神秘的",
        checked: false,
      },
    ]);
    expect(mockSetCharacteristicCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledTimes(1);
  });
});
