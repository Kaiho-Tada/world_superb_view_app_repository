import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NestedCheckBox from "components/ui-elements/NestedCheckBox";
import { act } from "react-dom/test-utils";

const mockCheckItemsDispatch = jest.fn();
const isSkipSearchApiDispatch = jest.fn();

test("loadingGetCheckItemsがtrueの場合、スピナーが表示されていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルB", checked: false, isVisible: false },
      ]}
      loadingGetCheckItems
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("表示切り替えのCheckBoxがレンダリングされていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
        { label: "ラベル2", parentLabel: "親ラベルB", checked: false, isVisible: false },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "親ラベルA" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "親ラベルB" })).toBeInTheDocument();
});

test("表示切り替えのCheckBox押下でhandleToggleVisibility関数が呼び出されること", async () => {
  const SpyOnHandleToggleVisibility = jest.spyOn(
    jest.requireActual("utils/handleChangeVisibility"),
    "default"
  );
  const user = userEvent.setup();
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "親ラベルA" }));
  });
  expect(SpyOnHandleToggleVisibility).toHaveBeenCalledWith({
    e: expect.objectContaining({
      target: expect.objectContaining({ value: "親ラベルA", checked: false }),
    }),
    checkItems: [{ label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: false }],
    checkItemsDispatch: mockCheckItemsDispatch,
  });
  SpyOnHandleToggleVisibility.mockRestore();
});

test("checktemsのisVisibleがtrueの場合、CheckBoxが表示されていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: false },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).toBeInTheDocument();
  expect(screen.queryByRole("checkbox", { name: "ラベル2" })).not.toBeInTheDocument();
});

test("checkItemsのcheckedがtrueの場合、CheckBoxがcheckされていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true, isVisible: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: true },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "ラベル2" })).not.toBeChecked();
});

test("CheckBox押下でhandleChangeCheckBox関数が呼び出されること", async () => {
  const spyOnHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeCheckBox"),
    "default"
  );
  const user = userEvent.setup();
  render(
    <NestedCheckBox
      checkItems={[{ label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true }]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "ラベル1" }));
  });
  expect(spyOnHandleChangeCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({
      target: expect.objectContaining({ value: "ラベル1", checked: false }),
    }),
    checkItems: [{ label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true }],
    checkItemsDispatch: mockCheckItemsDispatch,
  });
  spyOnHandleChangeCheckBox.mockRestore();
});

test("全てのcheckItemsのisVisibleがtrueの場合、parentCheckBoxが表示されていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: true },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "全て" })).toBeInTheDocument();
});

test("全てのcheckItemsのcheckedがtrueの場合、parentCheckBoxがチェックされていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true, isVisible: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true, isVisible: true },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "全て" })).toBeChecked();
});

test("parentCheckBox押下でhandleChangeParentCheckBox関数が呼び出されること", async () => {
  const spyOnHandleChangeParentCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeParentCheckBox"),
    "default"
  );
  const user = userEvent.setup();
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: true },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "全て" }));
  });
  expect(spyOnHandleChangeParentCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({
      target: expect.objectContaining({ value: "親ラベルA", checked: false }),
    }),
    checkItems: [
      { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true },
      { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: true },
    ],
    checkItemsDispatch: mockCheckItemsDispatch,
  });
  spyOnHandleChangeParentCheckBox.mockRestore();
});

test("loadingSearchModelがtrueの場合、CheckBoxがdisabledになっていること", () => {
  render(
    <NestedCheckBox
      checkItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false, isVisible: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: false, isVisible: true },
      ]}
      loadingGetCheckItems={false}
      loadingSearchModel
      checkItemsDispatch={mockCheckItemsDispatch}
      isSkipSearchApiDispatch={isSkipSearchApiDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "親ラベルA" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "全て" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル2" })).toBeDisabled();
});
