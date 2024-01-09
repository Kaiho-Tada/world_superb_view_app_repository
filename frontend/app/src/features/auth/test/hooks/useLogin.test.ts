import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useLogin from "features/auth/hooks/useLogin";
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

test("ログイン成功時のテスト", async () => {
  mockAxios.onPost("/auth/sign_in").reply((config) => {
    const data = JSON.parse(config.data);
    return [200, { data }];
  });

  const { result } = renderHook(() => useLogin());

  const { setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });

  const { handleLogin } = result.current;

  await handleLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);

  expect(Cookies.set).toHaveBeenCalledWith("_access_token", "access-token");
  expect(Cookies.set).toHaveBeenCalledWith("_client", "client");
  expect(Cookies.set).toHaveBeenCalledWith("_uid", "uid");

  expect(mockSetIsSignedIn).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

  expect(mockSetCurrentUser).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password",
  });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).toHaveBeenCalledWith("/home");
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ログインしました",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
});

test("ログイン失敗時のテスト", async () => {
  mockAxios.onPost("/auth/sign_in").reply(401, {
    errors: ["ログイン用の認証情報が正しくありません。再度お試しください。"],
  });

  const { result } = renderHook(() => useLogin());

  const { handleLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail("test@example.com");
    setPassword("incorrect-password");
  });

  await handleLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ログイン用の認証情報が正しくありません。再度お試しください。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("ログインエラー時のテスト", async () => {
  mockAxios.onPost("/auth/sign_in").reply(500);

  const { result } = renderHook(() => useLogin());

  const { handleLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail("test@example.com");
    setPassword("incorrect-password");
  });

  await handleLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
