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
    py="2.5"
    px={{ base: "3", sm: "4" }}
    onClick={onOpen}
  >
    <Image
      boxSize={{ base: "14px", sm: "16px" }}
      src={filterIcon}
      alt="フィルターアイコン"
      mr="1"
    />
    <Text color="blue.900" textShadow="0.5px 0.5px #00008B" fontSize={{ base: "sm", sm: "md" }}>
      フィルター
    </Text>
  </Flex>
));

export default FilterButton;
