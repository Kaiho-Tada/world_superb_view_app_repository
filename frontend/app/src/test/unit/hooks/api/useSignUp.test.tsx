import { act, renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { useSignUpApi } from "hooks/api/useSignUpApi";
import client from "lib/api/client";

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

test('サインアップ成功時の処理のテスト', async() => {
  mockAxios.onPost('/auth').reply(200);

  const setLoading = jest.fn();

  const { result } = renderHook(() =>
    useSignUpApi({
      setLoading,
    })
  );

  const {
    onClickSignUp,
    setEmail,
    setPassword,
    setPasswordConfirmation,
  } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail('test@example.com');
    setPassword('password');
    setPasswordConfirmation('password');
  });

  await onClickSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).toHaveBeenCalledWith('/login');
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: '登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。',
    status: 'success',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);


  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test('サインアップ失敗時の処理のテスト', async() => {
  mockAxios.onPost('/auth').reply(422, {
    errors: {
      fullMessages: [
        "パスワード（確認用）とパスワードの入力が一致しません",
        "Eメールはすでに存在します"
      ],
    }
  });

  const setLoading = jest.fn();

  const { result } = renderHook(() =>
    useSignUpApi({
      setLoading,
    })
  );

  const {
    onClickSignUp,
    setEmail,
    setPassword,
    setPasswordConfirmation,
  } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail('test@example.com');
    setPassword('password');
    setPasswordConfirmation('passward');
  });

  await onClickSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'パスワード（確認用）とパスワードの入力が一致しません',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'Eメールはすでに存在します',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(2);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

test('サインアップエラー時の処理のテスト', async() => {
  mockAxios.onPost('/auth').reply(500);

  const setLoading = jest.fn();

  const { result } = renderHook(() =>
    useSignUpApi({
      setLoading,
    })
  );

  const {
    onClickSignUp,
    setEmail,
    setPassword,
    setPasswordConfirmation,
  } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await act(async () => {
    setEmail('test@example.com');
    setPassword('password');
    setPasswordConfirmation('password');
  });

  await onClickSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

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
