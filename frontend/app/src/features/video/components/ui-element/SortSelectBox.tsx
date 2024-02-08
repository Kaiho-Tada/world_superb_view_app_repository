import { Box, Select } from "@chakra-ui/react";
import useSortChange from "features/video/hooks/useSortChange";
import { useVideoListContext } from "providers/VideoListProvider";

const SortSelectBox = () => {
  const { handleChangeSort } = useSortChange();
  const { state } = useVideoListContext();
  return (
    <Box bg="gray.300" borderRadius="3px">
      <Select
        aria-label="並び替えのセレクトボックス"
        bg="transparent"
        size="sm"
        fontSize="md"
        border="none"
        _hover={{ cursor: "pointer" }}
        _focus={{ boxShadow: "none" }}
        onChange={handleChangeSort}
        disabled={state.loadingSearchVideos}
      >
        <option value="人気が高い順">人気が高い順</option>
        <option value="評価が高い順">評価が高い順</option>
        <option value="公開日が早い順">公開日が早い順</option>
      </Select>
    </Box>
  );
};
export default SortSelectBox;
