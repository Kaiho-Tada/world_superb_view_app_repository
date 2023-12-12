import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDrawerAccordion from "components/organisms/FilterDrawerAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();
const spyOnUseSuperbViewListContext = jest.spyOn(
  jest.requireActual("hooks/providers/SuperbViewListProvider"),
  "useSuperbViewListContext"
);

const countryStates = ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"];
const categoryClassifications = ["自然", "人工"];
const mockOnCloseFilterDrawer = jest.fn();

const mockContextValue = {
  countryStates,
  categoryClassifications,
  categoryCheckBoxItems: [
    {
      label: "滝",
      classification: "自然",
      checked: false,
    },
  ],
  countryCheckBoxItems: [
    {
      label: "アメリカ",
      stateName: "北米",
      checked: false,
    },
  ],
  characteristicCheckBoxItems: [
    {
      label: "雄大",
      checked: false,
    },
  ],
  riskLevels: [
    {
      label: "4",
      checked: false,
    },
  ],
  monthCheckBoxItems: [{ label: "1月", season: "冬", checked: false }],
  onCloseFilterDrawer: mockOnCloseFilterDrawer,
  loadingSearchSuperbViews: false,
  checkedCategoryLabels: [""],
};

const mockContextValueLoadingSearchSuperbViews = {
  ...mockContextValue,
  loadingSearchSuperbViews: true,
};

const mockContextValueEmptyCheckedLabelsAndEmptyKeyword = {
  ...mockContextValue,
  checkedCategoryLabels: [],
  checkedCountryLabels: [],
  checkedCharacteristicLabels: [],
  checkedRiskLevelLabels: [],
  checkedMonthLabels: [],
  keyword: "",
};

const mockHandleClear = jest.fn();
jest.mock("hooks/api/clear/useClear", () => ({
  __esModule: true,
  default: () => ({ handleClear: mockHandleClear }),
}));

test("closeBottunがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
});

test("closeBottun押下でonCloseFilterDrawer関数が実行されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const closeBottun = screen.getByRole("button", { name: "Close" });
  await act(async () => {
    await user.click(closeBottun);
  });
  expect(mockOnCloseFilterDrawer).toHaveBeenCalledTimes(1);
});

test("アコーディオンの見出しがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("heading", { name: "絞り込み" })).toBeInTheDocument();
});

test("カテゴリーのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "カテゴリー" })).toBeInTheDocument();
});

test("カテゴリーのアコーディオンボタン押下でカテゴリーのcheckboxが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const button = screen.getByRole("button", { name: "カテゴリー" });
  await act(async () => {
    await user.click(button);
  });
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "人工" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
});

test("地域のアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "地域" })).toBeInTheDocument();
});

test("地域のアコーディオンボタン押下でcountryStateのアコーディオンボタンが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const AreaButton = screen.getByRole("button", { name: "地域" });
  await act(async () => {
    await user.click(AreaButton);
  });
  expect(screen.getByRole("button", { name: "アジア" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "大洋州" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "北米" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "中南米" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ヨーロッパ" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "中東" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "アフリカ" })).toBeInTheDocument();
});

test("countryStateのアコーディオンボタン押下で国のcheckboxが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const AreaButton = screen.getByRole("button", { name: "地域" });
  await act(async () => {
    await user.click(AreaButton);
  });
  const stateButton = screen.getByRole("button", { name: "北米" });
  await act(async () => {
    await user.click(stateButton);
  });
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeInTheDocument();
});

test("属性のアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "属性" })).toBeInTheDocument();
});

test("属性のアコーディオンボタン押下で属性のcheckboxが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const characteristicButton = screen.getByRole("button", { name: "属性" });
  await act(async () => {
    await user.click(characteristicButton);
  });
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeInTheDocument();
});

test("危険度のアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "危険度" })).toBeInTheDocument();
});

test("危険度のアコーディオンボタン押下でリスクレベルのcheckboxが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);

  const riskLevelButton = screen.getByRole("button", { name: "危険度" });
  await act(async () => {
    await user.click(riskLevelButton);
  });
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
  const riskLevel = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevel.length).toBe(4);
});

test("クリアボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("loadingSearchSuperbViewsがtrueの場合、クリアボタンが押下不可になっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValueLoadingSearchSuperbViews);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeDisabled();
});

test("checkedLabelsが空配列でかつkeywordが空文字の場合、クリアボタンが押下不可になっていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(
    () => mockContextValueEmptyCheckedLabelsAndEmptyKeyword
  );
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeDisabled();
});

test("クリアボタン押下でhandleClear関数が実行されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const clearButton = screen.getByRole("button", { name: "クリア" });
  await act(async () => {
    await user.click(clearButton);
  });
  expect(mockHandleClear).toHaveBeenCalledTimes(1);
});

test("キーワードのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "キーワード" })).toBeInTheDocument();
});

test("キーワードのアコーディオンボタン押下でFilterSearchBoxが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "キーワード" }));
  });
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("ベストシーズンのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "ベストシーズン" })).toBeInTheDocument();
});

test("ベストシーズンのアコーディオンボタン押下でSeasonCheckBoxが表示されること", async () => {
  spyOnUseSuperbViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ベストシーズン" }));
  });
  expect(screen.getByRole("checkbox", { name: "冬" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "1月" })).toBeInTheDocument();
});
