import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "components/ui-elements/Pagination";

const firstPage = 1;
const lastPage = 10;
const pageCount = 10;
const currentPage = 5;
const mockHandlePageChange = jest.fn();

describe("previousボタンのテスト", () => {
  test("previousボタンが表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: "前のページに移動" })).toBeInTheDocument();
  });

  test("currentPageが最初のページである場合、previousボタンが非活性になっていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={firstPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: "前のページに移動" })).toBeDisabled();
  });

  test("previousボタン押下で前のページに移動すること", async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    await user.click(screen.getByRole("button", { name: "前のページに移動" }));
    expect(mockHandlePageChange).toHaveBeenCalledWith(currentPage - 1);
    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
  });
});

describe("nextボタンのテスト", () => {
  test("nextボタンが表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: "次のページに移動" })).toBeInTheDocument();
  });

  test("currentPageが最後のページである場合、nextボタンが非活性になっていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={lastPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: "次のページに移動" })).toBeDisabled();
  });

  test("nextボタン押下で、次のページに移動すること", async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    await user.click(screen.getByRole("button", { name: "次のページに移動" }));
    expect(mockHandlePageChange).toHaveBeenCalledWith(currentPage + 1);
    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
  });
});

describe("PageNumberボタンのテスト", () => {
  test("currentPageのページのボタンが表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: `ページ${currentPage}に移動` })).toBeInTheDocument();
  });

  test("最初のページのボタンが表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: `ページ${firstPage}に移動` })).toBeInTheDocument();
  });

  test("最後のページのボタンが表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(screen.getByRole("button", { name: `ページ${lastPage}に移動` })).toBeInTheDocument();
  });

  describe("最初のページがcurrentPageである場合", () => {
    test("2番目と3番目のページのボタンが表示されていること", () => {
      render(
        <Pagination
          pageCount={pageCount}
          currentPage={firstPage}
          handlePageChange={mockHandlePageChange}
        />
      );
      expect(
        screen.getByRole("button", { name: `ページ${firstPage + 1}に移動` })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: `ページ${firstPage + 2}に移動` })
      ).toBeInTheDocument();
    });
  });

  describe("2番目のページがcurrentPageである場合", () => {
    test("3番目のページのボタンが表示されていること", () => {
      render(
        <Pagination
          pageCount={pageCount}
          currentPage={firstPage + 1}
          handlePageChange={mockHandlePageChange}
        />
      );
      expect(
        screen.getByRole("button", { name: `ページ${firstPage + 2}に移動` })
      ).toBeInTheDocument();
    });
  });

  describe("最後のページがcurrentPageである場合", () => {
    test("最後から2番目と3番目のページのボタンが表示されていること", () => {
      render(
        <Pagination
          pageCount={pageCount}
          currentPage={lastPage}
          handlePageChange={mockHandlePageChange}
        />
      );
      expect(
        screen.getByRole("button", { name: `ページ${lastPage - 1}に移動` })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: `ページ${lastPage - 2}に移動` })
      ).toBeInTheDocument();
    });
  });

  describe("最後から2番目のページがcurrentPageである場合", () => {
    test("最後から3番目のページのボタンが表示されていること", () => {
      render(
        <Pagination
          pageCount={pageCount}
          currentPage={lastPage - 1}
          handlePageChange={mockHandlePageChange}
        />
      );
      expect(
        screen.getByRole("button", { name: `ページ${lastPage - 2}に移動` })
      ).toBeInTheDocument();
    });
  });
});

describe("Ellipsisボタンのテスト", () => {
  test("currentPageの前後のボタンが省略記号で表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(
      screen.getByRole("button", {
        name: `ページ${currentPage - 1}ボタンを省略記号表示にしています`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `ページ${currentPage + 1}ボタンを省略記号表示にしています`,
      })
    ).toBeInTheDocument();
  });

  test("省略記号ボタンが非活性になっていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(
      screen.getByRole("button", {
        name: `ページ${currentPage - 1}ボタンを省略記号表示にしています`,
      })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: `ページ${currentPage + 1}ボタンを省略記号表示にしています`,
      })
    ).toBeDisabled();
  });

  test("最初のページがcurrentPageである場合、4番目のページのボタンが省略記号で表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={firstPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(
      screen.getByRole("button", { name: `ページ${firstPage + 3}ボタンを省略記号表示にしています` })
    ).toBeInTheDocument();
  });

  test("2番目のページがcurrentPageである場合、4番目のページのボタンが省略記号で表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={firstPage + 1}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(
      screen.getByRole("button", { name: `ページ${firstPage + 3}ボタンを省略記号表示にしています` })
    ).toBeInTheDocument();
  });

  test("最後のページがcurrentPageである場合、最後から4番目のページのボタンが省略記号で表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={lastPage}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(
      screen.getByRole("button", { name: `ページ${lastPage - 3}ボタンを省略記号表示にしています` })
    ).toBeInTheDocument();
  });

  test("最後から2番目のページがcurrentPageである場合、最後から4番目のページのボタンが省略記号で表示されていること", () => {
    render(
      <Pagination
        pageCount={pageCount}
        currentPage={lastPage - 1}
        handlePageChange={mockHandlePageChange}
      />
    );
    expect(
      screen.getByRole("button", { name: `ページ${lastPage - 3}ボタンを省略記号表示にしています` })
    ).toBeInTheDocument();
  });
});
