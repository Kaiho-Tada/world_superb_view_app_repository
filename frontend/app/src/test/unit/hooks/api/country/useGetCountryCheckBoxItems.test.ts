import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetCountryCheckBoxItems from "hooks/api/country/useGetCountryCheckBoxItems";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

const mockDispatch = jest.fn();
jest.mock("hooks/providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
  }),
}));

test("countryCheckBoxItems取得成功時のテスト", async () => {
  mockAxios.onGet("/countries").reply(200, [
    {
      id: 1,
      name: "アメリカ",
      state: {
        id: 1,
        name: "北米",
      },
    },
    {
      id: 2,
      name: "中国",
      state: {
        id: 2,
        name: "アジア",
      },
    },
  ]);
  const { result } = renderHook(() => useGetCountryCheckBoxItems());
  await act(() => {
    result.current.getCountryCheckBoxItems();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS",
    payload: true,
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_COUNTRY_CHECKBOX_ITEMS",
    payload: [
      {
        label: "アメリカ",
        stateName: "北米",
        checked: false,
      },
      {
        label: "中国",
        stateName: "アジア",
        checked: false,
      },
    ],
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS",
    payload: false,
  });
});

test("countryCheckBoxItems取得失敗時のテスト", async () => {
  mockAxios.onGet("/countries").reply(500);
  const { result } = renderHook(() => useGetCountryCheckBoxItems());
  await act(() => {
    result.current.getCountryCheckBoxItems();
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "countriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
