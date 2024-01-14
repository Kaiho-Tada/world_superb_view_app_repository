import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryCheckBox from "features/worldView/components/ui-elements/CountryCheckBox";
import { act } from "react-dom/test-utils";

const spyOnUseWorldViewListContext = jest.spyOn(
  jest.requireActual("providers/WorldViewListProvider"),
  "useWorldViewListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    loadingSearchWorldViews: false,
    loadingCountryCheckBoxItems: false,
    countryCheckBoxItems: [
      { label: "アメリカ", stateName: "北米", checked: false },
      { label: "カナダ", stateName: "北米", checked: false },
      { label: "中国", stateName: "アジア", checked: false },
      { label: "オーストラリア", stateName: "大洋州", checked: false },
      { label: "メキシコ", stateName: "中南米", checked: false },
      { label: "イギリス", stateName: "ヨーロッパ", checked: false },
      { label: "トルコ", stateName: "中東", checked: false },
      { label: "エジプト", stateName: "アフリカ", checked: false },
    ],
  },
};

const mockContextValueChecked = {
  state: {
    ...mockContextValue.state,
    countryCheckBoxItems: [
      { label: "アメリカ", stateName: "北米", checked: true },
      { label: "カナダ", stateName: "北米", checked: true },
      { label: "中国", stateName: "アジア", checked: false },
      { label: "オーストラリア", stateName: "大洋州", checked: false },
      { label: "メキシコ", stateName: "中南米", checked: false },
      { label: "イギリス", stateName: "ヨーロッパ", checked: false },
      { label: "トルコ", stateName: "中東", checked: false },
      { label: "エジプト", stateName: "アフリカ", checked: false },
    ],
  },
};

const mockContextValueLoadingSearchWorldViews = {
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

const mockContextValueLoadingCountryCheckBoxItems = {
  state: {
    ...mockContextValue.state,
    loadingCountryCheckBoxItems: true,
  },
};

const mockHandleChangeState = jest.fn();
jest.mock("features/worldView/hooks/filter/useCountryHandleChange", () => ({
  __esModule: true,
  default: () => ({
    handleChangeState: mockHandleChangeState,
  }),
}));

test("CheckBoxがレンダリングされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).toBeInTheDocument();
});

test("countryCheckBoxItemsのcheckedがfalseの場合、CheckBoxがチェックされていないこと", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).not.toBeChecked();
});

test("countryCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).toBeChecked();
});

test("国のCheckboxが全てチェックされている場合、州のCheckboxがチェックされていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueChecked);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).toBeChecked();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValueLoadingSearchWorldViews);
  render(<CountryCheckBox />);
  expect(screen.getByRole("checkbox", { name: "北米" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "アメリカ" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "カナダ" })).toBeDisabled();
});

test("loadingCountryCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  spyOnUseWorldViewListContext.mockImplementation(
    () => mockContextValueLoadingCountryCheckBoxItems
  );
  render(<CountryCheckBox />);
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("州のCheckBox押下でhandleChangeState関数が実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CountryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "北米" });
  await act(async () => {
    await user.click(CheckBox);
  });
  expect(mockHandleChangeState).toHaveBeenCalledTimes(1);
});

test("国のcheckbox押下でhandleChangeCheckBox関数内でdispatchが実行されること", async () => {
  spyOnUseWorldViewListContext.mockImplementation(() => mockContextValue);
  const user = userEvent.setup();
  render(<CountryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "アメリカ" });
  await act(async () => {
    await user.click(CheckBox);
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_COUNTRY_CHECKBOX_ITEMS",
    payload: expect.any(Array),
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_CHECKED_COUNTRY_LABELS",
    payload: expect.any(Array),
  });
});

test("国のcheckbox押下でhandleChangeCheckBox関数が実行されること", async () => {
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
  render(<CountryCheckBox />);
  const CheckBox = screen.getByRole("checkbox", { name: "アメリカ" });
  await act(async () => {
    await user.click(CheckBox);
  });

  expect(mockHandleChangeCheckBox).toHaveBeenCalledWith(
    expect.objectContaining({
      e: expect.objectContaining({ target: expect.objectContaining({ value: "アメリカ" }) }),
      checkBoxItems: [
        { label: "アメリカ", stateName: "北米", checked: false },
        { label: "カナダ", stateName: "北米", checked: false },
        { label: "中国", stateName: "アジア", checked: false },
        { label: "オーストラリア", stateName: "大洋州", checked: false },
        { label: "メキシコ", stateName: "中南米", checked: false },
        { label: "イギリス", stateName: "ヨーロッパ", checked: false },
        { label: "トルコ", stateName: "中東", checked: false },
        { label: "エジプト", stateName: "アフリカ", checked: false },
      ],
      checkBoxItemsDispatch: expect.any(Function),
      checkedLabelsDispatch: expect.any(Function),
    })
  );
});
