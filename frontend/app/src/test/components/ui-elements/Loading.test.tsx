import { render, screen } from "@testing-library/react";
import Loading from "components/ui-elements/Loading";

test("loading-spinnerがレンダリングされていること", () => {
  render(<Loading />);
  const spinner = screen.getByText("Loading...");
  expect(spinner).toBeInTheDocument();
});
