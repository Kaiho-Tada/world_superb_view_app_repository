import { render, screen } from "@testing-library/react";
import RiskLevelStar from "components/molecules/RiskLevelStar";

test("propsで渡されたriskLevelと同じ数の星マークが表示されていること", () => {
  render(<RiskLevelStar maxRiskLevel={3} />);
  const riskLevel = screen.getAllByRole("img", { name: "リスクレベル" });
  expect(riskLevel.length).toBe(3);
});
