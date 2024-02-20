import { Flex, Image, Select } from "@chakra-ui/react";
import sortIcon from "assets/sortIcon.png";
import useSortWordView from "features/worldView/hooks/useSortWordView";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const SortSelectBoxWithIcon = () => {
  const { handleSortChangeWorldView } = useSortWordView();
  const { state } = useWorldViewListContext();

  return (
    <Flex
      w="200px"
      bg="gray.100"
      color="purple.800"
      align="center"
      ml="3"
      _hover={{ opacity: "0.8" }}
    >
      <Image boxSize="20px" src={sortIcon} ml="3" />
      <Select
        style={{ display: "inline" }}
        border="none"
        _focus={{ boxShadow: "none" }}
        fontWeight="bold"
        size="lg"
        fontSize="md"
        _hover={{ cursor: "pointer" }}
        onChange={handleSortChangeWorldView}
        aria-label="並び替えオプションの選択"
        disabled={state.loadingSearchWorldViews}
      >
        <option value="BMI値が低い順">BMI値が低い順</option>
        <option value="新しい順">新しい順</option>
        <option value="いいね順">いいね順</option>
        <option value="RISKLEVELが低い順">RISKLEVELが低い順</option>
      </Select>
    </Flex>
  );
};

export default SortSelectBoxWithIcon;
