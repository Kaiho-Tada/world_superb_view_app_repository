import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useUpdatePassword from "features/auth/hooks/useUpdatePassword";
import client from "lib/client";
import { act } from "react-dom/test-utils";

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

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setLoading: mockSetLoading,
  }),
}));

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

mockAxios.onPut("auth/password").reply((config) => {
  const data = JSON.parse(config.data);
  if (data.password.length < 6) {
    return [
      422,
      {
        errors: {
          fullMessages: ["パスワードは6文字以上で入力してください"],
        },
      },
    ];
  }
  if (data.password !== data.password_confirmation) {
    return [
      422,
      {
        errors: {
          fullMessages: ["パスワード（確認用）とパスワードの入力が一致しません"],
        },
      },
    ];
  }
  return [
    200,
    {
      data,
      message: "パスワードの更新に成功しました。",
    },
  ];
});

test("パスワード更新成功時の処理のテスト", async () => {
  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation } = result.current;

  await act(async () => {
    setPassword("new_password");
    setpasswordConfirmation("new_password");
  });

  const { handleUpdatePassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "パスワードの更新に成功しました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

describe("パスワード更新失敗時の処理のテスト", () => {
  test("password5文字以下の場合、パスワード更新に失敗すること", async () => {
    const { result } = renderHook(() => useUpdatePassword());
    const { setPassword, setpasswordConfirmation } = result.current;

    await act(async () => {
      setPassword("new_p");
      setpasswordConfirmation("new_p");
    });

    const { handleUpdatePassword } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "パスワードは6文字以上で入力してください",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  test("passwordとpassword_confirmationの値が異なる場合、パスワードの更新に失敗すること", async () => {
    const { result } = renderHook(() => useUpdatePassword());
    const { setPassword, setpasswordConfirmation } = result.current;

    await act(async () => {
      setPassword("new_passward");
      setpasswordConfirmation("new_password");
    });

    const { handleUpdatePassword } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "パスワード（確認用）とパスワードの入力が一致しません",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});

test("パスワード更新エラー時のテスト", async () => {
  mockAxios.onPut("auth/password").reply(500);
  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation } = result.current;

  await act(async () => {
    setPassword("new_passward");
    setpasswordConfirmation("new_password");
  });

  const { handleUpdatePassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("ゲストユーザーによるパスワード更新時の処理のテスト", async () => {
  mockAxios.onPut("auth/password").reply(200, {
    status: 403,
    message: "ゲストユーザーは許可されていません。",
  });
  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation } = result.current;

  await act(async () => {
    setPassword("new_passward");
    setpasswordConfirmation("new_password");
  });

  const { handleUpdatePassword } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "ゲストユーザーは許可されていません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
