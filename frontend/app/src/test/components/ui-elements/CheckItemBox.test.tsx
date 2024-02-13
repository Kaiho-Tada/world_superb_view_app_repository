import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckItemBox from "components/ui-elements/CheckItemBox";
import { act } from "react-dom/test-utils";

const mockCheckItemsDispatch = jest.fn();
test("CheckItemBoxがレンダリングされていること", () => {
  render(
    <CheckItemBox
      loadingGetModels={false}
      checkItems={[{ label: "ラベルA", checked: false }]}
      checkItemsDispatch={mockCheckItemsDispatch}
      loadingSearchModels={false}
    />
  );
  expect(screen.getByRole("button", { name: "ラベルA" })).toBeInTheDocument();
});

test("checkItemsのcheckedがtrueの場合、CheckItemBoxがチェックされていること", () => {
  render(
    <CheckItemBox
      loadingGetModels={false}
      checkItems={[
        { label: "ラベルA", checked: false },
        { label: "ラベルB", checked: true },
      ]}
      checkItemsDispatch={mockCheckItemsDispatch}
      loadingSearchModels={false}
    />
  );
  expect(screen.getByRole("button", { name: "ラベルA" })).not.toHaveStyle(
    "background-color: #4FD1C5"
  );
  expect(screen.getByRole("button", { name: "ラベルB" })).toHaveStyle("background-color: #4FD1C5");
});

test("loadingGetModelsがtrueの場合、スピナーが表示されていること", () => {
  render(
    <CheckItemBox
      loadingGetModels
      checkItems={[{ label: "ラベルA", checked: false }]}
      checkItemsDispatch={mockCheckItemsDispatch}
      loadingSearchModels={false}
    />
  );
  expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
});

test("loadingSearchModelsがtrueの場合、CheckItemBoxがdisabledになっていること", () => {
  render(
    <CheckItemBox
      loadingGetModels={false}
      checkItems={[{ label: "ラベルA", checked: false }]}
      checkItemsDispatch={mockCheckItemsDispatch}
      loadingSearchModels
    />
  );
  expect(screen.getByRole("button", { name: "ラベルA" })).toHaveStyle("opacity: 0.5");
  expect(screen.getByRole("button", { name: "ラベルA" })).toHaveStyle("pointer-events: none");
});

test("CheckItemBox押下でhandleChange関数が実行されること", async () => {
  const spyOnHandleChangeCheckItem = jest.spyOn(
    jest.requireActual("utils/handleChangeCheckItem"),
    "default"
  );
  const user = userEvent.setup();
  render(
    <CheckItemBox
      loadingGetModels={false}
      checkItems={[{ label: "ラベルA", checked: false }]}
      checkItemsDispatch={mockCheckItemsDispatch}
      loadingSearchModels={false}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ラベルA" }));
  });
  expect(spyOnHandleChangeCheckItem).toHaveBeenCalledWith({
    e: expect.objectContaining({
      target: screen.getByRole("button", { name: "ラベルA" }),
    }),
    checkItems: [{ label: "ラベルA", checked: false }],
    checkItemsDispatch: mockCheckItemsDispatch,
  });
});
