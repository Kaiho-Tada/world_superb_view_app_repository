import { renderHook } from "@testing-library/react";
import useCharacteristicHandleChange from "hooks/api/characteristic/useCharacteristicHandleChange";
import * as SuperbViewListProviderModule from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  SuperbViewListProviderModule,
  "useSuperbViewListContext"
);

const mockSetCharacteristicsWithCheckBoxData = jest.fn();
const mockSetCheckedCharacteristicLabels = jest.fn();

const mockContextValueCheckedFalse = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setCharacteristicsWithCheckBoxData: mockSetCharacteristicsWithCheckBoxData,
  setCheckedCharacteristicLabels: mockSetCheckedCharacteristicLabels,
  characteristicsWithCheckBoxData: [
    {
      label: "幻想・神秘的",
      superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setCharacteristicsWithCheckBoxData: mockSetCharacteristicsWithCheckBoxData,
  setCheckedCharacteristicLabels: mockSetCheckedCharacteristicLabels,
  characteristicsWithCheckBoxData: [
    {
      label: "幻想・神秘的",
      superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
      checked: true,
    },
  ],
};

describe("handleChangeCharacteristic関数の挙動のテスト", () => {
  test("characteristicsWithCheckBoxDataのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useCharacteristicHandleChange());
    const mockEvent = { target: { value: "幻想・神秘的" } };
    act(() => {
      result.current.handleChangeCharacteristic(mockEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledWith([
      {
        label: "幻想・神秘的",
        superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
        checked: true,
      },
    ]);
    expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith(["幻想・神秘的"]);
    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledTimes(1);
  });

  test("characteristicsWithCheckBoxDataのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useCharacteristicHandleChange());
    const mockEvent = { target: { value: "幻想・神秘的" } };
    act(() => {
      result.current.handleChangeCharacteristic(mockEvent as ChangeEvent<HTMLInputElement>);
    });

    expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledWith([
      {
        label: "幻想・神秘的",
        superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
        checked: false,
      },
    ]);
    expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledTimes(1);
  });
});
