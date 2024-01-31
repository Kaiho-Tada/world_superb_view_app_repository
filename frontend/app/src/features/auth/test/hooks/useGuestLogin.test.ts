import { renderHook } from "@testing-library/react";
import mockGuestLoginApi from "features/auth/api/guestLoginApi";
import useGuestLogin from "features/auth/hooks/useGuestLogin";
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

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  set: jest.fn(),
}));

jest.mock("features/auth/api/guestLoginApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("ゲストログイン成功時のテスト", async () => {
  (mockGuestLoginApi as jest.Mock).mockReturnValue({
    data: {
      data: {
        id: 1,
        email: "guest@example.com",
      },
    },
    headers: { "access-token": "access-token", client: "client", uid: "uid" },
  });

  const { result } = renderHook(() => useGuestLogin());
  const { handleGuestLogin } = result.current;
  await act(async () => {
    await handleGuestLogin();
  });

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
  expect(mockNavigate).toHaveBeenCalledWith("/home");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("ゲストログインエラー時のテスト", async () => {
  (mockGuestLoginApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useGuestLogin());
  const { handleGuestLogin } = result.current;
  await act(async () => {
    await handleGuestLogin();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(Cookies.set).toHaveBeenCalledTimes(0);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ゲストログイン時にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledTimes(0);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
