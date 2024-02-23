import { renderHook } from "@testing-library/react";
import { useWorldViewListContext, WorldViewListProvider } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

describe("SET_CHECKBOX_ITEMSアクションのテスト", () => {
  test("SET_CATEGORY_CHECKBOX_ITEMSアクションがディスパッチされた際、categoryCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.categoryCheckBoxItems).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CATEGORY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "砂漠",
            parentLabel: "自然",
            checked: false,
          },
        ],
      });
    });

    expect(result.current.state.categoryCheckBoxItems).toEqual([
      {
        label: "砂漠",
        parentLabel: "自然",
        checked: false,
      },
    ]);
  });

  test("SET_COUNTRY_CHECKBOX_ITEMSアクションがディスパッチされた際、countryCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.countryCheckBoxItems).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_COUNTRY_CHECKBOX_ITEMS",
        payload: [
          {
            label: "アメリカ",
            parentLabel: "北米",
            checked: false,
          },
        ],
      });
    });

    expect(result.current.state.countryCheckBoxItems).toEqual([
      {
        label: "アメリカ",
        parentLabel: "北米",
        checked: false,
      },
    ]);
  });

  test("SET_CHARACTERISTIC_CHECKBOX_ITEMSアクションがディスパッチされた際、characteristicCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.characteristicCheckItems).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHARACTERISTIC_CHECK_ITEMS",
        payload: [
          {
            label: "幻想・神秘的",
            checked: false,
          },
        ],
      });
    });

    expect(result.current.state.characteristicCheckItems).toEqual([
      {
        label: "幻想・神秘的",
        checked: false,
      },
    ]);
  });

  test("SET_RISK_LEVELアクションがディスパッチされた際、riskLevelが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.riskLevel).toEqual(undefined);
    act(() => {
      result.current.dispatch({
        type: "SET_RISK_LEVEL",
        payload: "1",
      });
    });
    expect(result.current.state.riskLevel).toEqual("1");
  });

  test("SET_MONTH_CHECKBOX_ITEMSアクションがディスパッチされた際、monthCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.monthCheckBoxItems).toEqual([
      { label: "1月", parentLabel: "冬", checked: false },
      { label: "2月", parentLabel: "冬", checked: false },
      { label: "3月", parentLabel: "春", checked: false },
      { label: "4月", parentLabel: "春", checked: false },
      { label: "5月", parentLabel: "春", checked: false },
      { label: "6月", parentLabel: "夏", checked: false },
      { label: "7月", parentLabel: "夏", checked: false },
      { label: "8月", parentLabel: "夏", checked: false },
      { label: "9月", parentLabel: "秋", checked: false },
      { label: "10月", parentLabel: "秋", checked: false },
      { label: "11月", parentLabel: "秋", checked: false },
      { label: "12月", parentLabel: "冬", checked: false },
    ]);

    act(() => {
      result.current.dispatch({
        type: "SET_MONTH_CHECKBOX_ITEMS",
        payload: [
          { label: "1月", parentLabel: "冬", checked: true },
          { label: "2月", parentLabel: "冬", checked: false },
          { label: "3月", parentLabel: "春", checked: false },
          { label: "4月", parentLabel: "春", checked: false },
          { label: "5月", parentLabel: "春", checked: false },
          { label: "6月", parentLabel: "夏", checked: false },
          { label: "7月", parentLabel: "夏", checked: false },
          { label: "8月", parentLabel: "夏", checked: false },
          { label: "9月", parentLabel: "秋", checked: false },
          { label: "10月", parentLabel: "秋", checked: false },
          { label: "11月", parentLabel: "秋", checked: false },
          { label: "12月", parentLabel: "冬", checked: true },
        ],
      });
    });

    expect(result.current.state.monthCheckBoxItems).toEqual([
      { label: "1月", parentLabel: "冬", checked: true },
      { label: "2月", parentLabel: "冬", checked: false },
      { label: "3月", parentLabel: "春", checked: false },
      { label: "4月", parentLabel: "春", checked: false },
      { label: "5月", parentLabel: "春", checked: false },
      { label: "6月", parentLabel: "夏", checked: false },
      { label: "7月", parentLabel: "夏", checked: false },
      { label: "8月", parentLabel: "夏", checked: false },
      { label: "9月", parentLabel: "秋", checked: false },
      { label: "10月", parentLabel: "秋", checked: false },
      { label: "11月", parentLabel: "秋", checked: false },
      { label: "12月", parentLabel: "冬", checked: true },
    ]);
  });
});

test("SET_BMI_RANGEアクションがディスパッチされた際、bmiRangeが指定された配列に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.bmiRange).toEqual([-40, 30]);
  act(() => {
    result.current.dispatch({
      type: "SET_BMI_RANGE",
      payload: [10, 20],
    });
  });
  expect(result.current.state.bmiRange).toEqual([10, 20]);
});

test("SET_IS_DISABLEDアクションがディスパッチされた際、isDisabledSearchButtonが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.isDisabledSearchButton).toBe(true);
  act(() => {
    result.current.dispatch({
      type: "SET_IS_DISABLED_SEARCH_BUTTON",
      payload: false,
    });
  });
  expect(result.current.state.isDisabledSearchButton).toBe(false);
});

test("SET_KEYWORDアクションがディスパッチされた際、keywordが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.keyword).toEqual("");

  act(() => {
    result.current.dispatch({ type: "SET_KEYWORD", payload: "キーワード" });
  });

  expect(result.current.state.keyword).toEqual("キーワード");
});

describe("LOADINGアクションのテスト", () => {
  test("SET_LOADING_SEARCH_WORLDVIEWSアクションがディスパッチされた際、loadingSearchWorldViewsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingSearchWorldViews).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_SEARCH_WORLDVIEWS", payload: true });
    });

    expect(result.current.state.loadingSearchWorldViews).toBe(true);
  });

  test("SET_LOADING_GET_CATEGORYアクションがディスパッチされた際、loadingGetCategoryが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingGetCategory).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_GET_CATEGORY", payload: true });
    });

    expect(result.current.state.loadingGetCategory).toBe(true);
  });

  test("SET_LOADING_GET_COUNTRYアクションがディスパッチされた際、loadingGetCountryが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingGetCountry).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_GET_COUNTRY", payload: true });
    });

    expect(result.current.state.loadingGetCountry).toBe(true);
  });

  test("SET_LOADING_GET_CHARACTERISTICアクションがディスパッチされた際、loadingGetCharacteristicが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingGetCharacteristic).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_GET_CHARACTERISTIC", payload: true });
    });

    expect(result.current.state.loadingGetCharacteristic).toBe(true);
  });
});

test("SET_WORLD_VIEWSアクションがディスパッチされた際、worldViewsが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.worldViews).toEqual([]);

  act(() => {
    result.current.dispatch({
      type: "SET_WORLD_VIEWS",
      payload: [
        {
          id: 1,
          name: "name",
          imgUrl: "imageUrl",
          bestSeason: "bestSeason",
          countries: [],
          categories: [],
          characteristics: [],
          worldViewFavorites: [],
          gifUrl: "gifUrl",
          gifSite: "gifSite",
        },
      ],
    });
  });

  expect(result.current.state.worldViews).toEqual([
    {
      id: 1,
      name: "name",
      imgUrl: "imageUrl",
      bestSeason: "bestSeason",
      countries: [],
      categories: [],
      characteristics: [],
      worldViewFavorites: [],
      gifUrl: "gifUrl",
      gifSite: "gifSite",
    },
  ]);
});

test("SET_SHOULD_DEBOUNCEアクションがディスパッチされた際、shouldDebounceが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.shouldDebounce).toBe(false);

  act(() => {
    result.current.dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: true });
  });

  expect(result.current.state.shouldDebounce).toBe(true);
});

test("SET_SORT_CRITERIAアクションがディスパッチされた際、sortCriteriaが指定された文字列に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.sortCriteria).toEqual("");

  act(() => {
    result.current.dispatch({ type: "SET_SORT_CRITERIA", payload: "latest" });
  });

  expect(result.current.state.sortCriteria).toEqual("latest");
});
