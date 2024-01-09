import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useDeleteUser from "features/auth/hooks/useDeleteUser";
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

test("アカウント削除成功時の処理のテスト", async () => {
  mockAxios.onDelete("auth").reply(200, {
    message: "'test@example.com' のアカウントは削除されました。",
  });

  const { result } = renderHook(() => useDeleteUser());
  const { handleDeleteUser } = result.current;
  await handleDeleteUser();

  expect(Cookies.remove).toHaveBeenCalledWith("_access_token");
  expect(Cookies.remove).toHaveBeenCalledWith("_client");
  expect(Cookies.remove).toHaveBeenCalledWith("_uid");

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).toHaveBeenCalledWith(false);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

  expect(mockSetCurrentUser).toHaveBeenCalledWith(undefined);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "'test@example.com' のアカウントは削除されました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("アカウント削除失敗時の処理のテスト", async () => {
  mockAxios.onDelete("auth").reply(404, {
    errors: ["削除するアカウントが見つかりません。"],
  });

  const { result } = renderHook(() => useDeleteUser());
  const { handleDeleteUser } = result.current;
  await handleDeleteUser();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "削除するアカウントが見つかりません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("アカウント削除エラー時の処理のテスト", async () => {
  mockAxios.onDelete("auth").reply(500);

  const { result } = renderHook(() => useDeleteUser());
  const { handleDeleteUser } = result.current;

  await handleDeleteUser();

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

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("ゲストユーザーによるアカウント削除時の処理のテスト", async () => {
  mockAxios.onDelete("auth").reply(200, {
    status: 403,
    message: "ゲストユーザーは許可されていません。",
  });

  const { result } = renderHook(() => useDeleteUser());
  const { handleDeleteUser } = result.current;

  await handleDeleteUser();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ゲストユーザーは許可されていません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
