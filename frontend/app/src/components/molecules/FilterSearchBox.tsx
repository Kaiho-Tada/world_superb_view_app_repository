import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import useSearchSuperbView from "hooks/api/superbView/useSearchSuperbView";
import useDebounce from "hooks/debounce/useDebounce";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, FC, useEffect } from "react";

const FilterSearchBox: FC = () => {
  const { keyword, setKeyword, loadingSuperbViews, loadingSearchSuperbViews } =
    useSuperbViewListContext();
  const { debounce } = useDebounce(1000);
  const { handleSearchSuperbView } = useSearchSuperbView();
  useEffect(() => {
    debounce(handleSearchSuperbView);
  }, [keyword]);

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);
  const handleClearKeyword = () => setKeyword("");

  return (
    <Flex align="center" bg="white" borderRadius="5px" px="11px" py="5px" role="searchbox">
      <Input
        type="text"
        placeholder="絶景名または国名で検索"
        aria-label="テキストボックス"
        color="black"
        size="sm"
        border="none"
        _focus={{ boxShadow: "none" }}
        disabled={loadingSuperbViews || loadingSearchSuperbViews}
        value={keyword}
        onChange={handleChangeKeyword}
      />
      <SmallCloseIcon
        role="img"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearKeyword}
        color="gray.500"
        _hover={{ cursor: "pointer" }}
      />
    </Flex>
  );
};
export default FilterSearchBox;
