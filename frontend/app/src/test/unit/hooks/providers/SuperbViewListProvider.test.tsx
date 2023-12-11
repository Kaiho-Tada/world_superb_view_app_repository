import { render, screen } from "@testing-library/react";
import {
  SuperbViewListProvider,
  useSuperbViewListContext,
} from "hooks/providers/SuperbViewListProvider";
import { FC } from "react";

describe("SuperbViewListProvider", () => {
  test("SuperbViewListProviderの子コンポーネントにSuperbViewListページに必要な値が提供されること", () => {
    const TestComponent: FC = () => {
      const { countryStates, categoryClassifications, riskLevels, monthCheckBoxItems } =
        useSuperbViewListContext();
      return (
        <div>
          <div>countryStates: {countryStates.join(", ")}</div>
          <div>categoryClassifications: {categoryClassifications.join(", ")}</div>
          <div>riskLevelLabels: {riskLevels.map((riskLevel) => riskLevel.label).join(", ")}</div>
          <div>
            monthCheckBoxItems:{" "}
            {monthCheckBoxItems.map((monthCheckBoxItem) => monthCheckBoxItem.label).join(", ")}
          </div>
        </div>
      );
    };

    const { debug } = render(
      <SuperbViewListProvider>
        <TestComponent />
      </SuperbViewListProvider>
    );
    debug();
    const countryStatesElement = screen.getByText(
      "countryStates: アジア, 大洋州, 北米, 中南米, ヨーロッパ, 中東, アフリカ"
    );
    expect(countryStatesElement).toBeInTheDocument();
    const categoryClassificationsElement = screen.getByText("categoryClassifications: 自然, 人工");
    expect(categoryClassificationsElement).toBeInTheDocument();
    const riskLeves = screen.getByText("riskLevelLabels: 4, 3, 2, 1, 0");
    expect(riskLeves).toBeInTheDocument();
    expect(
      screen.getByText(
        "monthCheckBoxItems: 1月, 2月, 3月, 4月, 5月, 6月, 7月, 8月, 9月, 10月, 11月, 12月"
      )
    ).toBeInTheDocument();
  });
});
