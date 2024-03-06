import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteIcon from "components/ui-elements/FavoriteIcon";
import { act } from "react-dom/test-utils";

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

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    currentUser: { id: 1 },
  }),
}));

const mockDeleteFavoriteApi = jest.fn();
const mockCreateFavoriteApi = jest.fn();
const mockHandleGetModel = jest.fn();

test("ハートアイコンがレンダリングされていること", () => {
  render(
    <FavoriteIcon
      selectedId={1}
      favorites={favoritesUserId1}
      deleteFavoriteApi={mockDeleteFavoriteApi}
      createFavoriteApi={mockCreateFavoriteApi}
      handleGetModel={mockHandleGetModel}
    />
  );
  expect(screen.getByRole("img", { name: "ハートアイコン" })).toBeInTheDocument();
});

test("ハートアイコン押下でhandleChangeFavorite関数が実行されること", async () => {
  const user = userEvent.setup();
  const spyOnUseHandleChangeFavorite = jest.spyOn(
    jest.requireActual("hooks/api/useHandleChangeFavorite"),
    "default"
  );
  const mockHandleChangeFavorite = jest.fn();
  spyOnUseHandleChangeFavorite.mockReturnValue({
    handleChangeFavorite: mockHandleChangeFavorite,
  });
  await act(async () => {
    render(
      <FavoriteIcon
        selectedId={1}
        favorites={favoritesUserId1}
        deleteFavoriteApi={mockDeleteFavoriteApi}
        createFavoriteApi={mockCreateFavoriteApi}
        handleGetModel={mockHandleGetModel}
      />
    );
  });
  await act(async () => {
    await user.click(screen.getByRole("img", { name: "ハートアイコン" }));
  });
  expect(mockHandleChangeFavorite).toHaveBeenCalledWith({
    selectedId: 1,
    favoriteId: 10,
    setFavoriteId: expect.any(Function),
    deleteFavoriteApi: mockDeleteFavoriteApi,
    createFavoriteApi: mockCreateFavoriteApi,
  });

  spyOnUseHandleChangeFavorite.mockRestore();
});

test("ハートアイコン押下でhandleGetModel関数が実行されること", async () => {
  const user = userEvent.setup();

  await act(async () => {
    render(
      <FavoriteIcon
        selectedId={1}
        favorites={favoritesUserId1}
        deleteFavoriteApi={mockDeleteFavoriteApi}
        createFavoriteApi={mockCreateFavoriteApi}
        handleGetModel={mockHandleGetModel}
      />
    );
  });
  await act(async () => {
    await user.click(screen.getByRole("img", { name: "ハートアイコン" }));
  });
  expect(mockHandleGetModel).toHaveBeenCalledTimes(1);
});

test("favoritesの格favoriteでuserIdがcurrentUser.idと一致するfavoriteが存在する場合、favoriteIdがそのfavoriteのidに更新されること", () => {
  const mockSetFavoriteId = jest.fn();
  const spyOnUseState = jest.spyOn(jest.requireActual("react"), "useState");
  spyOnUseState.mockImplementation((init) => [init, mockSetFavoriteId]);
  render(
    <FavoriteIcon
      selectedId={1}
      favorites={favoritesUserId2}
      deleteFavoriteApi={mockDeleteFavoriteApi}
      createFavoriteApi={mockCreateFavoriteApi}
      handleGetModel={mockHandleGetModel}
    />
  );
  expect(mockSetFavoriteId).not.toHaveBeenCalledWith(10);
  render(
    <FavoriteIcon
      selectedId={1}
      favorites={favoritesUserId1}
      deleteFavoriteApi={mockDeleteFavoriteApi}
      createFavoriteApi={mockCreateFavoriteApi}
      handleGetModel={mockHandleGetModel}
    />
  );
  expect(mockSetFavoriteId).toHaveBeenCalledWith(10);

  spyOnUseState.mockRestore();
});
