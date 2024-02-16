import { Box } from "@chakra-ui/react";

interface Props {
  handleClick: () => void;
  loadingSearchModels: boolean;
  disabled: boolean;
}
const SearchButton = ({ handleClick, loadingSearchModels, disabled }: Props) => (
  <Box textAlign="center">
    <Box
      role="button"
      color="white"
      backgroundColor="#46b8aa"
      borderRadius="30px"
      fontSize="lg"
      py="1.5"
      w="60%"
      style={{
        display: "inline-block",
        opacity: loadingSearchModels || disabled ? 0.5 : 1,
        pointerEvents: loadingSearchModels || disabled ? "none" : "auto",
      }}
      onClick={handleClick}
      _hover={{ backgroundColor: "black" }}
    >
      検索
    </Box>
  </Box>
);

export default SearchButton;
