import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorldViewModal from "features/worldView/components/ui-elements/WorldViewModal";
import { act } from "react-dom/test-utils";

const viewName = "デットフレイ";
const category = "砂漠";
const gifUrl = "https://media1.giphy.com/media";
const gifSiteTenor = "tenor";
const gifSiteGiphy = "giphy";
const isOpen = true;
const onClose = jest.fn();

test("閉じるボタンがレンダリングされていること", () => {
  render(
    <WorldViewModal
      name={viewName}
      categoryNameResult={category}
      gifUrl={gifUrl}
      gifSite={gifSiteGiphy}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
});

test("閉じるボタン押下でモーダルが閉じること", async () => {
  const user = userEvent.setup();
  render(
    <WorldViewModal
      name={viewName}
      categoryNameResult={category}
      gifUrl={gifUrl}
      gifSite={gifSiteGiphy}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "Close" }));
  });
  expect(onClose).toBeCalled();
});

test("絶景gifがレンダリングされていること", () => {
  render(
    <WorldViewModal
      name={viewName}
      categoryNameResult={category}
      gifUrl={gifUrl}
      gifSite={gifSiteGiphy}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
  expect(screen.getByRole("img", { name: "絶景gif" })).toBeInTheDocument();
});

test("絶景名がレンダリングされていること", () => {
  render(
    <WorldViewModal
      name={viewName}
      categoryNameResult={category}
      gifUrl={gifUrl}
      gifSite={gifSiteGiphy}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
  expect(screen.getByText(viewName)).toBeInTheDocument();
});

test("絶景のカテゴリー名がレンダリングされていること", () => {
  render(
    <WorldViewModal
      name={viewName}
      categoryNameResult={category}
      gifUrl={gifUrl}
      gifSite={gifSiteGiphy}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
  expect(screen.getByText(category)).toBeInTheDocument();
});

describe("gifサイトのロゴのテスト", () => {
  test("gifSiteがtenorである場合はtenorのロゴがレンダリングされていること", () => {
    render(
      <WorldViewModal
        name={viewName}
        categoryNameResult={category}
        gifUrl={gifUrl}
        gifSite={gifSiteTenor}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
    expect(screen.getByRole("img", { name: "tenorのロゴ" })).toBeInTheDocument();
  });
  test("gifSiteがgiphyである場合はgiphyのロゴがレンダリングされていること", () => {
    render(
      <WorldViewModal
        name={viewName}
        categoryNameResult={category}
        gifUrl={gifUrl}
        gifSite={gifSiteGiphy}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
    expect(screen.getByRole("img", { name: "giphyのロゴ" })).toBeInTheDocument();
  });
});
