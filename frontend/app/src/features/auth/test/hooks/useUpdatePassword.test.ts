import { renderHook } from "@testing-library/react";
import useUpdatePassword from "features/auth/hooks/useUpdatePassword";
import { act } from "react-dom/test-utils";

const mockSetLoading = jest.fn();
jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setLoading: mockSetLoading,
  }),
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const spyOnUpdatePasswordApi = jest.spyOn(
  jest.requireActual("features/auth/api/updatePasswordApi"),
  "default"
);

test("パスワード更新成功時の処理のテスト", async () => {
  spyOnUpdatePasswordApi.mockReturnValue({
    data: { message: "パスワードの更新に成功しました。" },
  });

  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation } = result.current;
  await act(async () => {
    setPassword("password");
    setpasswordConfirmation("password");
  });
  const { handleUpdatePassword } = result.current;
  const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleUpdatePassword(mockEvent as React.FormEvent<HTMLFormElement>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnUpdatePasswordApi).toHaveBeenCalledWith({
    password: "password",
    passwordConfirmation: "password",
  });
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

test("パスワード更新エラー時のテスト", async () => {
  spyOnUpdatePasswordApi.mockRejectedValue(new Error());
  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation } = result.current;
  await act(async () => {
    setPassword("password");
    setpasswordConfirmation("password");
  });
  const { handleUpdatePassword } = result.current;
  const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.FormEvent<HTMLFormElement>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnUpdatePasswordApi).toHaveBeenCalledWith({
    password: "password",
    passwordConfirmation: "password",
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "パスワード更新時にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

describe("パスワード更新失敗時の処理のテスト", () => {
  test("updatePasswordApi関数が403番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
    spyOnUpdatePasswordApi.mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: { status: 403, data: { error: "ゲストユーザーは許可されていません。" } },
      });
      throw error;
    });

    const { result } = renderHook(() => useUpdatePassword());
    const { setPassword, setpasswordConfirmation } = result.current;
    await act(async () => {
      setPassword("password");
      setpasswordConfirmation("password");
    });
    const { handleUpdatePassword } = result.current;
    const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdatePassword(mockEvent as React.FormEvent<HTMLFormElement>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(spyOnUpdatePasswordApi).toHaveBeenCalledWith({
      password: "password",
      passwordConfirmation: "password",
    });
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

  test("updatePasswordApi関数が422番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
    spyOnUpdatePasswordApi.mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: {
          status: 422,
          data: {
            errors: {
              fullMessages: [
                "パスワードは6文字以上で入力してください",
                "パスワード（確認用）とパスワードの入力が一致しません",
              ],
            },
          },
        },
      });
      throw error;
    });

    const { result } = renderHook(() => useUpdatePassword());
    const { setPassword, setpasswordConfirmation } = result.current;
    await act(async () => {
      setPassword("password");
      setpasswordConfirmation("password");
    });
    const { handleUpdatePassword } = result.current;
    const mockEvent: Partial<React.FormEvent<HTMLFormElement>> = {
      preventDefault: jest.fn(),
    };
    await act(async () => {
      await handleUpdatePassword(mockEvent as React.FormEvent<HTMLFormElement>);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(spyOnUpdatePasswordApi).toHaveBeenCalledWith({
      password: "password",
      passwordConfirmation: "password",
    });
    expect(mockUseToast).toHaveBeenCalledWith({
      title: "パスワードは6文字以上で入力してください",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledWith({
      title: "パスワード（確認用）とパスワードの入力が一致しません",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(2);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});
