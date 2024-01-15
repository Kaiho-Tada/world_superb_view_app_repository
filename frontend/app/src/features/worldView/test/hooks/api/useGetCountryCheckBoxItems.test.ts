import { renderHook } from "@testing-library/react";
import mockGetAllCountriesApi from "features/worldView/api/countryApi";
import useGetCountryCheckBoxItems from "features/worldView/hooks/api/useGetCountryCheckBoxItems";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

jest.mock("features/worldView/api/countryApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
  }),
}));

test("countryCheckBoxItems取得成功時のテスト", async () => {
  (mockGetAllCountriesApi as jest.Mock).mockResolvedValue({
    data: [
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
    ],
  });

  const { result } = renderHook(() => useGetCountryCheckBoxItems());
  await act(async () => {
    await result.current.getCountryCheckBoxItems();
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
        parentLabel: "北米",
        checked: false,
      },
      {
        label: "中国",
        parentLabel: "アジア",
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
  (mockGetAllCountriesApi as jest.Mock).mockRejectedValue(new Error());
  const { result } = renderHook(() => useGetCountryCheckBoxItems());
  await act(async () => {
    await result.current.getCountryCheckBoxItems();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS",
    payload: true,
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "countriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS",
    payload: false,
  });
});
