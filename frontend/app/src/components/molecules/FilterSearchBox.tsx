import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { ChangeEvent, FC } from "react";

const FilterSearchBox: FC = () => {
  const { keyword, setKeyword, loadingSearchSuperbViews, setShouldDebounce } =
    useSuperbViewListContext();

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setShouldDebounce(true);
  };
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
        disabled={loadingSearchSuperbViews}
        value={keyword}
        onChange={handleChangeKeyword}
      />
      <SmallCloseIcon
        role="img"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearKeyword}
        color={loadingSearchSuperbViews ? "gray.300" : "gray.500"}
        _hover={{ cursor: loadingSearchSuperbViews ? "not-allowed" : "pointer" }}
        style={{ pointerEvents: loadingSearchSuperbViews ? "none" : "auto" }}
      />
    </Flex>
  );
};
export default FilterSearchBox;
