import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDrawerAccordion from "features/worldView/components/ui-parts/FilterDrawerAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();
const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    categoryCheckBoxItems: [{ label: "滝", parentLabel: "自然", checked: false }],
    countryCheckBoxItems: [{ label: "中国", parentLabel: "アジア", checked: false }],
    characteristicCheckBoxItems: [{ label: "雄大", checked: false }],
    riskLevelCheckBoxItems: [{ label: "4", checked: false }],
    monthCheckBoxItems: [{ label: "1月", parentLabel: "冬", checked: false }],
    bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
  },
};

test("キーワードのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "キーワード" })).toBeInTheDocument();
});

test("キーワードのアコーディオンボタン押下でFilterSearchBoxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "キーワード" }));
  });
  expect(screen.getByRole("searchbox")).toBeInTheDocument();
});

test("カテゴリーのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "カテゴリー" })).toBeInTheDocument();
});

test("カテゴリーのアコーディオンボタン押下でcategoryのcheckboxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "カテゴリー" }));
  });
  expect(screen.getByRole("checkbox", { name: "自然" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
});

test("categoryのチェックボックス押下でcategoryを更新するdispatch関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "カテゴリー" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "滝" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CATEGORY_CHECKBOX_ITEMS",
    payload: [{ label: "滝", parentLabel: "自然", checked: true }],
  });
});

test("地域のアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "地域" })).toBeInTheDocument();
});

test("地域のアコーディオンボタン押下でcountryのcheckboxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "地域" }));
  });
  expect(screen.getByRole("checkbox", { name: "アジア" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "中国" })).toBeInTheDocument();
});

test("countryのチェックボックス押下でcountryを更新するdispatch関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "地域" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "中国" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_COUNTRY_CHECKBOX_ITEMS",
    payload: [{ label: "中国", parentLabel: "アジア", checked: true }],
  });
});

test("属性のアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "属性" })).toBeInTheDocument();
});

test("属性のアコーディオンボタン押下でcharacteristicのcheckboxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "属性" }));
  });
  expect(screen.getByRole("checkbox", { name: "雄大" })).toBeInTheDocument();
});

test("characteristicのcheckbox押下でcharacteristicを更新するdispatch関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "属性" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "雄大" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHARACTERISTIC_CHECKBOX_ITEMS",
    payload: [{ label: "雄大", checked: true }],
  });
});

test("危険度のアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "危険度" })).toBeInTheDocument();
});

test("危険度のアコーディオンボタン押下でriskLevelのcheckboxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "危険度" }));
  });
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
  const riskLevel = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevel.length).toBe(4);
});

test("ベストシーズンのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "ベストシーズン" })).toBeInTheDocument();
});

test("ベストシーズンのアコーディオンボタン押下でmonthのCheckBoxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ベストシーズン" }));
  });
  expect(screen.getByRole("checkbox", { name: "冬" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "1月" })).toBeInTheDocument();
});

test("monthのCheckBox押下でmonthを更新するdispatch関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ベストシーズン" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "1月" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_MONTH_CHECKBOX_ITEMS",
    payload: [{ label: "1月", parentLabel: "冬", checked: true }],
  });
});

test("BMIのアコーディオンボタンがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<FilterDrawerAccordion />);
  expect(screen.getByRole("button", { name: "BMI" })).toBeInTheDocument();
});

test("BMIのアコーディオンボタン押下でbmiのCheckBoxが表示されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "BMI" }));
  });
  expect(screen.getByRole("checkbox", { name: "0%〜10%" })).toBeInTheDocument();
});

test("bmiのCheckBox押下でbmiを更新するdispatch関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<FilterDrawerAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "BMI" }));
  });
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "0%〜10%" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_BMI_CHECKBOX_ITEMS",
    payload: [{ label: "0%〜10%", checked: true }],
  });
});
