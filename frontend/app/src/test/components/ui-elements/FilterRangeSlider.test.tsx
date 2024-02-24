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
      rangeLabel="rangeLabel"
    />
  );
  expect(getAllByRole("slider").length).toBe(2);
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
      rangeLabel="rangeLabel"
    />
  );
  const sliders = getAllByRole("slider");
  await act(async () => {
    await user.click(sliders[0]);
  });
  expect(mockHandleChange).toHaveBeenCalledTimes(1);
});

test("フォーカスとアンフォーカスのイベントでisFocusedが適切に更新されること", async () => {
  const spyOnUseState = jest.spyOn(jest.requireActual("react"), "useState");
  const mockSetIsFocused = jest.fn();
  spyOnUseState.mockImplementation((props) => [props, mockSetIsFocused]);
  const user = userEvent.setup();
  render(
    <FilterRangeSlider
      value={[0, 100]}
      min={0}
      max={200}
      step={10}
      handleChange={() => {}}
      rangeLabel="Range:"
    />
  );
  await act(async () => {
    await user.tab();
    await user.tab();
  });
  expect(mockSetIsFocused).toHaveBeenCalledWith(true);
  expect(mockSetIsFocused).toHaveBeenCalledWith(false);
});
