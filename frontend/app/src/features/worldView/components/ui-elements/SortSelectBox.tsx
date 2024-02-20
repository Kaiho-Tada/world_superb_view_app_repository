import { Box, Select } from "@chakra-ui/react";
import useSortWordView from "features/worldView/hooks/useSortWordView";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const SortSelectBox = () => {
  const { handleSortChangeWorldView } = useSortWordView();
  const { state } = useWorldViewListContext();
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
        onChange={handleSortChangeWorldView}
        disabled={state.loadingSearchWorldViews}
      >
        <option value="BMI値が低い順">BMI値が低い順</option>
        <option value="新しい順">新しい順</option>
        <option value="いいね順">いいね順</option>
        <option value="RISKLEVELが低い順">RISKLEVELが低い順</option>
      </Select>
    </Box>
  );
};
export default SortSelectBox;
