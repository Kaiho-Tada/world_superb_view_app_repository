import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGuestLogin from "features/auth/hooks/useGuestLogin";
import Cookies from "js-cookie";
import client from "lib/client";

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

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  set: jest.fn(),
}));

const mockSetLoading = jest.fn();
const mockSetCurrentUser = jest.fn();
const mockSetIsSignedIn = jest.fn();

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setLoading: mockSetLoading,
    setCurrentUser: mockSetCurrentUser,
    setIsSignedIn: mockSetIsSignedIn,
  }),
}));

client.interceptors.response.use((config) => {
  const modifiedConfig = {
    ...config,
    headers: { ...config.headers, "access-token": "access-token", client: "client", uid: "uid" },
  };
  return modifiedConfig;
});

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

test("ゲストログイン成功時のテスト", async () => {
  mockAxios.onPost("/auth/sessions/guest_login").reply(200, {
    status: 200,
    data: {
      id: 1,
      email: "guest@example.com",
    },
  });
  const { result } = renderHook(() => useGuestLogin());
  const { handleGuestLogin } = result.current;
  await handleGuestLogin();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(Cookies.set).toHaveBeenCalledWith("_access_token", "access-token");
  expect(Cookies.set).toHaveBeenCalledWith("_client", "client");
  expect(Cookies.set).toHaveBeenCalledWith("_uid", "uid");

  expect(mockSetIsSignedIn).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

  expect(mockSetCurrentUser).toHaveBeenCalledWith({
    id: 1,
    email: "guest@example.com",
  });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ゲストログインしました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).toHaveBeenCalledWith("/home");
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("ゲストログインエラー時のテスト", async () => {
  mockAxios.onPost("/auth/sessions/guest_login").reply(500);
  const { result } = renderHook(() => useGuestLogin());
  const { handleGuestLogin } = result.current;
  await handleGuestLogin();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
