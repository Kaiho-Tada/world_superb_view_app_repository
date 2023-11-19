import { render, screen } from "@testing-library/react";
import {
  SuperbViewListProvider,
  useSuperbViewListContext,
} from "hooks/providers/SuperbViewListProvider";
import { FC } from "react";

describe("SuperbViewListProvider", () => {
  test("SuperbViewListProviderの子コンポーネントにSuperbViewListページに必要な値が提供されること", () => {
    const TestComponent: FC = () => {
      const { countryStates, categoryClassifications, riskLevels } = useSuperbViewListContext();
      return (
        <div>
          <div>countryStates: {countryStates.join(", ")}</div>
          <div>categoryClassifications: {categoryClassifications.join(", ")}</div>
          <div>riskLevelLabels: {riskLevels.map((riskLevel) => riskLevel.label).join(", ")}</div>
        </div>
      );
    };

    render(
      <SuperbViewListProvider>
        <TestComponent />
      </SuperbViewListProvider>
    );
    const countryStatesElement = screen.getByText(
      "countryStates: アジア, 大洋州, 北米, 中南米, ヨーロッパ, 中東, アフリカ"
    );
    expect(countryStatesElement).toBeInTheDocument();
    const categoryClassificationsElement = screen.getByText("categoryClassifications: 自然, 人工");
    expect(categoryClassificationsElement).toBeInTheDocument();
    const riskLeves = screen.getByText("riskLevelLabels: 4, 3, 2, 1, 0");
    expect(riskLeves).toBeInTheDocument();
  });
});
