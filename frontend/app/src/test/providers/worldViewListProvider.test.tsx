import { renderHook } from "@testing-library/react";
import { useWorldViewListContext, WorldViewListProvider } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

describe("SET_CHECK_ITEMSアクションのテスト", () => {
  test("SET_CATEGORY_CHECK_ITEMSアクションがディスパッチされた際、categoryCheckItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.categoryCheckItems).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CATEGORY_CHECK_ITEMS",
        payload: [
          {
            label: "砂漠",
            parentLabel: "自然",
            checked: false,
            isVisible: false,
          },
        ],
      });
    });

    expect(result.current.state.categoryCheckItems).toEqual([
      {
        label: "砂漠",
        parentLabel: "自然",
        checked: false,
        isVisible: false,
      },
    ]);
  });

  test("SET_COUNTRY_CHECK_ITEMSアクションがディスパッチされた際、countryCheckItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.countryCheckItems).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_COUNTRY_CHECK_ITEMS",
        payload: [
          {
            label: "アメリカ",
            parentLabel: "北米",
            checked: false,
            isVisible: false,
          },
        ],
      });
    });

    expect(result.current.state.countryCheckItems).toEqual([
      {
        label: "アメリカ",
        parentLabel: "北米",
        checked: false,
        isVisible: false,
      },
    ]);
  });

  test("SET_CHARACTERISTIC_CHECK_ITEMSアクションがディスパッチされた際、characteristicCheckItemsが指定された値に更新されること", () => {
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
});

test("SET_MONTH_RANGEアクションがディスパッチされた際、monthRangeが指定された配列に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.monthRange).toEqual([1, 12]);
  act(() => {
    result.current.dispatch({
      type: "SET_MONTH_RANGE",
      payload: [6, 9],
    });
  });
  expect(result.current.state.monthRange).toEqual([6, 9]);
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

  test("SET_LOADING_GET_WORLDVIEWSアクションがディスパッチされた際、loadingGetWorldViewsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingGetWorldViews).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_GET_WORLDVIEWS", payload: true });
    });

    expect(result.current.state.loadingGetWorldViews).toBe(true);
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
          videos: [],
          latitude: 0,
          longitude: 0,
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
      videos: [],
      latitude: 0,
      longitude: 0,
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

test("SET_IS_SKIP_SEARCH_WORLD_VIEWSアクションがディスパッチされた際、isSkipSearchWorldViewsが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.isSkipSearchWorldViews).toEqual(false);

  act(() => {
    result.current.dispatch({ type: "SET_IS_SKIP_SEARCH_WORLD_VIEWS", payload: true });
  });

  expect(result.current.state.isSkipSearchWorldViews).toEqual(true);
});

test("SET_IS_SKIP_GET_CHECK_ITEMSアクションがディスパッチされた際、isSkipGetCheckItmesが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.isSkipGetCheckItmes).toEqual(false);

  act(() => {
    result.current.dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS", payload: true });
  });

  expect(result.current.state.isSkipGetCheckItmes).toEqual(true);
});

test("SET_CURRENT_PAGEアクションがディスパッチされた際、currentPageが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.currentPage).toEqual(1);

  act(() => {
    result.current.dispatch({ type: "SET_CURRENT_PAGE", payload: 4 });
  });

  expect(result.current.state.currentPage).toEqual(4);
});

test("SET_ITEMS_OFFSETアクションがディスパッチされた際、itemsOffsetが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.itemsOffset).toEqual(0);

  act(() => {
    result.current.dispatch({ type: "SET_ITEMS_OFFSET", payload: 20 });
  });

  expect(result.current.state.itemsOffset).toEqual(20);
});

test("SET_IS_VISIT_DETAIL_PAGEアクションがディスパッチされた際、isVisitedDetailPageが指定された値に更新されること", () => {
  const { result } = renderHook(() => useWorldViewListContext(), {
    wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
  });
  expect(result.current.state.isVisitedDetailPage).toBe(false);

  act(() => {
    result.current.dispatch({ type: "SET_IS_VISIT_DETAIL_PAGE", payload: true });
  });

  expect(result.current.state.isVisitedDetailPage).toBe(true);
});
