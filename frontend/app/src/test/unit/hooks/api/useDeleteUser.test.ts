import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { useDeleteUser } from "hooks/api/useDeleteUser";
import Cookies from "js-cookie";
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

jest.mock('js-cookie', () => ({
  ...jest.requireActual('js-cookie'),
  get: jest.fn(),
  remove: jest.fn(),
}));

const mockAxios = new MockAdapter(client);

test("アカウント削除成功時の処理のテスト", async() => {
  mockAxios.onDelete('auth').reply(200, {
    message: "'test@example.com' のアカウントは削除されました。"
  });
  const setLoading = jest.fn();
  const setCurrentUser = jest.fn();
  const setIsSignedIn = jest.fn();

  const { result } = renderHook(() =>
    useDeleteUser({
      setLoading,
      setCurrentUser,
      setIsSignedIn
    })
  );
  const { handleDeleteUser } = result.current;
  await handleDeleteUser();

  expect(Cookies.remove).toHaveBeenCalledWith('_access_token');
  expect(Cookies.remove).toHaveBeenCalledWith('_client');
  expect(Cookies.remove).toHaveBeenCalledWith('_uid');

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).toHaveBeenCalledWith(false);
  expect(setIsSignedIn).toHaveBeenCalledTimes(1);

  expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  expect(setCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "'test@example.com' のアカウントは削除されました。",
    status: 'success',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test('アカウント削除失敗時の処理のテスト', async() => {
  mockAxios.onDelete('auth').reply(404, {
    errors: ["削除するアカウントが見つかりません。"]
  });
  const setLoading = jest.fn();
  const setCurrentUser = jest.fn();
  const setIsSignedIn = jest.fn();

  const { result } = renderHook(() =>
    useDeleteUser({
      setLoading,
      setCurrentUser,
      setIsSignedIn
    })
  );
  const { handleDeleteUser } = result.current;
  await handleDeleteUser();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "削除するアカウントが見つかりません。",
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test('アカウント削除エラー時の処理のテスト', async() => {
  mockAxios.onDelete('auth').reply(500);
  const setLoading = jest.fn();
  const setCurrentUser = jest.fn();
  const setIsSignedIn = jest.fn();

  const { result } = renderHook(() =>
    useDeleteUser({
      setLoading,
      setCurrentUser,
      setIsSignedIn
    })
  );
  const { handleDeleteUser } = result.current;

  await handleDeleteUser();

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});
