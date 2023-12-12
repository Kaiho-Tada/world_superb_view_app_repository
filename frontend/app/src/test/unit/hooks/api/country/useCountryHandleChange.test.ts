import { renderHook } from "@testing-library/react";
import useCountryHandleChange from "hooks/api/country/useCountryHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);
const mockSetCountryCheckBoxItems = jest.fn();
const mockSetCheckedCountryLabels = jest.fn();

const mockContextValueCheckedFalse = {
  setCountryCheckBoxItems: mockSetCountryCheckBoxItems,
  setCheckedCountryLabels: mockSetCheckedCountryLabels,
  countryCheckBoxItems: [
    {
      label: "ペルー",
      stateName: "中南米",
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  setCountryCheckBoxItems: mockSetCountryCheckBoxItems,
  setCheckedCountryLabels: mockSetCheckedCountryLabels,
  countryCheckBoxItems: [
    {
      label: "ペルー",
      stateName: "中南米",
      checked: true,
    },
  ],
};

describe("handleChangeCountry関数の挙動のテスト", () => {
  test("countryCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useCountryHandleChange());
    const mockEvent = { target: { value: "ペルー" } };
    act(() => {
      result.current.handleChangeCountry(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCountryCheckBoxItems).toHaveBeenCalledWith([
      {
        label: "ペルー",
        stateName: "中南米",
        checked: true,
      },
    ]);
    expect(mockSetCountryCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith(["ペルー"]);
    expect(mockSetCheckedCountryLabels).toHaveBeenCalledTimes(1);
  });

  test("countryCheckBoxItemsのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useCountryHandleChange());
    const mockEvent = { target: { value: "ペルー" } };
    act(() => {
      result.current.handleChangeCountry(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCountryCheckBoxItems).toHaveBeenCalledWith([
      {
        label: "ペルー",
        stateName: "中南米",
        checked: false,
      },
    ]);
    expect(mockSetCountryCheckBoxItems).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCountryLabels).toHaveBeenCalledTimes(1);
  });
});
