import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordion from "features/worldView/components/ui-parts/FilterAccordion";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: () => ({
    state: {
      categoryCheckBoxItems: [{ label: "滝", parentLabel: "自然", checked: false }],
      countryCheckBoxItems: [{ label: "中国", parentLabel: "アジア", checked: false }],
      characteristicCheckBoxItems: [{ label: "幻想・神秘的", checked: false }],
      riskLevelCheckBoxItems: [{ label: "4", checked: false }],
      monthCheckBoxItems: [{ label: "1月", parentLabel: "冬", checked: false }],
      bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
      keyword: "",
    },
  }),
}));

test("アコーディオンがレンダリングされていること", () => {
  render(<FilterAccordion />);
  expect(screen.getByRole("region", { name: "絞り込みのアコーディオン" })).toBeInTheDocument();
});

test("アコーディオンボタンがレンダリングされていること", () => {
  render(<FilterAccordion />);
  expect(screen.getByRole("button", { name: "フィルター" })).toBeInTheDocument();
});

test("アコーディオンボタン押下でAccordionPanelが表示されること", async () => {
  const user = userEvent.setup();
  render(<FilterAccordion />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "フィルター" }));
  });
  expect(
    screen.getByRole("region", { name: "絞り込みのアコーディオンパネル" })
  ).toBeInTheDocument();
});
