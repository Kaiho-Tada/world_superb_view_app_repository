import { renderHook } from "@testing-library/react";
import mockDeleteUserApi from "features/auth/api/deleteUserApi";
import useDeleteUser from "features/auth/hooks/useDeleteUser";
import Cookies from "js-cookie";
import { act } from "react-dom/test-utils";

const mockSetCurrentUser = jest.fn();
const mockSetLoading = jest.fn();
const mockSetIsSignedIn = jest.fn();
jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setCurrentUser: mockSetCurrentUser,
    setLoading: mockSetLoading,
    setIsSignedIn: mockSetIsSignedIn,
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  remove: jest.fn(),
}));

jest.mock("features/auth/api/deleteUserApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("アカウント削除成功時の処理のテスト", async () => {
  (mockDeleteUserApi as jest.Mock).mockReturnValue({
    data: { message: "'test@example.com' のアカウントは削除されました。" },
  });
  const { result } = renderHook(() => useDeleteUser());
  const { handleDeleteUser } = result.current;
  await act(async () => {
    await handleDeleteUser();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(Cookies.remove).toHaveBeenCalledWith("_access_token");
  expect(Cookies.remove).toHaveBeenCalledWith("_client");
  expect(Cookies.remove).toHaveBeenCalledWith("_uid");
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
  expect(mockNavigate).toHaveBeenCalledWith("/login");
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("アカウント削除エラー時の処理のテスト", async () => {
  (mockDeleteUserApi as jest.Mock).mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 500 },
    });
    throw error;
  });

  const { result } = renderHook(() => useDeleteUser());
  const { handleDeleteUser } = result.current;
  await act(async () => {
    await handleDeleteUser();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(Cookies.remove).toHaveBeenCalledTimes(0);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "サーバーでエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

describe("アカウント削除失敗時の処理のテスト", () => {
  test("deleteUserApi関数が403番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
    (mockDeleteUserApi as jest.Mock).mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: { status: 403, data: { error: "ゲストユーザーは許可されていません。" } },
      });
      throw error;
    });

    const { result } = renderHook(() => useDeleteUser());
    const { handleDeleteUser } = result.current;
    await act(async () => {
      await handleDeleteUser();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(Cookies.remove).toHaveBeenCalledTimes(0);
    expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
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

  test("deleteUserApi関数が404番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
    (mockDeleteUserApi as jest.Mock).mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: { status: 404, data: { errors: ["削除するアカウントが見つかりません。"] } },
      });
      throw error;
    });

    const { result } = renderHook(() => useDeleteUser());
    const { handleDeleteUser } = result.current;
    await act(async () => {
      await handleDeleteUser();
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(Cookies.remove).toHaveBeenCalledTimes(0);
    expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
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
});
