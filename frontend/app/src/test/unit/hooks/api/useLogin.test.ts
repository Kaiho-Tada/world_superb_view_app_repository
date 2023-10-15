import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useLogin from "hooks/api/useLogin";
import Cookies from "js-cookie";
import client from "lib/api/client";

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

const setLoading = jest.fn();
const setIsSignedIn = jest.fn();
const setCurrentUser = jest.fn();

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

  const { result } = renderHook(() =>
    useLogin({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );

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

  expect(setLoading).toHaveBeenCalledWith(true);
  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);

  expect(Cookies.set).toHaveBeenCalledWith("_access_token", "access-token");
  expect(Cookies.set).toHaveBeenCalledWith("_client", "client");
  expect(Cookies.set).toHaveBeenCalledWith("_uid", "uid");

  expect(setIsSignedIn).toHaveBeenCalledWith(true);
  expect(setIsSignedIn).toHaveBeenCalledTimes(1);

  expect(setCurrentUser).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password",
  });
  expect(setCurrentUser).toHaveBeenCalledTimes(1);

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

  const { result } = renderHook(() =>
    useLogin({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );

  const { handleLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail("test@example.com");
    setPassword("incorrect-password");
  });

  await handleLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

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

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test("ログインエラー時のテスト", async () => {
  mockAxios.onPost("/auth/sign_in").reply(500);

  const { result } = renderHook(() =>
    useLogin({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );

  const { handleLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail("test@example.com");
    setPassword("incorrect-password");
  });

  await handleLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

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

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});
