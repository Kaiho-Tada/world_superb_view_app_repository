import { renderHook } from "@testing-library/react";
import useCountryHandleChange from "hooks/api/country/useCountryHandleChange";
import * as SuperbViewListProviderModule from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseSuperbViewListContext = jest.spyOn(
  SuperbViewListProviderModule,
  "useSuperbViewListContext"
);
const mockSetCountriesWithCheckBoxData = jest.fn();
const mockSetCheckedCountryLabels = jest.fn();

const mockContextValueCheckedFalse = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setCountriesWithCheckBoxData: mockSetCountriesWithCheckBoxData,
  setCheckedCountryLabels: mockSetCheckedCountryLabels,
  countriesWithCheckBoxData: [
    {
      label: "ペルー",
      stateName: "中南米",
      superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
      checked: false,
    },
  ],
};

const mockContextValueCheckedTrue = {
  ...jest.requireActual("hooks/providers/SuperbViewListProvider").useSuperbViewListContext,
  setCountriesWithCheckBoxData: mockSetCountriesWithCheckBoxData,
  setCheckedCountryLabels: mockSetCheckedCountryLabels,
  countriesWithCheckBoxData: [
    {
      label: "ペルー",
      stateName: "中南米",
      superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
      checked: true,
    },
  ],
};

describe("handleChangeCountry関数の挙動のテスト", () => {
  test("countriesWithCheckBoxDataのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
    const { result } = renderHook(() => useCountryHandleChange());
    const mockEvent = { target: { value: "ペルー" } };
    act(() => {
      result.current.handleChangeCountry(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledWith([
      {
        label: "ペルー",
        stateName: "中南米",
        superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
        checked: true,
      },
    ]);
    expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith(["ペルー"]);
    expect(mockSetCheckedCountryLabels).toHaveBeenCalledTimes(1);
  });

  test("countriesWithCheckBoxDataのcheckedがtrueの場合、falseに更新されること", () => {
    spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
    const { result } = renderHook(() => useCountryHandleChange());
    const mockEvent = { target: { value: "ペルー" } };
    act(() => {
      result.current.handleChangeCountry(mockEvent as ChangeEvent<HTMLInputElement>);
    });
    expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledWith([
      {
        label: "ペルー",
        stateName: "中南米",
        superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
        checked: false,
      },
    ]);
    expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledTimes(1);

    expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith([]);
    expect(mockSetCheckedCountryLabels).toHaveBeenCalledTimes(1);
  });
});
