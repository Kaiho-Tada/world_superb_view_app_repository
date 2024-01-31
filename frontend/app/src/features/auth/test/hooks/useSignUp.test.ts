import { act, renderHook } from "@testing-library/react";
import mockSignUpApi from "features/auth/api/signUpApi";
import useSignUp from "features/auth/hooks/useSignUp";

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

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("features/auth/api/signUpApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("サインアップ成功時の処理のテスト", async () => {
  const { result } = renderHook(() => useSignUp());
  const { setEmail, setPassword, handleSignUp } = result.current;
  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockUseToast).toHaveBeenCalledWith({
    title:
      "登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("signUpApi関数が422番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
  (mockSignUpApi as jest.Mock).mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: {
        status: 422,
        data: {
          errors: {
            fullMessages: [
              "Eメールは有効ではありません",
              "パスワードは6文字以上で入力してください",
            ],
          },
        },
      },
    });
    throw error;
  });

  const { result } = renderHook(() => useSignUp());
  const { setEmail, setPassword, handleSignUp } = result.current;
  await act(async () => {
    setEmail("test.example.com");
    setPassword("password");
  });
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "Eメールは有効ではありません",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "パスワードは6文字以上で入力してください",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(2);
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("サインアップエラー時の処理のテスト", async () => {
  (mockSignUpApi as jest.Mock).mockRejectedValue(new Error());

  const { result } = renderHook(() => useSignUp());
  const { setEmail, setPassword, handleSignUp } = result.current;
  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "サインアップ時にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
