import { renderHook } from "@testing-library/react";
import {
  useWorldViewListContext,
  WorldViewListProvider,
} from "hooks/providers/WorldViewListProvider";
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
            classification: "自然",
            checked: false,
          },
        ],
      });
    });

    expect(result.current.state.categoryCheckBoxItems).toEqual([
      {
        label: "砂漠",
        classification: "自然",
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
            stateName: "北米",
            checked: false,
          },
        ],
      });
    });

    expect(result.current.state.countryCheckBoxItems).toEqual([
      {
        label: "アメリカ",
        stateName: "北米",
        checked: false,
      },
    ]);
  });

  test("SET_CHARACTERISTIC_CHECKBOX_ITEMSアクションがディスパッチされた際、characteristicCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.characteristicCheckBoxItems).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
        payload: [
          {
            label: "幻想・神秘的",
            checked: false,
          },
        ],
      });
    });

    expect(result.current.state.characteristicCheckBoxItems).toEqual([
      {
        label: "幻想・神秘的",
        checked: false,
      },
    ]);
  });

  test("SET_RISK_LEVEL_CHECKBOX_ITEMSアクションがディスパッチされた際、riskLevelCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.riskLevelCheckBoxItems).toEqual([
      { label: "4", checked: false },
      { label: "3", checked: false },
      { label: "2", checked: false },
      { label: "1", checked: false },
      { label: "0", checked: false },
    ]);

    act(() => {
      result.current.dispatch({
        type: "SET_RISK_LEVEL_CHECKBOX_ITEMS",
        payload: [
          { label: "4", checked: true },
          { label: "3", checked: false },
          { label: "2", checked: false },
          { label: "1", checked: false },
          { label: "0", checked: true },
        ],
      });
    });

    expect(result.current.state.riskLevelCheckBoxItems).toEqual([
      { label: "4", checked: true },
      { label: "3", checked: false },
      { label: "2", checked: false },
      { label: "1", checked: false },
      { label: "0", checked: true },
    ]);
  });

  test("SET_MONTH_CHECKBOX_ITEMSアクションがディスパッチされた際、monthCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.monthCheckBoxItems).toEqual([
      { label: "1月", season: "冬", checked: false },
      { label: "2月", season: "冬", checked: false },
      { label: "3月", season: "春", checked: false },
      { label: "4月", season: "春", checked: false },
      { label: "5月", season: "春", checked: false },
      { label: "6月", season: "夏", checked: false },
      { label: "7月", season: "夏", checked: false },
      { label: "8月", season: "夏", checked: false },
      { label: "9月", season: "秋", checked: false },
      { label: "10月", season: "秋", checked: false },
      { label: "11月", season: "秋", checked: false },
      { label: "12月", season: "冬", checked: false },
    ]);

    act(() => {
      result.current.dispatch({
        type: "SET_MONTH_CHECKBOX_ITEMS",
        payload: [
          { label: "1月", season: "冬", checked: true },
          { label: "2月", season: "冬", checked: false },
          { label: "3月", season: "春", checked: false },
          { label: "4月", season: "春", checked: false },
          { label: "5月", season: "春", checked: false },
          { label: "6月", season: "夏", checked: false },
          { label: "7月", season: "夏", checked: false },
          { label: "8月", season: "夏", checked: false },
          { label: "9月", season: "秋", checked: false },
          { label: "10月", season: "秋", checked: false },
          { label: "11月", season: "秋", checked: false },
          { label: "12月", season: "冬", checked: true },
        ],
      });
    });

    expect(result.current.state.monthCheckBoxItems).toEqual([
      { label: "1月", season: "冬", checked: true },
      { label: "2月", season: "冬", checked: false },
      { label: "3月", season: "春", checked: false },
      { label: "4月", season: "春", checked: false },
      { label: "5月", season: "春", checked: false },
      { label: "6月", season: "夏", checked: false },
      { label: "7月", season: "夏", checked: false },
      { label: "8月", season: "夏", checked: false },
      { label: "9月", season: "秋", checked: false },
      { label: "10月", season: "秋", checked: false },
      { label: "11月", season: "秋", checked: false },
      { label: "12月", season: "冬", checked: true },
    ]);
  });

  test("SET_BMI_CHECKBOX_ITEMSアクションがディスパッチされた際、bmiCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.bmiCheckBoxItems).toEqual([
      { label: "30%〜", checked: false },
      { label: "20%〜30%", checked: false },
      { label: "10%〜20%", checked: false },
      { label: "0%〜10%", checked: false },
      { label: "-10%〜0%", checked: false },
      { label: "-20%〜-10%", checked: false },
      { label: "-30%〜-20%", checked: false },
      { label: "-40%〜-30%", checked: false },
      { label: "〜-40%", checked: false },
    ]);

    act(() => {
      result.current.dispatch({
        type: "SET_BMI_CHECKBOX_ITEMS",
        payload: [
          { label: "30%〜", checked: true },
          { label: "20%〜30%", checked: false },
          { label: "10%〜20%", checked: false },
          { label: "0%〜10%", checked: false },
          { label: "-10%〜0%", checked: false },
          { label: "-20%〜-10%", checked: false },
          { label: "-30%〜-20%", checked: false },
          { label: "-40%〜-30%", checked: false },
          { label: "〜-40%", checked: true },
        ],
      });
    });

    expect(result.current.state.bmiCheckBoxItems).toEqual([
      { label: "30%〜", checked: true },
      { label: "20%〜30%", checked: false },
      { label: "10%〜20%", checked: false },
      { label: "0%〜10%", checked: false },
      { label: "-10%〜0%", checked: false },
      { label: "-20%〜-10%", checked: false },
      { label: "-30%〜-20%", checked: false },
      { label: "-40%〜-30%", checked: false },
      { label: "〜-40%", checked: true },
    ]);
  });
});

describe("SET_CHECKED_LABELSアクションのテスト", () => {
  test("SET_CHECKED_CATEGORY_LABELSアクションがディスパッチされた際、checkedCategoryLabelsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.checkedCategoryLabels).toEqual([]);

    act(() => {
      result.current.dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: ["廃墟", "アート"] });
    });

    expect(result.current.state.checkedCategoryLabels).toEqual(["廃墟", "アート"]);
  });

  test("SET_CHECKED_COUNTRY_LABELSアクションがディスパッチされた際、checkedCountryLabelsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.checkedCountryLabels).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHECKED_COUNTRY_LABELS",
        payload: ["ギリシャ", "台湾"],
      });
    });

    expect(result.current.state.checkedCountryLabels).toEqual(["ギリシャ", "台湾"]);
  });

  test("SET_CHECKED_CHARACTERISTIC_LABELSアクションがディスパッチされた際、checkedCharacteristicLabelsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.checkedCharacteristicLabels).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHECKED_CHARACTERISTIC_LABELS",
        payload: ["雄大", "耽美"],
      });
    });

    expect(result.current.state.checkedCharacteristicLabels).toEqual(["雄大", "耽美"]);
  });

  test("SET_CHECKED_RISK_LEVEL_LABELSアクションがディスパッチされた際、checkedRiskLevelLabelsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.checkedRiskLevelLabels).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHECKED_RISK_LEVEL_LABELS",
        payload: ["2", "3"],
      });
    });

    expect(result.current.state.checkedRiskLevelLabels).toEqual(["2", "3"]);
  });

  test("SET_CHECKED_MONTH_LABELSアクションがディスパッチされた際、checkedMonthLabelsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.checkedMonthLabels).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHECKED_MONTH_LABELS",
        payload: ["1月", "2月"],
      });
    });

    expect(result.current.state.checkedMonthLabels).toEqual(["1月", "2月"]);
  });

  test("SET_CHECKED_BMI_LABELSアクションがディスパッチされた際、checkedBmiLabelsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.checkedBmiLabels).toEqual([]);

    act(() => {
      result.current.dispatch({
        type: "SET_CHECKED_BMI_LABELS",
        payload: ["16.6%", "22.3%"],
      });
    });

    expect(result.current.state.checkedBmiLabels).toEqual(["16.6%", "22.3%"]);
  });
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

  test("SET_LOADING_CATEGORY_CHECKBOX_ITEMSアクションがディスパッチされた際、loadingCategoryCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingCategoryCheckBoxItems).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_CATEGORY_CHECKBOX_ITEMS", payload: true });
    });

    expect(result.current.state.loadingCategoryCheckBoxItems).toBe(true);
  });

  test("SET_LOADING_COUNTRY_CHECKBOX_ITEMSアクションがディスパッチされた際、loadingCountryCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingCountryCheckBoxItems).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_COUNTRY_CHECKBOX_ITEMS", payload: true });
    });

    expect(result.current.state.loadingCountryCheckBoxItems).toBe(true);
  });

  test("SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMSアクションがディスパッチされた際、loadingCharacteristicCheckBoxItemsが指定された値に更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.loadingCharacteristicCheckBoxItems).toBe(false);

    act(() => {
      result.current.dispatch({ type: "SET_LOADING_CHARACTERISTIC_CHECKBOX_ITEMS", payload: true });
    });

    expect(result.current.state.loadingCharacteristicCheckBoxItems).toBe(true);
  });
});

describe("FILTER_DRAWERアクションのテスト", () => {
  test("OPEN_FILTER_DRAWERアクションの場合は、isOpenFilterDrawerがtrueにCLOSE_FILTER_DRAWERがディスパッチされた場合はfalseに更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.isOpenFilterDrawer).toBe(false);

    act(() => {
      result.current.dispatch({ type: "OPEN_FILTER_DRAWER" });
    });

    expect(result.current.state.isOpenFilterDrawer).toBe(true);

    act(() => {
      result.current.dispatch({ type: "CLOSE_FILTER_DRAWER" });
    });

    expect(result.current.state.isOpenFilterDrawer).toBe(false);
  });
});

describe("FILTER_ACCODIONアクションのテスト", () => {
  test("OPEN_FILTER_ACCODIONアクションの場合は、isOpenFilterAccordionがtrueにCLOSE_FILTER_ACCODIONがディスパッチされたfalseに更新されること", () => {
    const { result } = renderHook(() => useWorldViewListContext(), {
      wrapper: ({ children }) => <WorldViewListProvider>{children}</WorldViewListProvider>,
    });
    expect(result.current.state.isOpenFilterAccordion).toBe(true);

    act(() => {
      result.current.dispatch({ type: "CLOSE_FILTER_ACCODION" });
    });

    expect(result.current.state.isOpenFilterAccordion).toBe(false);

    act(() => {
      result.current.dispatch({ type: "OPEN_FILTER_ACCODION" });
    });

    expect(result.current.state.isOpenFilterAccordion).toBe(true);
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
          imageUrl: "imageUrl",
          bestSeason: "bestSeason",
          panoramaUrl: "panoramaUrl",
          countries: [],
          categories: [],
          characteristics: [],
          worldViewFavorites: [],
        },
      ],
    });
  });

  expect(result.current.state.worldViews).toEqual([
    {
      id: 1,
      name: "name",
      imageUrl: "imageUrl",
      bestSeason: "bestSeason",
      panoramaUrl: "panoramaUrl",
      countries: [],
      categories: [],
      characteristics: [],
      worldViewFavorites: [],
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
