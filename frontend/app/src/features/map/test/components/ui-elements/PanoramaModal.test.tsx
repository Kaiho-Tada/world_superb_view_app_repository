import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PanoramaModal from "features/map/components/ui-elements/PanoramaModal";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/MapProvider", () => ({
  useMapContext: jest.fn(),
}));

const mockClickedWorldView = {
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
    clickedWorldView: mockClickedWorldView,
  },
};

const mockContextValueClickedWorldViewIsNull = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    clickedWorldView: null,
  },
};

const mockOnClose = jest.fn();

test("clickedWorldViewがnullの場合PanoramaModalが表示されないこと", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueClickedWorldViewIsNull);
  render(<PanoramaModal isOpen onClose={mockOnClose} />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("isOpenがfalseの場合PanoramaModalが表示されないこと", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<PanoramaModal isOpen={false} onClose={mockOnClose} />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("clickedWorldViewが存在し、isOpenがtrueの場合PanoramaModalが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<PanoramaModal isOpen onClose={mockOnClose} />);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("閉じるボタンが表示されていること", async () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<PanoramaModal isOpen onClose={mockOnClose} />);
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
});

test("閉じるボタン押下でモーダルが閉じること", async () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  const user = userEvent.setup();
  render(<PanoramaModal isOpen onClose={mockOnClose} />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Close" }));
  });
  expect(mockOnClose).toBeCalled();
});
