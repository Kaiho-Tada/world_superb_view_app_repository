import { Box } from "@chakra-ui/react";
import { FC, memo } from "react";

interface Props {
  loadingSearchModels: boolean;
  handleClear: () => void;
}
const ClearButton: FC<Props> = memo(({ loadingSearchModels, handleClear }) => (
  <Box
    as="button"
    color="blue.500"
    w="100%"
    py="3"
    textAlign="center"
    textShadow="0.5px 0.5px #000000"
    fontSize="sm"
    fontWeight="bold"
    onClick={handleClear}
    disabled={loadingSearchModels}
  >
    クリア
  </Box>
));

export default ClearButton;
