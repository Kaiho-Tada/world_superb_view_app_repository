import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "routes/AdminRoute";

const mockHandleCheckAdminUser = jest.fn();
jest.mock("features/auth/hooks/useCheckAdminUser", () => ({
  __esModule: true,
  default: () => ({
    handleCheckAdminUser: mockHandleCheckAdminUser,
  }),
}));

test("AdminRouteの入れ子のrouteのelementがレンダリングされること", async () => {
  render(
    <MemoryRouter initialEntries={["/admin-url"]}>
      <Routes>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin-url" element={<div>Content For Admin User</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByText("Content For Admin User")).toBeInTheDocument();
});

test("初回レンダリング時にhandleCheckAdminUser関数が呼び出されること", async () => {
  render(
    <MemoryRouter initialEntries={["/admin-url"]}>
      <Routes>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin-url" element={<div>Content For Admin User</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(mockHandleCheckAdminUser).toHaveBeenCalledTimes(1);
});
