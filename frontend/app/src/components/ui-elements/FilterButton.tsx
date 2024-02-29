import { Flex, Image, Text } from "@chakra-ui/react";
import filterIcon from "assets/filterIcon.png";
import { FC, memo } from "react";

interface Props {
  onOpen: () => void;
}

const FilterButton: FC<Props> = memo(({ onOpen }) => (
  <Flex
    as="button"
    bg="gray.100"
    align="center"
    justify="center"
    py={{ base: "2", sm: "3" }}
    px={{ base: "3", sm: "4" }}
    onClick={onOpen}
  >
    <Image boxSize="16px" src={filterIcon} alt="フィルターアイコン" mr="1" />
    <Text color="blue.900" textShadow="0.5px 0.5px #00008B" fontSize="md">
      フィルター
    </Text>
  </Flex>
));

export default FilterButton;
