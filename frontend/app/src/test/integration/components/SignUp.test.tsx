import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { SignUp } from "components/pages/SignUp";
import { AuthProvider } from "hooks/providers/useAuthProvider";
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

const mockSetLoading = jest.fn();

jest.mock('hooks/providers/useAuthProvider', () => ({
  ...jest.requireActual('hooks/providers/useAuthProvider'),
  useAuth: () => ({
    setLoading: mockSetLoading,
  }),
}));

describe('新規登録ページのレンダリングテスト', () => {
  test('新規登録フォームの見出しが表示されていること', () => {
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const signUpHeading = screen.getByRole('heading', { name: "新規登録"});
    expect(signUpHeading).toBeInTheDocument();
  });

  test('emailラベルが表示されていること', () => {
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const emailLabel = screen.getByRole('heading', { name: "Email"});
    expect(emailLabel).toBeInTheDocument();
  });

  test('メールアドレスの記入欄が表示されていること', () => {
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const emailInput = screen.getByRole("textbox", { name: "email" });
    expect(emailInput).toBeInTheDocument();
  });

  test('パスワードラベルが表示されていること', () => {
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const passwordLabel = screen.getByRole('heading', { name: "パスワード"});
    expect(passwordLabel).toBeInTheDocument();
  });

  test('パスワードの記入欄が表示されていること', () => {
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const passwordInput = screen.getByLabelText('password');
    expect(passwordInput).toBeInTheDocument();
  });

  test('新規登録ボタンが表示されていること', () => {
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const signUpButton = screen.getByRole('button', { name: "新規登録"});
    expect(signUpButton).toBeInTheDocument();
  });
})

const mockAxios = new MockAdapter(client);

describe('新規登録ページの機能テスト', () => {
  mockAxios.onPost('/auth').reply((config) => {
    const data = JSON.parse(config.data);
    if(!data.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)) {
      return [422, {
        errors: {
          fullMessages: [
            "Eメールは有効ではありません"
          ],
        }
      }]
    }else if (data.password.length < 6) {
      return [422, {
        errors: {
          fullMessages: [
            "パスワードは6文字以上で入力してください"
          ],
        }
      }]
    };
    return [200];
  });
  test('サインアップ成功時の処理のテスト', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const emailInput = screen.getByRole("textbox", { name: "email" }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

    const signUpButton = screen.getByRole('button', { name: "新規登録"});

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");

    expect(signUpButton).toBeDisabled();
    await act(async () => {
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password");
    });

    expect(signUpButton).not.toBeDisabled();
    await act(async () => {
      await user.click(signUpButton);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);

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

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  describe('サインアップ失敗時の処理のテスト', () => {
    test('リクエストのemailのフォーマットが正しくない場合はプロフィールの更新に失敗すること', async() => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <SignUp />
        </AuthProvider>
      );
      const emailInput = screen.getByRole("textbox", { name: "email" }) as HTMLInputElement;
      const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

      const signUpButton = screen.getByRole('button', { name: "新規登録"});

      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");

      expect(signUpButton).toBeDisabled();
      await act(async () => {
        await user.type(emailInput, "test.example.com");
        await user.type(passwordInput, "password");
      });

      expect(signUpButton).not.toBeDisabled();
      await act(async () => {
        await user.click(signUpButton);
      });

      expect(mockSetLoading).toHaveBeenCalledWith(true);

      expect(mockUseToast).toHaveBeenCalledWith({
        title: 'Eメールは有効ではありません',
        status: 'error',
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      expect(mockUseToast).toHaveBeenCalledTimes(1);

      expect(mockUseNavigate).not.toHaveBeenCalledWith();
      expect(mockUseNavigate).toHaveBeenCalledTimes(0);

      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetLoading).toHaveBeenCalledTimes(2);
    });

    test('パスワードは6文字以上でなければ登録できないこと', async() => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <SignUp />
        </AuthProvider>
      );
      const emailInput = screen.getByRole("textbox", { name: "email" }) as HTMLInputElement;
      const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

      const signUpButton = screen.getByRole('button', { name: "新規登録"});

      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");

      expect(signUpButton).toBeDisabled();
      await act(async () => {
        await user.type(emailInput, "test.example.com");
        await user.type(passwordInput, "password");
      });

      expect(signUpButton).not.toBeDisabled();
      await act(async () => {
        await user.click(signUpButton);
      });

      expect(mockSetLoading).toHaveBeenCalledWith(true);

      expect(mockUseToast).toHaveBeenCalledWith({
        title: 'Eメールは有効ではありません',
        status: 'error',
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      expect(mockUseToast).toHaveBeenCalledTimes(1);

      expect(mockUseNavigate).not.toHaveBeenCalledWith();
      expect(mockUseNavigate).toHaveBeenCalledTimes(0);

      expect(mockSetLoading).toHaveBeenCalledWith(false);
      expect(mockSetLoading).toHaveBeenCalledTimes(2);
    });
  })

  test('サインアップエラー時の処理のテスト', async() => {
    mockAxios.onPost('/auth').reply(500);

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    );
    const emailInput = screen.getByRole("textbox", { name: "email" }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

    const signUpButton = screen.getByRole('button', { name: "新規登録"});

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");

    expect(signUpButton).toBeDisabled();
    await act(async () => {
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password");
    });

    expect(signUpButton).not.toBeDisabled();
    await act(async () => {
      await user.click(signUpButton);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);

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

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
})
