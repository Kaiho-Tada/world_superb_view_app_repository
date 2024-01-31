import { renderHook } from "@testing-library/react";
import mockGetCurrentUserApi from "features/auth/api/currentUserApi";
import useGetCurrentUser from "features/auth/hooks/useGetCurrentUser";
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

jest.mock("features/auth/api/currentUserApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("currentUser取得成功時の処理のテスト", async () => {
  (mockGetCurrentUserApi as jest.Mock).mockReturnValue({
    data: {
      status: 200,
      currentUser: {
        id: 1,
        email: "test@example.com",
        name: "name",
        nickanme: "nickname",
      },
    },
  });

  const { result } = renderHook(() => useGetCurrentUser());
  const { handelGetCurrentUser } = result.current;
  await act(async () => {
    await handelGetCurrentUser();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);
  expect(mockSetCurrentUser).toHaveBeenCalledWith({
    id: 1,
    email: "test@example.com",
    name: "name",
    nickanme: "nickname",
  });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("currentUser取得エラー時の処理のテスト", async () => {
  (mockGetCurrentUserApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useGetCurrentUser());
  const { handelGetCurrentUser } = result.current;
  await act(async () => {
    await handelGetCurrentUser();
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "current_user取得時にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
