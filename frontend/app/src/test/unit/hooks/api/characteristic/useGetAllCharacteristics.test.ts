import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllCharacteristics from "hooks/api/characteristic/useGetAllCharacteristics";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);
test("characteristic取得成功時のテスト", async () => {
  mockAxios.onGet("/characteristics").reply(200, [
    {
      id: 1,
      name: "characteristic1",
    },
    {
      id: 2,
      name: "characteristic2",
    },
  ]);
  const { result } = renderHook(() => useGetAllCharacteristics());
  expect(result.current.characteristics).toEqual([]);
  expect(result.current.loadingCharacteristics).toBe(false);
  await act(() => {
    result.current.getAllCharacteristics();
  });
  expect(result.current.characteristics).toEqual([
    {
      id: 1,
      name: "characteristic1",
    },
    {
      id: 2,
      name: "characteristic2",
    },
  ]);
  expect(result.current.loadingCharacteristics).toBe(false);
});

test("characteristic取得失敗時のテスト", async () => {
  mockAxios.onGet("/characteristics").reply(500);
  const { result } = renderHook(() => useGetAllCharacteristics());
  expect(result.current.characteristics).toEqual([]);
  expect(result.current.loadingCharacteristics).toBe(false);
  await act(() => {
    result.current.getAllCharacteristics();
  });
  expect(result.current.characteristics).toEqual([]);
  expect(result.current.loadingCharacteristics).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "characteristicsの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
