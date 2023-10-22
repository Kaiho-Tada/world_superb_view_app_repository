import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import PublicRoute from "components/templates/PublicRoute";
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

describe("publicRouteのテスト", () => {
  test("ログイン済みのユーザーはhomeページに遷移されること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 200,
    });
    render(
      <MemoryRouter initialEntries={["/public"]}>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/public" element={<div>Public Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "既にログインしています。",
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

  test("未ログインのユーザーはpublicページにアクセスできること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 500,
    });
    render(
      <MemoryRouter initialEntries={["/public"]}>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/public" element={<div>Public Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Public Content")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseToast).not.toHaveBeenCalledWith();
      expect(mockUseNavigate).not.toHaveBeenCalledWith();
    });
  });
});
