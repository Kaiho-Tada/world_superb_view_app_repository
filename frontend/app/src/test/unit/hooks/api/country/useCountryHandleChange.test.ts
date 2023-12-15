import { renderHook } from "@testing-library/react";
import useCountryHandleChange from "hooks/api/country/useCountryHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/WorldViewListProvider"),
  "useWorldViewListContext"
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

describe("handleChangeState関数の挙動のテスト", () => {
  describe("e.target.valueの値とcountryCheckBoxItemsのstateNameプロパティの値が同じである場合", () => {
    test("e.target.checkedがtrueの場合、countryCheckBoxItemsのcheckedがtrueに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useCountryHandleChange());
      const mockEvent = { target: { value: "中南米", checked: true } };
      act(() => {
        result.current.handleChangeState(mockEvent as ChangeEvent<HTMLInputElement>);
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

    test("e.target.checkedがfalseの場合、countryCheckBoxItemsのcheckedがfalseに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useCountryHandleChange());
      const mockEvent = { target: { value: "中南米", checked: false } };
      act(() => {
        result.current.handleChangeState(mockEvent as ChangeEvent<HTMLInputElement>);
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

  describe("e.target.valueの値とcountryCheckBoxItemsのclassificationの値が異なる場合", () => {
    test("countryCheckBoxItemsのcheckedが更新されないこと", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
      const { result } = renderHook(() => useCountryHandleChange());
      const mockEvent = { target: { value: "アフリカ", checked: true } };
      act(() => {
        result.current.handleChangeState(mockEvent as ChangeEvent<HTMLInputElement>);
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
});

describe("handleChangeCountry関数の挙動のテスト", () => {
  test("countryCheckBoxItemsのcheckedがfalseの場合、trueに更新されること", () => {
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedFalse);
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
    spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
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
