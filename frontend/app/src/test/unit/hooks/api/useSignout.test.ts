import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useSignout from "hooks/api/useSignout";
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
  get: jest.fn(),
  remove: jest.fn(),
}));

const setLoading = jest.fn();
const setIsSignedIn = jest.fn();
const setCurrentUser = jest.fn();

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

test("サインアウト成功時の処理のテスト", async () => {
  mockAxios.onDelete("auth/sign_out").reply(200);

  const { result } = renderHook(() =>
    useSignout({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );
  const { handleSignout } = result.current;
  await handleSignout();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(Cookies.remove).toHaveBeenCalledWith("_access_token");
  expect(Cookies.remove).toHaveBeenCalledWith("_client");
  expect(Cookies.remove).toHaveBeenCalledWith("_uid");

  expect(setIsSignedIn).toHaveBeenCalledWith(false);
  expect(setIsSignedIn).toHaveBeenCalledTimes(1);

  expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  expect(setCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "サインアウトしました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test("サインアウト失敗時のテスト", async () => {
  mockAxios.onDelete("auth/sign_out").reply(404, {
    errors: ["ユーザーが見つからないか、ログインしていません。"],
  });

  const { result } = renderHook(() =>
    useSignout({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );
  const { handleSignout } = result.current;
  await handleSignout();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ユーザーが見つからないか、ログインしていません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test("サインアウトのエラー時のテスト", async () => {
  mockAxios.onDelete("auth/sign_out").reply(500);

  const { result } = renderHook(() =>
    useSignout({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );
  const { handleSignout } = result.current;
  await handleSignout();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

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

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});
