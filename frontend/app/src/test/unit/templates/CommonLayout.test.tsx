import { render, screen } from "@testing-library/react";
import CommonLayout from "components/templates/CommonLayout";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

test("CommonLayoutに渡した子要素がheaderと共にレンダリングされること", () => {
  render(
    <CommonLayout>
      <div>Child</div>
    </CommonLayout>
  );
  const header = screen.getByRole("navigation");
  expect(header).toBeInTheDocument();

  const childText = screen.getByText("Child");
  expect(childText).toBeInTheDocument();
});
