import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FC, memo } from "react";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
};

const Pagination: FC<PaginationProps> = memo((props) => {
  const { pageCount, currentPage, handlePageChange } = props;

  return (
    <div>
      {pageCount > 1 && (
        <Box
          display="flex"
          justifyContent="center"
          mt="6"
          role="navigation"
          aria-label="ページネーション"
        >
          <ButtonGroup>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              bg="cyan.600"
              color="white"
              borderRadius="999"
              aria-label="前のページに移動"
            >
              <ChevronLeftIcon />
            </Button>

            {[...Array(pageCount)].map((_, index) => {
              const pageIndex = index + 1;

              const isFirstPage = currentPage === 1;
              const isSecondPage = currentPage === 2;
              const isLastPage = currentPage === pageCount;
              const isSecondToLastPage = currentPage === pageCount - 1;

              const shouldDisplayPageNumber =
                pageIndex === currentPage ||
                pageIndex === 1 ||
                pageIndex === pageCount ||
                (isFirstPage && (pageIndex === currentPage + 1 || pageIndex === currentPage + 2)) ||
                (isSecondPage && pageIndex === currentPage + 1) ||
                (isLastPage && (pageIndex === currentPage - 1 || pageIndex === currentPage - 2)) ||
                (isSecondToLastPage && pageIndex === currentPage - 1);

              const shouldDisplayEllipsis =
                pageIndex === currentPage - 1 ||
                pageIndex === currentPage + 1 ||
                (isFirstPage && pageIndex === currentPage + 3) ||
                (isSecondPage && pageIndex === currentPage + 2) ||
                (isLastPage && pageIndex === currentPage - 3) ||
                (isSecondToLastPage && pageIndex === currentPage - 2);

              if (shouldDisplayPageNumber) {
                return (
                  <Button
                    key={pageIndex}
                    onClick={() => handlePageChange(pageIndex)}
                    bg={currentPage === pageIndex ? "cyan.600" : "white"}
                    color={currentPage === pageIndex ? "white" : "cyan.600"}
                    borderRadius="999"
                    aria-label={`ページ${pageIndex}に移動`}
                  >
                    {pageIndex}
                  </Button>
                );
              }
              if (shouldDisplayEllipsis) {
                return (
                  <Button
                    key={pageIndex}
                    isDisabled
                    borderRadius="999"
                    aria-label={`ページ${pageIndex}ボタンを省略記号表示にしています`}
                  >
                    ...
                  </Button>
                );
              }
              return null;
            })}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === pageCount}
              bg="cyan.600"
              color="white"
              borderRadius="999"
              aria-label="次のページに移動"
            >
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </div>
  );
});

export default Pagination;
