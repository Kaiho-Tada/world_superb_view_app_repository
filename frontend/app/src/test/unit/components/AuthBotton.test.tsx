import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthButton from "components/atoms/button/AuthButton";

const onClick = jest.fn();

describe("AuthButtonのテスト", () => {
  test("AuthButtonが表示されていること", () => {
    render(
      <AuthButton isDisabled={false} loading={false} onClick={onClick}>
        テストボタン
      </AuthButton>
    );
    const Button = screen.getByRole("button", { name: "テストボタン" });
    expect(Button).toBeInTheDocument();
  });

  test("propsで受け取ったisDisabledの値がtrueの場合、ボタンクリックが無効になっていること", () => {
    render(
      <AuthButton isDisabled loading={false} onClick={onClick}>
        テストボタン
      </AuthButton>
    );
    const Button = screen.getByRole("button", { name: "テストボタン" });
    expect(Button).toBeDisabled();
  });

  test("propsで受け取ったloadingの値がtrueの場合、ボタンクリックが無効になっていること", () => {
    render(
      <AuthButton isDisabled={false} loading onClick={onClick}>
        テストボタン
      </AuthButton>
    );
    const Button = screen.getByRole("button");
    expect(Button).toBeDisabled();
  });

  test("PrimaryButton押下でpropsで渡した関数が呼び出されること", async () => {
    const user = userEvent.setup();
    render(
      <AuthButton isDisabled={false} loading={false} onClick={onClick}>
        テストボタン
      </AuthButton>
    );
    const Button = screen.getByRole("button", { name: "テストボタン" });
    await user.click(Button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
