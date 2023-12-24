import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllCharacteristicsWithCheckBoxData from "hooks/api/characteristic/useGetCharacteristicCheckBoxItems";
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
test("characteristicCheckBoxItems取得成功時のテスト", async () => {
  mockAxios.onGet("/characteristics").reply(200, [
    {
      id: 1,
      name: "奇妙・不思議",
    },
    {
      id: 2,
      name: "ロマンチック",
    },
  ]);
  const { result } = renderHook(() => useGetAllCharacteristicsWithCheckBoxData());
  await act(() => {
    result.current.getCharacteristicCheckBoxItems();
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS",
    payload: true,
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
    payload: [
      {
        label: "奇妙・不思議",
        checked: false,
      },
      {
        label: "ロマンチック",
        checked: false,
      },
    ],
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS",
    payload: false,
  });
});

test("characteristicCheckBoxItems取得失敗時のテスト", async () => {
  mockAxios.onGet("/characteristics").reply(500);
  const { result } = renderHook(() => useGetAllCharacteristicsWithCheckBoxData());
  await act(() => {
    result.current.getCharacteristicCheckBoxItems();
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "characteristicsの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
