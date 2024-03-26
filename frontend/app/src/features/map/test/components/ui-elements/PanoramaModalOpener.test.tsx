import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PanoramaModalOpener from "features/map/components/ui-elements/PanoramaModalOpener";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

const mockOnOpen = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: () => ({
    ...jest.requireActual("@chakra-ui/react").useDisclosure,
    onOpen: mockOnOpen,
  }),
}));

jest.mock("providers/MapProvider", () => ({
  useMapContext: jest.fn(),
}));

const mockClickWorldView = {
  id: 1,
  name: `worldView1`,
  imgUrl: "画像URL",
  countries: [{ id: 1, name: `country1`, riskLevel: 1, bmi: 1 }],
  latitude: 30,
  longitude: 0,
};

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    clickedWorldView: mockClickWorldView,
  },
};

const mockContextValueClickedWorldViewIsNull = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    clickedWorldView: null,
  },
};

test("clickedWorldViewがnullの場合PanoramaDialogが表示されないこと", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueClickedWorldViewIsNull);
  render(<PanoramaModalOpener />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("clickedWorldViewが存在する場合PanoramaDialogが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<PanoramaModalOpener />);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("ダイアログ内にclickedWorldViewの詳細情報が記載されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<PanoramaModalOpener />);
  expect(screen.getByText(mockClickWorldView.name)).toBeInTheDocument();
  expect(screen.getByText(mockClickWorldView.countries[0].name)).toBeInTheDocument();
  expect(screen.getByText(mockClickWorldView.latitude)).toBeInTheDocument();
  expect(screen.getByText(mockClickWorldView.longitude)).toBeInTheDocument();
});

test("Closeボタンが表示されていること", async () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<PanoramaModalOpener />);
  expect(screen.getByRole("button", { name: "ダイアログを閉じる" })).toBeInTheDocument();
});

test("Closeボタン押下でclickedWorldViewがnullに更新されること", async () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<PanoramaModalOpener />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ダイアログを閉じる" }));
  });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CLICKED_WORLD_VIEW",
    payload: null,
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test("ダイアログ押下でuseDisclosureのonOpen関数が呼び出されること", async () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<PanoramaModalOpener />);
  await act(async () => {
    await user.click(screen.getByRole("dialog"));
  });
  expect(mockOnOpen).toHaveBeenCalledTimes(1);
});
