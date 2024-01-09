import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Favorite from "features/worldView/components/ui-elements/Favorite";

const favoritesUserId1 = [
  {
    id: 10,
    userId: 1,
    worldViewId: 1,
  },
];
const favoritesUserId2 = [
  {
    id: 10,
    userId: 2,
    worldViewId: 1,
  },
];

const mockHandleChangeFavorite = jest.fn();
jest.mock("features/worldView/hooks/api/useHandleChangeFavorite", () => ({
  __esModule: true,
  default: () => ({
    handleChangeFavorite: mockHandleChangeFavorite,
  }),
}));

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    currentUser: { id: 1 },
  }),
}));

const mockSetFavoriteId = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (init: number | null) => [init, mockSetFavoriteId],
}));

test("ハートアイコンがレンダリングされていること", () => {
  render(<Favorite selectedId={1} favorites={favoritesUserId1} />);
  expect(screen.getByRole("img", { name: "ハートアイコン" })).toBeInTheDocument();
});

test("ハートアイコン押下でhandleChangeFavorite関数が実行されること", async () => {
  const user = userEvent.setup();
  render(<Favorite selectedId={1} favorites={favoritesUserId1} />);
  await user.click(screen.getByRole("img", { name: "ハートアイコン" }));
  expect(mockHandleChangeFavorite).toHaveBeenCalledTimes(1);
});

test("favoritesの格favoriteでuserIdがcurrentUser.idと一致するfavoriteが存在する場合、favoriteIdがそのfavoriteのidに更新されること", () => {
  render(<Favorite selectedId={1} favorites={favoritesUserId2} />);
  expect(mockSetFavoriteId).not.toHaveBeenCalledWith(10);
  render(<Favorite selectedId={1} favorites={favoritesUserId1} />);
  expect(mockSetFavoriteId).toHaveBeenCalledWith(10);
});
