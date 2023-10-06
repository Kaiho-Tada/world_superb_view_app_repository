import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { useUpdatePassword } from "hooks/api/useUpdatePassword";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

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

const setLoading = jest.fn();

const mockAxios = new MockAdapter(client);

mockAxios.onPut('auth/password').reply((config) => {
  const data = JSON.parse(config.data);
  if (data.password.length < 6){
    return [422, {
      errors: {
        fullMessages: [
          "パスワードは6文字以上で入力してください"
        ]
      }
    }]
  }else if(data.password != data.password_confirmation){
    return [422, {
      errors: {
        fullMessages: [
          "パスワード（確認用）とパスワードの入力が一致しません"
        ]
      }
    }]
  };
  return [200, {
    data, message: "パスワードの更新に成功しました。"
  }];
});

test("パスワード更新成功時の処理のテスト", async() => {
  const { result } = renderHook(() =>
    useUpdatePassword({
      setLoading
    })
  );
  const { setPassword, setpasswordConfirmation } = result.current;

  await act(async () => {
    setPassword('new_password');
    setpasswordConfirmation('new_password');
  });

  const { handleUpdatePassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'パスワードの更新に成功しました。',
    status: 'success',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(setLoading).toHaveBeenCalledWith(false);
  expect(setLoading).toHaveBeenCalledTimes(2);
});

describe('パスワード更新失敗時の処理のテスト', () => {
  test("password5文字以下の場合、パスワード更新に失敗すること", async() => {
    const { result } = renderHook(() =>
      useUpdatePassword({
        setLoading
      })
    );
    const { setPassword, setpasswordConfirmation } = result.current;

    await act(async () => {
      setPassword('new_p');
      setpasswordConfirmation('new_p');
    });

    const { handleUpdatePassword } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(setLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: 'パスワードは6文字以上で入力してください',
      status: 'error',
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setLoading).toHaveBeenCalledTimes(2);
  });

  test("passwordとpassword_confirmationの値が異なる場合、パスワードの更新に失敗すること", async() => {
    const { result } = renderHook(() =>
      useUpdatePassword({
        setLoading
      })
    );
    const { setPassword, setpasswordConfirmation } = result.current;

    await act(async () => {
      setPassword('new_passward');
      setpasswordConfirmation('new_password');
    });

    const { handleUpdatePassword } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(setLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: 'パスワード（確認用）とパスワードの入力が一致しません',
      status: 'error',
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setLoading).toHaveBeenCalledTimes(2);
  });
});

test("パスワード更新エラー時のテスト", async() => {
  mockAxios.onPut('auth/password').reply(500)
  const { result } = renderHook(() =>
    useUpdatePassword({
      setLoading
    })
  );
  const { setPassword, setpasswordConfirmation } = result.current;

  await act(async () => {
    setPassword('new_passward');
    setpasswordConfirmation('new_password');
  });

  const { handleUpdatePassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(setLoading).toHaveBeenCalledWith(true);

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
});
