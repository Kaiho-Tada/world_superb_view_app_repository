import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewList from "features/map/components/ui-parts/WorldViewList";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockClickedViews = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  name: `worldView${index + 1}`,
  imgUrl: "画像URL",
  countries: [{ id: index + 1, name: `country${index + 1}`, riskLevel: 1, bmi: 1 }],
}));

test("絶景一覧が表示されていること", () => {
  render(<WorldViewList clickedViews={mockClickedViews} />);
  expect(screen.getByRole("list", { name: "絶景一覧" }));
});

test("リストアイテムが表示されていること", () => {
  render(<WorldViewList clickedViews={mockClickedViews} />);
  const listItem = screen.getAllByRole("listitem");
  expect(listItem.length).toBe(3);
});

test("レコード名が表示されていること", () => {
  render(<WorldViewList clickedViews={mockClickedViews} />);
  for (let i = 1; i <= 3; i += 1) {
    expect(screen.getByText(`worldView${i}`)).toBeInTheDocument();
  }
});

test("レコード名の国名が表示されていること", () => {
  render(<WorldViewList clickedViews={mockClickedViews} />);
  for (let i = 1; i <= 3; i += 1) {
    expect(screen.getByText(`country${i}`)).toBeInTheDocument();
  }
});

test("リストアイテム押下で詳細ページに遷移すること", async () => {
  const user = userEvent.setup();
  render(<WorldViewList clickedViews={mockClickedViews} />);
  const listItem = screen.getAllByRole("listitem");
  await act(async () => {
    await user.click(listItem[0]);
  });
  expect(mockNavigate).toHaveBeenCalledWith("/world_views/1");
});
