import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AuthorizationRoute from "routes/AuthorizationRoute";

const mockHandleAuthorizeUser = jest.fn();
const loading = false;
test("AuthorizationRouteの入れ子のrouteのelementがレンダリングされること", async () => {
  render(
    <MemoryRouter initialEntries={["/user-check"]}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthorizationRoute handleAuthorizeUser={mockHandleAuthorizeUser} loading={loading} />
          }
        >
          <Route path="/user-check" element={<div>Welcome, Authorized User!</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByText("Welcome, Authorized User!")).toBeInTheDocument();
});

test("AuthorizationRouteのloadingプロパティがtrueの場合はloading中であること", async () => {
  render(
    <MemoryRouter initialEntries={["/user-check"]}>
      <Routes>
        <Route
          path="/"
          element={<AuthorizationRoute handleAuthorizeUser={mockHandleAuthorizeUser} loading />}
        >
          <Route path="/user-check" element={<div>Welcome, Authorized User!</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
});

test("初回レンダリング時にhandleCheckUser関数が呼び出されること", async () => {
  render(
    <MemoryRouter initialEntries={["/user-check"]}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthorizationRoute handleAuthorizeUser={mockHandleAuthorizeUser} loading={loading} />
          }
        >
          <Route path="/user-check" element={<div>Welcome, Authorized User!</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  expect(mockHandleAuthorizeUser).toHaveBeenCalledTimes(1);
});
