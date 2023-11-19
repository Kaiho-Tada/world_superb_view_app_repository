import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllCountries from "hooks/api/country/useGetAllCountries";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

test("Country取得成功時のテスト", async () => {
  mockAxios.onGet("/countries").reply(200, [
    {
      id: 1,
      name: "country1",
      code: "bestSeason1",
      riskLevel: 1,
    },
    {
      id: 2,
      name: "country2",
      code: "bestSeason2",
      riskLevel: 2,
    },
  ]);
  const { result } = renderHook(() => useGetAllCountries());
  expect(result.current.countries).toEqual([]);
  expect(result.current.loadingCountries).toBe(false);
  await act(() => {
    result.current.getAllCountries();
  });
  expect(result.current.countries).toEqual([
    {
      id: 1,
      name: "country1",
      code: "bestSeason1",
      riskLevel: 1,
    },
    {
      id: 2,
      name: "country2",
      code: "bestSeason2",
      riskLevel: 2,
    },
  ]);
  expect(result.current.loadingCountries).toBe(false);
});

test("Country取得失敗時のテスト", async () => {
  mockAxios.onGet("/countries").reply(500);
  const { result } = renderHook(() => useGetAllCountries());
  expect(result.current.countries).toEqual([]);
  expect(result.current.loadingCountries).toBe(false);
  await act(() => {
    result.current.getAllCountries();
  });
  expect(result.current.countries).toEqual([]);
  expect(result.current.loadingCountries).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "countriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
