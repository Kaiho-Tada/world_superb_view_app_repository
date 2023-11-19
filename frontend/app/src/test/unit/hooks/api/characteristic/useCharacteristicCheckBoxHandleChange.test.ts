import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useCharacteristicCheckBoxHandleChange from "hooks/api/characteristic/useCharacteristicCheckBoxHandleChange";
import client from "lib/api/client";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetLoadingSearchSuperbViews = jest.fn();
const mockSetCharacteristicsWithCheckBoxData = jest.fn();
const mockSetCheckedCharacteristicLabels = jest.fn();
const mockSetSuperbViews = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    setLoadingSearchSuperbViews: mockSetLoadingSearchSuperbViews,
    setCharacteristicsWithCheckBoxData: mockSetCharacteristicsWithCheckBoxData,
    setCheckedCharacteristicLabels: mockSetCheckedCharacteristicLabels,
    setSuperbViews: mockSetSuperbViews,
    characteristicsWithCheckBoxData: [
      {
        label: "幻想・神秘的",
        superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
        checked: false,
      },
    ],
  }),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/superb_views/search").reply((config) => {
  if (config.params.characteristic_names.includes("幻想・神秘的")) {
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
          name: "モン・サン・ミシェル",
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
        },
      ],
    ];
  }
  return [500];
});

test("handleChange成功時のテスト", async () => {
  const { result } = renderHook(() => useCharacteristicCheckBoxHandleChange());
  const mockEvent = { target: { value: "幻想・神秘的" } };
  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "幻想・神秘的",
      superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
      checked: true,
    },
  ]);
  expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledTimes(1);

  expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith(["幻想・神秘的"]);
  expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledTimes(1);

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
      name: "モン・サン・ミシェル",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
    },
  ]);
  expect(mockSetSuperbViews).toHaveBeenCalledTimes(1);

  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledWith(false);
  expect(mockSetLoadingSearchSuperbViews).toHaveBeenCalledTimes(2);
});

test("handleChange失敗時のテスト", async () => {
  const { result } = renderHook(() => useCharacteristicCheckBoxHandleChange());
  const mockEvent = { target: { value: "歴史・文化的" } };
  await act(() => {
    result.current.handleChange(mockEvent as ChangeEvent<HTMLInputElement>);
  });

  expect(mockSetCharacteristicsWithCheckBoxData).toHaveBeenCalledWith([
    {
      label: "幻想・神秘的",
      superbViewNames: ["マチュピチュ", "モン・サン・ミシェル"],
      checked: false,
    },
  ]);

  expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledWith([]);
  expect(mockSetCheckedCharacteristicLabels).toHaveBeenCalledTimes(1);

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
