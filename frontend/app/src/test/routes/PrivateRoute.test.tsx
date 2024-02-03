import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";

const mockHandleCheckLoggedInUser = jest.fn();
jest.mock("features/auth/hooks/useCheckLoggedInUser", () => ({
  __esModule: true,
  default: () => ({
    handleCheckLoggedInUser: mockHandleCheckLoggedInUser,
  }),
}));

test("PrivateRouteの入れ子のrouteのelementがレンダリングされること", async () => {
  render(
    <MemoryRouter initialEntries={["/private"]}>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="private" element={<div>Content For LoggedIn User</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByText("Content For LoggedIn User")).toBeInTheDocument();
});

test("初回レンダリング時にhandleCheckAdminUser関数が呼び出されること", async () => {
  render(
    <MemoryRouter initialEntries={["/private"]}>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="private" element={<div>Content For LoggedIn User</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(mockHandleCheckLoggedInUser).toHaveBeenCalledTimes(1);
});
