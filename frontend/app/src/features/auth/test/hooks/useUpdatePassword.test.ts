import { renderHook } from "@testing-library/react";
import mockUpdatePasswordApi from "features/auth/api/updatePasswordApi";
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

jest.mock("features/auth/api/updatePasswordApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("パスワード更新成功時の処理のテスト", async () => {
  (mockUpdatePasswordApi as jest.Mock).mockReturnValue({
    data: { message: "パスワードの更新に成功しました。" },
  });

  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation, handleUpdatePassword } = result.current;
  await act(async () => {
    setPassword("new_password");
    setpasswordConfirmation("new_password");
  });
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  });

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

test("パスワード更新エラー時のテスト", async () => {
  (mockUpdatePasswordApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useUpdatePassword());
  const { setPassword, setpasswordConfirmation, handleUpdatePassword } = result.current;
  await act(async () => {
    setPassword("new_passward");
    setpasswordConfirmation("new_password");
  });
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);
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
    (mockUpdatePasswordApi as jest.Mock).mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: { status: 403, data: { error: "ゲストユーザーは許可されていません。" } },
      });
      throw error;
    });

    const { result } = renderHook(() => useUpdatePassword());
    const { setPassword, setpasswordConfirmation, handleUpdatePassword } = result.current;
    await act(async () => {
      setPassword("new_passward");
      setpasswordConfirmation("new_password");
    });
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

  test("updatePasswordApi関数が422番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
    (mockUpdatePasswordApi as jest.Mock).mockImplementation(() => {
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
    const { setPassword, setpasswordConfirmation, handleUpdatePassword } = result.current;
    await act(async () => {
      setPassword("new_password");
      setpasswordConfirmation("new_password");
    });
    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await act(async () => {
      await handleUpdatePassword(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
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
