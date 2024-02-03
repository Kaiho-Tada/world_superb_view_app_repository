import { renderHook } from "@testing-library/react";
import mockGetCurrentUserApi from "features/auth/api/currentUserApi";
import useAuthorizeAdminUser from "features/auth/hooks/useAuthorizeAdminUser";
import { act } from "react-dom/test-utils";

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

jest.mock("features/auth/api/currentUserApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("未ログインのユーザーに対して、適切なエラーメッセージが表示され、ログイン画面にリダイレクトされること", async () => {
  (mockGetCurrentUserApi as jest.Mock).mockReturnValue({ data: { status: 500 } });

  const { result } = renderHook(() => useAuthorizeAdminUser());
  const { handleAuthorizeAdminUser } = result.current;
  await act(async () => {
    await handleAuthorizeAdminUser();
  });

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ログインしてください。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/login");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});

test("管理者以外のログインユーザーに対して、適切なエラーメッセージが表示され、ホーム画面にリダイレクトされること", async () => {
  (mockGetCurrentUserApi as jest.Mock).mockReturnValue({
    data: { status: 200, currentUser: { role: "user" } },
  });

  const { result } = renderHook(() => useAuthorizeAdminUser());
  const { handleAuthorizeAdminUser } = result.current;
  await act(async () => {
    await handleAuthorizeAdminUser();
  });

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "一般ユーザーはアクセスできません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/home");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});

test("エラーが発生した場合は、適切なエラーメッセージが表示され、ログイン画面にリダイレクトされること", async () => {
  (mockGetCurrentUserApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useAuthorizeAdminUser());
  const { handleAuthorizeAdminUser } = result.current;
  await act(async () => {
    await handleAuthorizeAdminUser();
  });

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/login");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
