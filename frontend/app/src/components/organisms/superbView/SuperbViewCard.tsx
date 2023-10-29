import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  name: string;
  imageUrl: string;
  bestSeason: string;
};

const SuperbViewCard: FC<Props> = memo((props) => {
  const { name, imageUrl, bestSeason } = props;
  return (
    <Box>
      <Flex h="180px" bg="gray.100" color="blue.800" _hover={{ cursor: "pointer", opacity: "0.8" }}>
        <Box w="100%">
          <Image h="100%" w="100%" src={imageUrl} alt="絶景画像" />
        </Box>
        <Box>
          <Heading fontSize="lg" pt="3" pl="3" textShadow="1px 1px">
            {name}
          </Heading>
          <Box pt="2" pl="3" textShadow="0.5px 0.5px">
            <Text role="heading" fontSize="sm" noOfLines={4}>
              ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。
            </Text>
            <Flex>
              <Text role="heading" bg="#B67B03" fontSize="xs" color="gray.100" mr="2">
                ベストシーズン
              </Text>
              <Text role="heading" fontSize="xs" color="gray.500">
                {bestSeason}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
});

export default SuperbViewCard;
