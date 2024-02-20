import { Flex, Image, Select } from "@chakra-ui/react";
import sortIcon from "assets/sortIcon.png";
import useSortChange from "features/worldView/hooks/useSortChange";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const SortSelectBoxWithIcon = () => {
  const { handleChangeSort } = useSortChange();
  const { state } = useWorldViewListContext();

  return (
    <Flex w="200px" bg="gray.100" color="purple.800" align="center" _hover={{ opacity: "0.8" }}>
      <Image boxSize="20px" src={sortIcon} ml="3" />
      <Select
        style={{ display: "inline" }}
        border="none"
        _focus={{ boxShadow: "none" }}
        fontWeight="bold"
        size={{ base: "md", sm: "lg" }}
        fontSize="md"
        _hover={{ cursor: "pointer" }}
        onChange={handleChangeSort}
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
