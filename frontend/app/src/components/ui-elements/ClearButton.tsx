import { Box } from "@chakra-ui/react";
import useClear from "features/video/hooks/useClear";
import { FC, memo } from "react";

interface Props {
  loadingSearchModels: boolean;
}
const ClearButton: FC<Props> = memo(({ loadingSearchModels }) => {
  const { handleClear } = useClear();

  return (
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
  );
});

export default ClearButton;
