import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC } from "react";

const FilterSearchBox: FC = () => {
  const { state, dispatch } = useWorldViewListContext();
  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_KEYWORD", payload: e.target.value });
    dispatch({ type: "SET_SHOULD_DEBOUNCE", payload: true });
  };
  const handleClearKeyword = () => dispatch({ type: "SET_KEYWORD", payload: "" });

  return (
    <Flex align="center" bg="white" borderRadius="20px" px="11px" py="5px" role="searchbox">
      <Input
        type="text"
        placeholder="絶景名または国名で絞り込み"
        aria-label="テキストボックス"
        color="black"
        size="sm"
        border="none"
        _focus={{ boxShadow: "none" }}
        disabled={state.loadingSearchWorldViews}
        value={state.keyword}
        onChange={handleChangeKeyword}
      />
      <SmallCloseIcon
        role="img"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearKeyword}
        color={state.loadingSearchWorldViews ? "gray.300" : "gray.500"}
        _hover={{ cursor: state.loadingSearchWorldViews ? "not-allowed" : "pointer" }}
        style={{ pointerEvents: state.loadingSearchWorldViews ? "none" : "auto" }}
      />
    </Flex>
  );
};
export default FilterSearchBox;
