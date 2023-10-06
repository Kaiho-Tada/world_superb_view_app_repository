import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AuthLink } from "components/atoms/AuthLink";

afterEach(() => {
  jest.clearAllMocks();
});

const handleSignout = jest.fn();
const onClickProfile = jest.fn();
const onClickLogin = jest.fn();
const onClickSignup = jest.fn();

describe('ログイン済みの挙動のテスト', () => {
  test('アバターアイコンが表示されていること', () => {
    render(
      <AuthLink
        loading={false}
        isSignedIn={true}
        handleSignout={handleSignout}
        onClickProfile={onClickProfile}
        onClickLogin={onClickLogin}
        onClickSignup={onClickSignup}
      />
    );
    const avatarIcon = screen.getByRole("img", { name: "avatar" });
    expect(avatarIcon).toBeInTheDocument();
  });

  describe('サインアウトボタンのテスト', () => {
    test('サインアウトボタンが表示されていること', () => {
      render(
        <AuthLink
          loading={false}
          isSignedIn={true}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const accountIcon = screen.getByAltText("account_icon");
      const signoutText = screen.getByText('サインアウト');
      expect(accountIcon).toBeInTheDocument();
      expect(signoutText).toBeInTheDocument();
    });

    test('サインアウトボタン押下でhandleSignout関数が呼び出されること', async() => {
      const user = userEvent.setup();
      render(
        <AuthLink
          loading={false}
          isSignedIn={true}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const signoutText = screen.getByText('サインアウト');
      await user.click(signoutText);

      expect(handleSignout).toHaveBeenCalledTimes(1);
    });
  });

  describe('プロフィールリンクのテスト', () => {
    test('プロフィールリンクが表示されていること', () => {
      render(
        <AuthLink
          loading={false}
          isSignedIn={true}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const profileIcon = screen.getByAltText("profile_icon");
      const profileText = screen.getByText('プロフィール');
      expect(profileIcon).toBeInTheDocument();
      expect(profileText).toBeInTheDocument();
    });

    test('プロフィールリンク押下でonClickProfileが呼び出されること', async() => {
      const user = userEvent.setup();
      render(
        <AuthLink
          loading={false}
          isSignedIn={true}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const profileText = screen.getByText('プロフィール');
      await user.click(profileText);
      expect(onClickProfile).toHaveBeenCalledTimes(1);
    });
  });
});

describe('未ログインの挙動のテスト', () => {
  describe('アバターーアイコンのテスト', () => {
    test('アバターアイコンが表示されていること', () => {
      render(
        <AuthLink
          loading={false}
          isSignedIn={false}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      expect(avatarIcon).toBeInTheDocument();
    });

    test('アバターアイコン押下でonClickLogin関数が呼び出されること', async() => {
      const user = userEvent.setup()
      render(
        <AuthLink
          loading={false}
          isSignedIn={false}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      await user.click(avatarIcon);
      expect(onClickLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('ログインリンクのテスト', () => {
    test('ログインリンクが表示されていること', () => {
      render(
        <AuthLink
          loading={false}
          isSignedIn={false}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const loginLink = screen.getByRole('link', { name: 'ログイン' });
      expect(loginLink).toBeInTheDocument();
    });

    test('ログインリンク押下でonClickLogin関数が呼び出されること', async() => {
      const user = userEvent.setup()
      render(
        <AuthLink
          loading={false}
          isSignedIn={false}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const loginLink = screen.getByRole('link', { name: 'ログイン' });
      await user.click(loginLink);
      expect(onClickLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('サインアップリンクのテスト', () => {
    test('ログインリンクが表示されていること', () => {
      render(
        <AuthLink
          loading={false}
          isSignedIn={false}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const signUpLink = screen.getByRole('link', { name: '新規登録' });
      expect(signUpLink).toBeInTheDocument();
    });

    test('サインアップリンク押下でonClickSignup関数が呼び出されること', async() => {
      const user = userEvent.setup();
      render(
        <AuthLink
          loading={false}
          isSignedIn={false}
          handleSignout={handleSignout}
          onClickProfile={onClickProfile}
          onClickLogin={onClickLogin}
          onClickSignup={onClickSignup}
        />
      );
      const signUpLink = screen.getByRole('link', { name: '新規登録' });
      await user.click(signUpLink);
      expect(onClickSignup).toHaveBeenCalledTimes(1);
    });
  });
});
