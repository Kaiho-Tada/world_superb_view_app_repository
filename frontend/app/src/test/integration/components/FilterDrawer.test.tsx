import { render, screen } from "@testing-library/react";
import FilterDrawer from "components/organisms/FilterDrawer";

const mockOnCloseFilterDrawer = jest.fn();
const countryStates = ["アジア", "大洋州", "北米", "中南米", "ヨーロッパ", "中東", "アフリカ"];
const categoryClassifications = ["自然", "人工"];
jest.mock("hooks/providers/SuperbViewListProvider", () => ({
  ...jest.requireActual("hooks/providers/SuperbViewListProvider"),
  useSuperbViewListContext: () => ({
    onCloseFilterDrawer: mockOnCloseFilterDrawer,
    isOpenFilterDrawer: true,
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
    loadingSearchSuperbViews: false,
    checkedCategoryLabels: ["遺跡"],
    checkedCountryLabels: ["中国"],
    checkedCharacteristicLabels: ["畏怖"],
    checkedRiskLevelLabels: ["3"],
    keyword: "キーワード",
  }),
}));

test("isOpenFilterDrawerの値がtrueの場合、FilterDrawerAccordionがレンダリングされていること", () => {
  render(<FilterDrawer />);
  expect(screen.getByRole("region", { name: "FilterDrawerAccordion" })).toBeInTheDocument();
});
