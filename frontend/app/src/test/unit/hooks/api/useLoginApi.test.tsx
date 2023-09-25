import { renderHook, act} from "@testing-library/react";
import '@testing-library/jest-dom'
import client from 'lib/api/client';
import MockAdapter from "axios-mock-adapter";
import { useLoginApi } from "hooks/api/useLoginApi";

afterEach(() => {
  mockAxios.resetHistory()
  jest.clearAllMocks()
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

test('ログイン成功時のテスト', async () => {
  mockAxios.onPost('/auth/sign_in').reply(200,
    {
      data: {
        id: 1,
        email: "test@example.com",
      },
    },
  );

  const setLoading = jest.fn();
  const setIsSignedIn = jest.fn();
  const setCurrentUser = jest.fn();

  const { result } = renderHook(() =>
    useLoginApi({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );

  const { onClickLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail('test@example.com');
    setPassword('password');
  });

  await onClickLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);
  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);

  expect(setIsSignedIn).toHaveBeenCalledWith(true);
  expect(setIsSignedIn).toHaveBeenCalledTimes(1);

  expect(setCurrentUser).toHaveBeenCalledWith({
    id: 1,
    email: "test@example.com",
  });
  expect(setCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).toHaveBeenCalledWith('/home');
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'ログインしました',
    status: 'success',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
});

test('ログイン失敗時のテスト', async() => {
  mockAxios.onPost('/auth/sign_in').reply(401, {
    errors: [
      'ログイン用の認証情報が正しくありません。再度お試しください。'
    ]
  });

  const setLoading = jest.fn();
  const setIsSignedIn = jest.fn();
  const setCurrentUser = jest.fn();

  const { result } = renderHook(() =>
    useLoginApi({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );

  const { onClickLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail('test@example.com');
    setPassword('incorrect-password');
  });

  await onClickLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'ログイン用の認証情報が正しくありません。再度お試しください。',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
})

test('ログインエラー時のテスト', async() => {
  mockAxios.onPost('/auth/sign_in').reply(500);

  const setLoading = jest.fn();
  const setIsSignedIn = jest.fn();
  const setCurrentUser = jest.fn();

  const { result } = renderHook(() =>
    useLoginApi({
      setLoading,
      setIsSignedIn,
      setCurrentUser,
    })
  );

  const { onClickLogin, setEmail, setPassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail('test@example.com');
    setPassword('incorrect-password');
  });

  await onClickLogin(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(setIsSignedIn).not.toHaveBeenCalledWith();
  expect(setIsSignedIn).toHaveBeenCalledTimes(0);

  expect(setCurrentUser).not.toHaveBeenCalledWith();
  expect(setCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'エラーが発生しました。',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
})
