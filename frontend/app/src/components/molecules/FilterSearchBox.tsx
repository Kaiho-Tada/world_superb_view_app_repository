import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { ChangeEvent, FC } from "react";

const FilterSearchBox: FC = () => {
  const { keyword, setKeyword, loadingSearchWorldViews, setShouldDebounce } =
    useWorldViewListContext();

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
        disabled={loadingSearchWorldViews}
        value={keyword}
        onChange={handleChangeKeyword}
      />
      <SmallCloseIcon
        role="img"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearKeyword}
        color={loadingSearchWorldViews ? "gray.300" : "gray.500"}
        _hover={{ cursor: loadingSearchWorldViews ? "not-allowed" : "pointer" }}
        style={{ pointerEvents: loadingSearchWorldViews ? "none" : "auto" }}
      />
    </Flex>
  );
};
export default FilterSearchBox;
