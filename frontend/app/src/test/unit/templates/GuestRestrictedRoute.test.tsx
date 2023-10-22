import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import Home from "components/pages/Home";
import GuestRestrictedRoute from "components/templates/GuestRestrictedRoute";
import client from "lib/api/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

describe("GuestRestrictedRouteのテスト", () => {
  test("ログイン済みのユーザーはGuestRestrictedページにアクセスできること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 200,
    });
    render(
      <MemoryRouter initialEntries={["/guest-restricted"]}>
        <Routes>
          <Route path="/" element={<GuestRestrictedRoute />}>
            <Route path="/guest-restricted" element={<div>Guest Restricted Content</div>} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Guest Restricted Content")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseToast).not.toHaveBeenCalledWith();
      expect(mockUseNavigate).not.toHaveBeenCalledWith();
    });
  });

  test("未ログインのユーザーはログインページへ遷移されること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 500,
    });
    render(
      <MemoryRouter initialEntries={["/guest-restricted"]}>
        <Routes>
          <Route path="/" element={<GuestRestrictedRoute />}>
            <Route path="/guest-restricted" element={<div>Guest Restricted Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "ログインしてください。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      expect(mockUseToast).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  test("ゲストユーザーはhomeページに遷移されること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 200,
      currentUser: {
        id: 1,
        email: "guest@example.com",
      },
    });
    render(
      <MemoryRouter initialEntries={["/guest-restricted"]}>
        <Routes>
          <Route path="/" element={<GuestRestrictedRoute />}>
            <Route path="/guest-restricted" element={<div>Guest Restricted Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "ゲストユーザーはアクセスできません。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      expect(mockUseToast).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith("/home");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
