import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetAllCountriesWithCheckBoxData from "hooks/api/country/useGetAllCountriesWithCheckBoxData";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

test("countriesWithCheckBoxData取得成功時のテスト", async () => {
  mockAxios.onGet("/countries").reply(200, [
    {
      id: 1,
      name: "アメリカ",
      state: {
        id: 1,
        name: "北米",
      },
      superbViews: [
        {
          id: 1,
          name: "モニュメントバレー",
        },
        {
          id: 2,
          name: "サルベーションマウンテン",
        },
      ],
    },
    {
      id: 2,
      name: "中国",
      state: {
        id: 2,
        name: "アジア",
      },
      superbViews: [
        {
          id: 3,
          name: "蘆笛岩",
        },
      ],
    },
  ]);
  const { result } = renderHook(() => useGetAllCountriesWithCheckBoxData());
  expect(result.current.countriesWithCheckBoxData).toEqual([]);
  expect(result.current.loadingCountriesWithCheckBoxData).toBe(false);
  await act(() => {
    result.current.getAllCountriesWithCheckBoxData();
  });

  expect(result.current.countriesWithCheckBoxData).toEqual([
    {
      label: "アメリカ",
      stateName: "北米",
      superbViewNames: ["モニュメントバレー", "サルベーションマウンテン"],
      checked: false,
    },
    {
      label: "中国",
      stateName: "アジア",
      superbViewNames: ["蘆笛岩"],
      checked: false,
    },
  ]);
  expect(result.current.loadingCountriesWithCheckBoxData).toBe(false);
});

test("countriesWithCheckBoxData取得失敗時のテスト", async () => {
  mockAxios.onGet("/countries").reply(500);
  const { result } = renderHook(() => useGetAllCountriesWithCheckBoxData());
  expect(result.current.countriesWithCheckBoxData).toEqual([]);
  expect(result.current.loadingCountriesWithCheckBoxData).toBe(false);
  await act(() => {
    result.current.getAllCountriesWithCheckBoxData();
  });
  expect(result.current.countriesWithCheckBoxData).toEqual([]);
  expect(result.current.loadingCountriesWithCheckBoxData).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "countriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
