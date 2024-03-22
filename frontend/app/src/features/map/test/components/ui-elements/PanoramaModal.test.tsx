import { render, screen } from "@testing-library/react";
import PanoramaModal from "features/map/components/ui-elements/PanoramaModal";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";

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
