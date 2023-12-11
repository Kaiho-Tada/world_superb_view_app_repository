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

test("countryCheckBoxItems取得成功時のテスト", async () => {
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
  const { result } = renderHook(() => useGetCountryCheckBoxItems());
  expect(result.current.countryCheckBoxItems).toEqual([]);
  expect(result.current.loadingCountryCheckBoxItems).toBe(false);
  await act(() => {
    result.current.getCountryCheckBoxItems();
  });

  expect(result.current.countryCheckBoxItems).toEqual([
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
  expect(result.current.loadingCountryCheckBoxItems).toBe(false);
});

test("countryCheckBoxItems取得失敗時のテスト", async () => {
  mockAxios.onGet("/countries").reply(500);
  const { result } = renderHook(() => useGetCountryCheckBoxItems());
  expect(result.current.countryCheckBoxItems).toEqual([]);
  expect(result.current.loadingCountryCheckBoxItems).toBe(false);
  await act(() => {
    result.current.getCountryCheckBoxItems();
  });
  expect(result.current.countryCheckBoxItems).toEqual([]);
  expect(result.current.loadingCountryCheckBoxItems).toBe(false);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "countriesの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
});
