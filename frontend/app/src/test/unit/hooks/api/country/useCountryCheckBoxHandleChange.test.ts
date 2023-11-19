import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useCountryCheckBoxHandleChange from "hooks/api/country/useCountryCheckBoxHandleChange";
import client from "lib/api/client";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetLoadingSearchSuperbViews = jest.fn();
const mockSetCountriesWithCheckBoxData = jest.fn();
const mockSetCheckedCountryLabels = jest.fn();
const mockSetSuperbViews = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    setLoadingSearchSuperbViews: mockSetLoadingSearchSuperbViews,
    setCountriesWithCheckBoxData: mockSetCountriesWithCheckBoxData,
    setCheckedCountryLabels: mockSetCheckedCountryLabels,
    setSuperbViews: mockSetSuperbViews,
    countriesWithCheckBoxData: [
      {
        label: "ペルー",
        stateName: "中南米",
        superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
        checked: false,
      },
    ],
  }),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/superb_views/search").reply((config) => {
  if (config.params.country_names.includes("ペルー")) {
    return [
      200,
      [
        {
          id: 1,
          name: "マチュピチュ",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
        {
          id: 2,
          name: "ヴィニクンカ山",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
      ],
    ];
  }
  return [500];
});

test("handleChange成功時のテスト", async () => {
  const { result } = renderHook(() => useCountryCheckBoxHandleChange());
  const mockEvent = { target: { value: "ペルー" } };
  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "ペルー",
      stateName: "中南米",
      superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
      checked: true,
    },
  ]);
  expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith(["ペルー"]);
  expect(mockSetCheckedCountryLabels).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(true);

  expect(mockSetSuperbViews).toHaveBeenCalledWith([
    {
      id: 1,
      name: "マチュピチュ",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
    {
      id: 2,
      name: "ヴィニクンカ山",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
  ]);
  expect(mockSetSuperbViews).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});

test("handleChange失敗時のテスト", async () => {
  const { result } = renderHook(() => useCountryCheckBoxHandleChange());
  const mockEvent = { target: { value: "アメリカ" } };
  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "ペルー",
      stateName: "中南米",
      superbViewNames: ["マチュピチュ", "ヴィニクンカ山"],
      checked: false,
    },
  ]);
  expect(mockSetCountriesWithCheckBoxData).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedCountryLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedCountryLabels).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(true);

  expect(mockSetSuperbViews).not.toHaveBeenCalledWith();
  expect(mockSetSuperbViews).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "絶景一覧の取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});
