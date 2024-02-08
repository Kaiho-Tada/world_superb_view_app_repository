import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortAccordion from "features/video/components/ui-parts/SortAccordion";
import { VideoListProvider } from "providers/VideoListProvider";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

test("アコーディオンがレンダリングされていること", () => {
  render(
    <VideoListProvider>
      <SortAccordion />
    </VideoListProvider>
  );
  expect(screen.getByRole("region", { name: "並び替えのアコーディオン" })).toBeInTheDocument();
});

test("アコーディオンボタンがレンダリングされていること", () => {
  render(
    <VideoListProvider>
      <SortAccordion />
    </VideoListProvider>
  );
  expect(screen.getByRole("button", { name: "並び替え" })).toBeInTheDocument();
});

test("アコーディオンボタン押下でセレクトボックスが表示されること", async () => {
  const user = userEvent.setup();
  render(
    <VideoListProvider>
      <SortAccordion />
    </VideoListProvider>
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "並び替え" }));
  });
  expect(screen.getByRole("combobox", { name: "並び替えのセレクトボックス" })).toBeInTheDocument();
});
