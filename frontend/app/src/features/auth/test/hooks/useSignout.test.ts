import { renderHook } from "@testing-library/react";
import mockSignoutApi from "features/auth/api/signOutApi";
import useSignout from "features/auth/hooks/useSignout";
import Cookies from "js-cookie";
import { act } from "react-dom/test-utils";

const mockSetIsSignedIn = jest.fn();
const mockSetCurrentUser = jest.fn();
const mockSetLoading = jest.fn();
jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setIsSignedIn: mockSetIsSignedIn,
    setCurrentUser: mockSetCurrentUser,
    setLoading: mockSetLoading,
  }),
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  remove: jest.fn(),
}));

jest.mock("features/auth/api/signOutApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("サインアウト成功時の処理のテスト", async () => {
  const { result } = renderHook(() => useSignout());
  const { handleSignout } = result.current;
  await act(async () => {
    await handleSignout();
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
  (mockSignoutApi as jest.Mock).mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: {
        status: 404,
        data: { errors: ["ユーザーが見つからないか、ログインしていません。"] },
      },
    });
    throw error;
  });

  const { result } = renderHook(() => useSignout());
  const { handleSignout } = result.current;
  await act(async () => {
    await handleSignout();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(Cookies.remove).toHaveBeenCalledTimes(0);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ユーザーが見つからないか、ログインしていません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("サインアウトのエラー時のテスト", async () => {
  (mockSignoutApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useSignout());
  const { handleSignout } = result.current;
  await act(async () => {
    await handleSignout();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(Cookies.remove).toHaveBeenCalledTimes(0);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "サインアウト時にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
