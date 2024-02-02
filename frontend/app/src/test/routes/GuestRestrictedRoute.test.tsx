import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GuestRestrictedRoute from "routes/GuestRestrictedRoute";

const mockHandleCheckGuestUser = jest.fn();
jest.mock("features/auth/hooks/useCheckGuestUser", () => ({
  __esModule: true,
  default: () => ({
    handleCheckGuestUser: mockHandleCheckGuestUser,
  }),
}));

test("GuestRestrictedRouteの入れ子のrouteのelementがレンダリングされること", async () => {
  render(
    <MemoryRouter initialEntries={["/guest-restricted"]}>
      <Routes>
        <Route path="/" element={<GuestRestrictedRoute />}>
          <Route path="/guest-restricted" element={<div>Content for Registered Users</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByText("Content for Registered Users")).toBeInTheDocument();
});

test("初回レンダリング時にhandleCheckGuestUser関数が呼び出されること", async () => {
  render(
    <MemoryRouter initialEntries={["/guest-restricted"]}>
      <Routes>
        <Route path="/" element={<GuestRestrictedRoute />}>
          <Route path="/guest-restricted" element={<div>Content for Registered Users</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(mockHandleCheckGuestUser).toHaveBeenCalledTimes(1);
});
