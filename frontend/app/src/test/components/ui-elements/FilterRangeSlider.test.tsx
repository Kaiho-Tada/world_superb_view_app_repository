import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterRangeSlider from "components/ui-elements/FilterRangeSlider";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: () => ({
    dispatch: jest.fn(),
    state: {
      voteAverageRange: [0, 10],
    },
  }),
}));

const value = [3, 7];
const min = 0;
const max = 10;
const step = 1;
const mockHandleChange = jest.fn();

test("sliderが表示されていること", () => {
  const { getAllByRole } = render(
    <FilterRangeSlider
      value={value}
      min={min}
      max={max}
      step={step}
      handleChange={mockHandleChange}
    />
  );
  expect(getAllByRole("slider").length).toBe(2);
});

test("デフォルト値が表示されていること", () => {
  const { getByText } = render(
    <FilterRangeSlider
      value={value}
      min={min}
      max={max}
      step={step}
      handleChange={mockHandleChange}
    />
  );
  expect(getByText(value[0])).toBeInTheDocument();
  expect(getByText(value[1])).toBeInTheDocument();
  expect(getByText(min)).toBeInTheDocument();
  expect(getByText(max)).toBeInTheDocument();
  expect(getByText((max + min) / 2)).toBeInTheDocument();
});

test("スライダーのクリックをトリガーにhandleChange関数が呼び出されること", async () => {
  const user = userEvent.setup();
  const { getAllByRole } = render(
    <FilterRangeSlider
      value={value}
      min={min}
      max={max}
      step={step}
      handleChange={mockHandleChange}
    />
  );
  const sliders = getAllByRole("slider");
  await act(async () => {
    await user.click(sliders[0]);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
});
