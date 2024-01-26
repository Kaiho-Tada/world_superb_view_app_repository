import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordion from "features/worldView/components/ui-parts/FilterAccordion";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockContextValue = {
  state: {
    categoryCheckBoxItems: [{ label: "滝", parentLabel: "自然", checked: false }],
    countryCheckBoxItems: [{ label: "中国", parentLabel: "アジア", checked: false }],
    characteristicCheckBoxItems: [{ label: "雄大", checked: false }],
    riskLevelCheckBoxItems: [{ label: "4", checked: false }],
    monthCheckBoxItems: [{ label: "1月", parentLabel: "冬", checked: false }],
    bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
    loadingSearchWorldViews: false,
    keyword: "キーワード",
    isOpenFilterAccordion: true,
  },
};

const mockContextValueLoadingSearchWorldViews = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

const mockContextValueEmptyKeyword = {
  state: {
    ...mockContextValue.state,
    keyword: "",
  },
};

const mockContextValueNotOpenFilterAccordion = {
  state: {
    ...mockContextValue.state,
    isOpenFilterAccordion: false,
  },
};

test("アコーディオンがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<FilterAccordion />);
  expect(screen.getByRole("region", { name: "絞り込み" })).toBeInTheDocument();
});

test("アコーディオンの見出しがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<FilterAccordion />);
  expect(screen.getByRole("heading", { name: "絞り込み" })).toBeInTheDocument();
});

test("クリアボタンがレンダリングされていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<FilterAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
});

test("loadingSearchWorldViewsがtrueの場合、クリアボタンが押下不可になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
    mockContextValueLoadingSearchWorldViews
  );
  render(<FilterAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeDisabled();
});

test("useGetCheckedLabels関数で返されるlabelsが空でかつkeywordが空文字の場合、クリアボタンが押下不可になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueEmptyKeyword);
  const spyOnUseGetCheckedLabels = jest.spyOn(
    jest.requireActual("features/worldView/hooks/useGetCheckedLabels"),
    "default"
  );
  spyOnUseGetCheckedLabels.mockReturnValue({
    checkedLabelObject: {
      categoryLabels: [],
      countryLabels: [],
      characteristicLabels: [],
      riskLevelLabels: [],
      monthLabels: [],
      bmiLabels: [],
    },
  });
  render(<FilterAccordion />);
  expect(screen.getByRole("button", { name: "クリア" })).toBeDisabled();

  spyOnUseGetCheckedLabels.mockRestore();
});

test("クリアボタン押下でhandleClear関数が実行されること", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
  const spyOnUseClear = jest.spyOn(
    jest.requireActual("features/worldView//hooks/useClear"),
    "default"
  );
  const mockHandleClear = jest.fn();
  spyOnUseClear.mockReturnValue({ handleClear: mockHandleClear });

  const user = userEvent.setup();
  render(<FilterAccordion />);
  const clearButton = screen.getByRole("button", { name: "クリア" });
  await act(async () => {
    await user.click(clearButton);
  });
  expect(mockHandleClear).toHaveBeenCalledTimes(1);
  spyOnUseClear.mockRestore();
});

test("isOpenFilterAccordionがfalseの場合、アコーディオンが非表示になっていること", () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
    mockContextValueNotOpenFilterAccordion
  );
  render(<FilterAccordion />);
  expect(screen.queryByRole("region", { name: "絞り込み" })).not.toBeInTheDocument();
});
