import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import useLogin from "features/auth/hooks/useLogin";
import Cookies from "js-cookie";

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
  set: jest.fn(),
}));

const spyOnLoginApi = jest.spyOn(jest.requireActual("features/auth/api/loginApi"), "default");

test("ログイン成功時のテスト", async () => {
  spyOnLoginApi.mockReturnValue({
    data: { data: { id: 1, email: "test@example.com" } },
    headers: { "access-token": "access-token", client: "client", uid: "uid" },
  });

  const { result } = renderHook(() => useLogin());
  const { setEmail, setPassword } = result.current;
  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });
  const { handleLogin } = result.current;
  const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleLogin(mockEvent as React.FormEvent<HTMLFormElement>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnLoginApi).toHaveBeenCalledWith({ email: "test@example.com", password: "password" });
  expect(Cookies.set).toHaveBeenCalledWith("_access_token", "access-token");
  expect(Cookies.set).toHaveBeenCalledWith("_client", "client");
  expect(Cookies.set).toHaveBeenCalledWith("_uid", "uid");
  expect(mockSetIsSignedIn).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);
  expect(mockSetCurrentUser).toHaveBeenCalledWith({ id: 1, email: "test@example.com" });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ログインしました。",
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

test("ログイン失敗時のテスト", async () => {
  spyOnLoginApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: {
        status: 401,
        data: { errors: ["ログイン用の認証情報が正しくありません。再度お試しください。"] },
      },
    });
    throw error;
  });

  const { result } = renderHook(() => useLogin());
  const { setEmail, setPassword } = result.current;
  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });
  const { handleLogin } = result.current;
  const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleLogin(mockEvent as React.FormEvent<HTMLFormElement>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnLoginApi).toHaveBeenCalledWith({ email: "test@example.com", password: "password" });
  expect(Cookies.set).toHaveBeenCalledTimes(0);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
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
  spyOnLoginApi.mockRejectedValue(new Error());

  const { result } = renderHook(() => useLogin());
  const { setEmail, setPassword } = result.current;
  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });
  const { handleLogin } = result.current;
  const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleLogin(mockEvent as React.FormEvent<HTMLFormElement>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnLoginApi).toHaveBeenCalledWith({ email: "test@example.com", password: "password" });
  expect(Cookies.set).toHaveBeenCalledTimes(0);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ログイン中にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
