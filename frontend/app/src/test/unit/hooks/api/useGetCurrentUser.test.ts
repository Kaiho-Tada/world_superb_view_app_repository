import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { useGetCurrentUser } from "hooks/api/useGetCurrentUser";
import client from "lib/api/client";

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const mockUseToast = jest.fn();
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => mockUseToast,
}));

const mockAxios = new MockAdapter(client);

test('currentUser取得成功時の処理のテスト', async() => {
  mockAxios.onGet('auth/sessions').reply(200, {
    status: 200,
    currentUser: {
      id: 1,
      email: "test@example.com",
      name: "name",
      nickanme: "nickname"
    }
  });
  const setLoading = jest.fn();
  const setIsSignedIn = jest.fn();
  const setCurrentUser = jest.fn();
  const loading = false;
  const { result } = renderHook(() =>
    useGetCurrentUser({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
      loading
    })
  );
  const { handelGetCurrentUser } = result.current;
  await handelGetCurrentUser();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).toHaveBeenCalledWith(true);
  expect(setIsSignedIn).toHaveBeenCalledTimes(1);

  expect(setCurrentUser).toHaveBeenCalledWith({
    id: 1,
    email: "test@example.com",
    name: "name",
    nickanme: "nickname"
  });
  expect(setCurrentUser).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test('currentUser取得失敗時の処理のテスト', async() => {
  const logSpy = jest.spyOn(console, 'log');

  mockAxios.onGet('auth/sessions').reply(200, {
    status: 500,
  });

  const setLoading = jest.fn();
  const setIsSignedIn = jest.fn();
  const setCurrentUser = jest.fn();
  const loading = false;
  const { result } = renderHook(() =>
    useGetCurrentUser({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
      loading
    })
  );
  const { handelGetCurrentUser } = result.current;
  await handelGetCurrentUser();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(logSpy).toHaveBeenCalledWith("ユーザーが見つかりません。");

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test('currentUser取得エラー時の処理のテスト', async() => {
  const logSpy = jest.spyOn(console, 'log');

  mockAxios.onGet('auth/sessions').reply(500);

  const setLoading = jest.fn();
  const setIsSignedIn = jest.fn();
  const setCurrentUser = jest.fn();
  const loading = false;
  const { result } = renderHook(() =>
    useGetCurrentUser({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
      loading
    })
  );
  const { handelGetCurrentUser } = result.current;
  await handelGetCurrentUser();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(logSpy).toHaveBeenCalledWith("エラーが発生しました。");

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});
