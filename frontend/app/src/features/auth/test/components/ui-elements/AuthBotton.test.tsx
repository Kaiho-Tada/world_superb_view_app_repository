import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AuthButton from "features/auth/components/ui-elements/AuthButton";

describe("AuthButtonのテスト", () => {
  test("AuthButtonが表示されていること", () => {
    render(
      <AuthButton isDisabled={false} loading={false}>
        テストボタン
      </AuthButton>
    );
    expect(screen.getByRole("button", { name: "テストボタン" })).toBeInTheDocument();
  });

  test("propsで受け取ったisDisabledの値がtrueの場合、ボタンクリックが無効になっていること", () => {
    render(
      <AuthButton isDisabled loading={false}>
        テストボタン
      </AuthButton>
    );
    expect(screen.getByRole("button", { name: "テストボタン" })).toBeDisabled();
  });

  test("propsで受け取ったloadingの値がtrueの場合、ボタンクリックが無効になっていること", () => {
    render(
      <AuthButton isDisabled={false} loading>
        テストボタン
      </AuthButton>
    );
    expect(screen.getByTestId("auth-button")).toBeDisabled();
  });
});
