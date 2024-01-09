import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useSignout from "features/auth/hooks/useSignout";
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
  get: jest.fn(),
  remove: jest.fn(),
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

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

test("サインアウト成功時の処理のテスト", async () => {
  mockAxios.onDelete("auth/sign_out").reply(200);

  const { result } = renderHook(() => useSignout());
  const { handleSignout } = result.current;
  await handleSignout();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(Cookies.remove).toHaveBeenCalledWith("_access_token");
  expect(Cookies.remove).toHaveBeenCalledWith("_client");
  expect(Cookies.remove).toHaveBeenCalledWith("_uid");

  expect(mockSetIsSignedIn).toHaveBeenCalledWith(false);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

  expect(mockSetCurrentUser).toHaveBeenCalledWith(undefined);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

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

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("サインアウト失敗時のテスト", async () => {
  mockAxios.onDelete("auth/sign_out").reply(404, {
    errors: ["ユーザーが見つからないか、ログインしていません。"],
  });

  const { result } = renderHook(() => useSignout());
  const { handleSignout } = result.current;
  await handleSignout();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

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

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("サインアウトのエラー時のテスト", async () => {
  mockAxios.onDelete("auth/sign_out").reply(500);

  const { result } = renderHook(() => useSignout());
  const { handleSignout } = result.current;
  await handleSignout();

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
