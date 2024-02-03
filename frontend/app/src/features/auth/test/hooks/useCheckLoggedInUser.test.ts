import { renderHook } from "@testing-library/react";
import mockGetCurrentUserApi from "features/auth/api/currentUserApi";
import useCheckLoggedInUser from "features/auth/hooks/useCheckLoggedInUser";
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

  const { result } = renderHook(() => useCheckLoggedInUser());
  const { handleCheckLoggedInUser } = result.current;
  await act(async () => {
    await handleCheckLoggedInUser();
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

test("エラーが発生した場合は、適切なエラーメッセージが表示され、ログイン画面にリダイレクトされること", async () => {
  (mockGetCurrentUserApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useCheckLoggedInUser());
  const { handleCheckLoggedInUser } = result.current;
  await act(async () => {
    await handleCheckLoggedInUser();
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
