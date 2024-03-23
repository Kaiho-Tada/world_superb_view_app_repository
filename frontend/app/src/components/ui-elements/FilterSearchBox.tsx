import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";

interface Props {
  keyword: string;
  loadingSearchModels: boolean;
  keywordDispatch: (newKeyword: string) => void;
  shouldDebounceDispatch: (payload: boolean) => void;
  placeholder: string;
}
const FilterSearchBox: FC<Props> = memo((props) => {
  const { keyword, loadingSearchModels, keywordDispatch, shouldDebounceDispatch, placeholder } =
    props;
  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    keywordDispatch(e.target.value);
    shouldDebounceDispatch(true);
  };
  const handleClearKeyword = () => keywordDispatch("");

  return (
    <Flex
      align="center"
      bg="white"
      border="1px solid #B2B8C0"
      borderRadius="3px"
      pr="10px"
      py="5px"
      role="searchbox"
    >
      <Input
        type="text"
        placeholder={placeholder}
        color="black"
        size="sm"
        border="none"
        _focus={{ boxShadow: "none" }}
        disabled={loadingSearchModels}
        value={keyword}
        onChange={handleChangeKeyword}
      />
      <SmallCloseIcon
        role="img"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearKeyword}
        color={loadingSearchModels ? "gray.300" : "gray.500"}
        _hover={{ cursor: loadingSearchModels ? "not-allowed" : "pointer" }}
        style={{ pointerEvents: loadingSearchModels ? "none" : "auto" }}
      />
    </Flex>
  );
});

export default FilterSearchBox;
