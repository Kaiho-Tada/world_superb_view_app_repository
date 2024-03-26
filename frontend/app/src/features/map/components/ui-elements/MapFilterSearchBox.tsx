import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface Props {
  keyword: string;
  loadingSearchModels: boolean;
  setKeywordDispatch: (newKeyword: string) => void;
  setShouldDebounceDispatch: (payload: boolean) => void;
  placeholder: string;
}

const MapFilterSearchBox: FC<Props> = (props) => {
  const {
    keyword,
    loadingSearchModels,
    setKeywordDispatch,
    setShouldDebounceDispatch,
    placeholder,
  } = props;
  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywordDispatch(e.target.value);
    setShouldDebounceDispatch(true);
  };
  const handleClearKeyword = () => setKeywordDispatch("");

  return (
    <Flex
      align="center"
      bg="white"
      borderRadius="20px"
      px="11px"
      py="5px"
      role="searchbox"
      border="1px solid #B2B8C0"
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
        role="button"
        aria-label="クリアボタン"
        boxSize={3.5}
        onClick={handleClearKeyword}
        _hover={{ cursor: "pointer" }}
        color={loadingSearchModels ? "gray.300" : "gray.500"}
        style={{ pointerEvents: loadingSearchModels ? "none" : "auto" }}
      />
    </Flex>
  );
};

export default MapFilterSearchBox;
