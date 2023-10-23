import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import PrivateRoute from "components/templates/PrivateRoute";
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

describe("PrivateRouteのテスト", () => {
  test("未ログインのユーザーはログインページへ遷移されること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 500,
    });
    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/private" element={<div>Private Content</div>} />
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

  test("ログイン済みのユーザーはプライベートページにアクセスできること", async () => {
    mockAxios.onGet("auth/sessions").reply(200, {
      status: 200,
    });
    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/private" element={<div>Private Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText("Private Content")).toBeInTheDocument();
    await waitFor(() => {
      expect(mockUseToast).not.toHaveBeenCalledWith();
      expect(mockUseNavigate).not.toHaveBeenCalledWith();
    });
  });
});
