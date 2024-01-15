import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeasonCheckBox from "features/worldView/components/ui-elements/SeasonCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    monthCheckBoxItems: [
      { label: "1月", parentLabel: "冬", checked: false },
      { label: "2月", parentLabel: "冬", checked: false },
      { label: "3月", parentLabel: "春", checked: false },
      { label: "4月", parentLabel: "春", checked: false },
      { label: "5月", parentLabel: "春", checked: false },
      { label: "6月", parentLabel: "夏", checked: false },
      { label: "7月", parentLabel: "夏", checked: false },
      { label: "8月", parentLabel: "夏", checked: false },
      { label: "9月", parentLabel: "秋", checked: false },
      { label: "10月", parentLabel: "秋", checked: false },
      { label: "11月", parentLabel: "秋", checked: false },
      { label: "12月", parentLabel: "冬", checked: false },
    ],
    loadingSearchWorldViews: false,
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    monthCheckBoxItems: [
      { label: "1月", parentLabel: "冬", checked: false },
      { label: "2月", parentLabel: "冬", checked: false },
      { label: "3月", parentLabel: "春", checked: true },
      { label: "4月", parentLabel: "春", checked: true },
      { label: "5月", parentLabel: "春", checked: true },
      { label: "6月", parentLabel: "夏", checked: false },
      { label: "7月", parentLabel: "夏", checked: false },
      { label: "8月", parentLabel: "夏", checked: false },
      { label: "9月", parentLabel: "秋", checked: false },
      { label: "10月", parentLabel: "秋", checked: false },
      { label: "11月", parentLabel: "秋", checked: false },
      { label: "12月", parentLabel: "冬", checked: false },
    ],
  },
};

const mockContextValueLoadingSearchWorldViews = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "3月" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "4月" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "5月" })).toBeInTheDocument();
});

test("monthCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "3月" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "4月" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "5月" })).not.toBeChecked();
});

test("monthCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "3月" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "4月" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "5月" })).toBeChecked();
});

test("月のCheckboxが全てチェックされている場合、季節のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).toBeChecked();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "3月" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "4月" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "5月" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<SeasonCheckBox />);
  expect(screen.getByRole("checkbox", { name: "春" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "3月" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "4月" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "5月" })).toBeDisabled();
});

test("親のCheckbox押下でhandleChangeParentCheckBox関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const spyOnHandleChangeParentCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeParentCheckBox"),
    "default"
  );
  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "春" }));
  });
  expect(spyOnHandleChangeParentCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "春" }) }),
      checkBoxItems: [
        { label: "1月", parentLabel: "冬", checked: false },
        { label: "2月", parentLabel: "冬", checked: false },
        { label: "3月", parentLabel: "春", checked: false },
        { label: "4月", parentLabel: "春", checked: false },
        { label: "5月", parentLabel: "春", checked: false },
        { label: "6月", parentLabel: "夏", checked: false },
        { label: "7月", parentLabel: "夏", checked: false },
        { label: "8月", parentLabel: "夏", checked: false },
        { label: "9月", parentLabel: "秋", checked: false },
        { label: "10月", parentLabel: "秋", checked: false },
        { label: "11月", parentLabel: "秋", checked: false },
        { label: "12月", parentLabel: "冬", checked: false },
      ],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});

test("checkbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "3月" }));
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_MONTH_CHECKBOX_ITEMS",
    payload: expect.any(Array),
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_MONTH_LABELS",
    payload: expect.any(Array),
  });
});

test("checkbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);

  const spyOnUseHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("features/worldView/hooks/useHandleChangeCheckBox"),
    "default"
  );
  const mockHandleChangeCheckBox = jest.fn();
  spyOnUseHandleChangeCheckBox.mockImplementation(() => ({
    handleChangeCheckBox: mockHandleChangeCheckBox,
  }));

  const user = userEvent.setup();
  render(<SeasonCheckBox />);
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "3月" }));
  });

  expect(mockHandleChangeCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "3月" }) }),
      checkBoxItems: [
        { label: "1月", parentLabel: "冬", checked: false },
        { label: "2月", parentLabel: "冬", checked: false },
        { label: "3月", parentLabel: "春", checked: false },
        { label: "4月", parentLabel: "春", checked: false },
        { label: "5月", parentLabel: "春", checked: false },
        { label: "6月", parentLabel: "夏", checked: false },
        { label: "7月", parentLabel: "夏", checked: false },
        { label: "8月", parentLabel: "夏", checked: false },
        { label: "9月", parentLabel: "秋", checked: false },
        { label: "10月", parentLabel: "秋", checked: false },
        { label: "11月", parentLabel: "秋", checked: false },
        { label: "12月", parentLabel: "冬", checked: false },
      ],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});
