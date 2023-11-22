import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDrawerAccordion from "components/organisms/FilterDrawerAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();
const countryStates = ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"];
const categoryClassifications = ["自然", "人工"];
const mockOnCloseFilterDrawer = jest.fn();

jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    countryStates,
    categoryClassifications,
    getAllCategoriesWithCheckBoxData: jest.fn(),
    categoriesWithCheckBoxData: [
      {
        label: "滝",
        classification: "自然",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
    getAllCountriesWithCheckBoxData: jest.fn(),
    countriesWithCheckBoxData: [
      {
        label: "アメリカ",
        stateName: "北米",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
    getAllCharacteristicsWithCheckBoxData: jest.fn(),
    characteristicsWithCheckBoxData: [
      {
        label: "雄大",
        superbViewNames: ["superbView1", "superbView2"],
        checked: false,
      },
    ],
    riskLevels: [
      {
        label: "4",
        checked: false,
      },
    ],
    onCloseFilterDrawer: mockOnCloseFilterDrawer,
  }),
}));

const mockHandleClear = jest.fn();
jest.mock("hooks/api/clear/useClear", () => ({
  __esModule: true,
  default: () => ({ handleClear: mockHandleClear }),
}));

test("closeBottunがレンダリングされていること", () => {
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
});

test("closeBottun押下でonCloseFilterDrawer関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const closeBottun = screen.getByRole("button", { name: "Close" });
  await act(async () => {
    await user.click(closeBottun);
  });
  expect(mockOnCloseFilterDrawer).toHaveBeenCalledTimes(1);
});

test("アコーディオンの見出しがレンダリングされていること", () => {
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("heading", { name: "絞り込み" })).toBeInTheDocument();
});

test("カテゴリーのアコーディオンボタンがレンダリングされていること", () => {
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "カテゴリー" })).toBeInTheDocument();
});

test("カテゴリーのアコーディオンボタン押下でcategoryClassificationのアコーディオンボタンが表示されること", async () => {
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const button = screen.getByRole("button", { name: "カテゴリー" });
  await act(async () => {
    await user.click(button);
  });
  expect(screen.getByRole("button", { name: "自然" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "人工" })).toBeInTheDocument();
});

test("categoryClassificationのアコーディオンボタン押下でカテゴリーのcheckboxが表示されること", async () => {
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const categoryButton = screen.getByRole("button", { name: "カテゴリー" });
  await act(async () => {
    await user.click(categoryButton);
  });
  const natureButton = screen.getByRole("button", { name: "自然" });
  await act(async () => {
    await user.click(natureButton);
  });
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
});

test("地域のアコーディオンボタンがレンダリングされていること", () => {
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "地域" })).toBeInTheDocument();
});

test("地域のアコーディオンボタン押下でcountryStateのアコーディオンボタンが表示されること", async () => {
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
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "属性" })).toBeInTheDocument();
});

test("属性のアコーディオンボタン押下で属性のcheckboxが表示されること", async () => {
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const characteristicButton = screen.getByRole("button", { name: "属性" });
  await act(async () => {
    await user.click(characteristicButton);
  });
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeInTheDocument();
});

test("危険度のアコーディオンボタンがレンダリングされていること", () => {
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "危険度" })).toBeInTheDocument();
});

test("危険度のアコーディオンボタン押下でリスクレベルのcheckboxが表示されること", async () => {
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
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("クリアボタン押下でhandleClear関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  const clearButton = screen.getByRole("button", { name: "クリア" });
  await act(async () => {
    await user.click(clearButton);
  });
  expect(mockHandleClear).toHaveBeenCalledTimes(1);
});
