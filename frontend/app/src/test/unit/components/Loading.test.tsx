import { render, screen } from "@testing-library/react";
import Loading from "components/atoms/Loading";

test("loading-spinnerがレンダリングされていること", () => {
  render(<Loading />);
  const spinner = screen.getByText("Loading...");
  expect(spinner).toBeInTheDocument();
});
