import { Button, Heading, Image } from "@chakra-ui/react";
import useClickFilterButton from "hooks/useClickFilterButton";
import filterIcon from "img/filterIcon.png";

const FilterButton = () => {
  const { handleClickFilterButton } = useClickFilterButton();

  return (
    <Button
      colorScheme="red"
      variant="outline"
      onClick={handleClickFilterButton}
      size="lg"
      bg="gray.100"
      _hover={{ cursor: "pointer", opacity: "0.8" }}
      borderRadius="0"
    >
      <Image boxSize="20px" src={filterIcon} color="red" mr="2" alt="フィルターアイコン" />
      <Heading size="sm">絞り込み</Heading>
    </Button>
  );
};
export default FilterButton;
