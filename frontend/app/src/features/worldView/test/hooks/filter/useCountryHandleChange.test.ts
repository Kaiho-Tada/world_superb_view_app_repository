import { renderHook } from "@testing-library/react";
import useCountryHandleChange from "features/worldView/hooks/filter/useCountryHandleChange";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);
const mockDispatch = jest.fn();
const mockContextValueCheckedFalse = {
  dispatch: mockDispatch,
  state: {
    countryCheckBoxItems: [
      {
        label: "ペルー",
        stateName: "中南米",
        checked: false,
      },
    ],
  },
};

const mockContextValueCheckedTrue = {
  dispatch: mockDispatch,
  state: {
    countryCheckBoxItems: [
      {
        label: "ペルー",
        stateName: "中南米",
        checked: true,
      },
    ],
  },
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
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_COUNTRY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "ペルー",
            stateName: "中南米",
            checked: true,
          },
        ],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_COUNTRY_LABELS",
        payload: ["ペルー"],
      });
    });

    test("e.target.checkedがfalseの場合、countryCheckBoxItemsのcheckedがfalseに更新されること", () => {
      spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueCheckedTrue);
      const { result } = renderHook(() => useCountryHandleChange());
      const mockEvent = { target: { value: "中南米", checked: false } };
      act(() => {
        result.current.handleChangeState(mockEvent as ChangeEvent<HTMLInputElement>);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_COUNTRY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "ペルー",
            stateName: "中南米",
            checked: false,
          },
        ],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_COUNTRY_LABELS",
        payload: [],
      });
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
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_COUNTRY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "ペルー",
            stateName: "中南米",
            checked: false,
          },
        ],
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CHECKED_COUNTRY_LABELS",
        payload: [],
      });
    });
  });
});
