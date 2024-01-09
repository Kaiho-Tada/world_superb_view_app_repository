import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useGetCurrentUser from "features/auth/hooks/useGetCurrentUser";
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

test("currentUser取得成功時の処理のテスト", async () => {
  mockAxios.onGet("auth/sessions").reply(200, {
    status: 200,
    currentUser: {
      id: 1,
      email: "test@example.com",
      name: "name",
      nickanme: "nickname",
    },
  });

  const { result } = renderHook(() => useGetCurrentUser());
  const { handelGetCurrentUser } = result.current;
  await handelGetCurrentUser();

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

test("currentUser取得失敗時の処理のテスト", async () => {
  mockAxios.onGet("auth/sessions").reply(200, {
    status: 500,
  });

  const { result } = renderHook(() => useGetCurrentUser());
  const { handelGetCurrentUser } = result.current;
  await handelGetCurrentUser();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("currentUser取得エラー時の処理のテスト", async () => {
  mockAxios.onGet("auth/sessions").reply(500);

  const { result } = renderHook(() => useGetCurrentUser());
  const { handelGetCurrentUser } = result.current;
  await handelGetCurrentUser();

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
