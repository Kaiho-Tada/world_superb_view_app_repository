import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserCard from "features/auth/components/ui-parts/UserCard";
import { act } from "react-dom/test-utils";

const id = 1;
const email = "test@example.com";
const name = "name";
const nickname = "nickname";

test("userカードが表示されていること", () => {
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  expect(screen.getByRole("listitem", { name: "ユーザーID: 1" })).toBeInTheDocument();
});

test("プロフィール画像が表示されていること", () => {
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  expect(screen.getByRole("img", { name: "プロフィール画像" })).toBeInTheDocument();
});

test("emailが表示されていること", () => {
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  expect(screen.getByText("email: test@example.com")).toBeInTheDocument();
});

test("nameが表示されていること", () => {
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  expect(screen.getByText("name: name")).toBeInTheDocument();
});

test("nicknameが表示されていること", () => {
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  expect(screen.getByText("nickname: nickname")).toBeInTheDocument();
});

test("削除ボタンが表示されていること", () => {
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
});

test("削除ボタン押下でhandleDeleteUserByAdmin関数が呼び出されること", async () => {
  const spyOnUseDeleteUserByAdmin = jest.spyOn(
    jest.requireActual("features/auth/hooks/useDeleteUserByAdmin"),
    "default"
  );
  const mockHandleDeleteUserByAdmin = jest.fn();
  spyOnUseDeleteUserByAdmin.mockReturnValue({
    handleDeleteUserByAdmin: mockHandleDeleteUserByAdmin,
  });

  const user = userEvent.setup();
  render(<UserCard id={id} email={email} name={name} nickname={nickname} />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "削除" }));
  });
  expect(mockHandleDeleteUserByAdmin).toHaveBeenCalledTimes(1);
});
