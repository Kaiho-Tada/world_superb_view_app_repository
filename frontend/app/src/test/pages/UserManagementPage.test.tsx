import { render, screen } from "@testing-library/react";
import mockGetAllUsersApi from "features/auth/api/AllUsersApi";
import UserManagementPage from "pages/UserManagementPage";

const mockUsers = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `name${index + 1}`,
  email: `test${index + 1}@example.com`,
  nickname: `nickname${index + 1}`,
}));

jest.mock("features/auth/api/AllUsersApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("ユーザー一覧が表示されていること", async () => {
  (mockGetAllUsersApi as jest.Mock).mockReturnValue({ data: mockUsers });

  render(<UserManagementPage />);
  expect(await screen.findByRole("list", { name: "ユーザー一覧" }));
});

test("リスト内にユーザーのlistitemが表示されていること", async () => {
  (mockGetAllUsersApi as jest.Mock).mockReturnValue({ data: mockUsers });

  render(<UserManagementPage />);
  const listItem = await screen.findAllByRole("listitem");
  expect(listItem.length).toBe(10);
});
