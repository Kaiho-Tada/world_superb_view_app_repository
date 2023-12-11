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

test("characteristicCheckBoxItems取得成功時のテスト", async () => {
  mockAxios.onGet("/characteristics").reply(200, [
    {
      id: 1,
      name: "奇妙・不思議",
      superbViews: [
        {
          id: 1,
          name: "トロルの舌",
        },
        {
          id: 2,
          name: "マチュピチュ",
        },
      ],
    },
    {
      id: 2,
      name: "ロマンチック",
      superbViews: [
        {
          id: 3,
          name: "モン・サン・ミシェル",
        },
      ],
    },
  ]);
  const { result } = renderHook(() => useGetAllCharacteristicsWithCheckBoxData());
  expect(result.current.characteristicCheckBoxItems).toEqual([]);
  expect(result.current.loadingCharacteristicCheckBoxItems).toBe(false);
  await act(() => {
    result.current.getCharacteristicCheckBoxItems();
  });

  expect(result.current.characteristicCheckBoxItems).toEqual([
    {
      label: "奇妙・不思議",
      superbViewNames: ["トロルの舌", "マチュピチュ"],
      checked: false,
    },
    {
      label: "ロマンチック",
      superbViewNames: ["モン・サン・ミシェル"],
      checked: false,
    },
  ]);
  expect(result.current.loadingCharacteristicCheckBoxItems).toBe(false);
});

test("characteristicCheckBoxItems取得失敗時のテスト", async () => {
  mockAxios.onGet("/characteristics").reply(500);
  const { result } = renderHook(() => useGetAllCharacteristicsWithCheckBoxData());
  expect(result.current.characteristicCheckBoxItems).toEqual([]);
  expect(result.current.loadingCharacteristicCheckBoxItems).toBe(false);
  await act(() => {
    result.current.getCharacteristicCheckBoxItems();
  });
  expect(result.current.characteristicCheckBoxItems).toEqual([]);
  expect(result.current.loadingCharacteristicCheckBoxItems).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "characteristicsの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
