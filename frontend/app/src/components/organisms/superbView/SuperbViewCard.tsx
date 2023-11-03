import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import RiskLevelStar from "components/molecules/RiskLevelStar";
import { FC, memo } from "react";
import { RefCategory } from "types/ref/refCategory";
import { RefCharacteristic } from "types/ref/refCharacteristic";
import { RefCountry } from "types/ref/refCountry";

type Props = {
  name: string;
  imageUrl: string;
  bestSeason: string;
  countries: Array<RefCountry>;
  categories: Array<RefCategory>;
  characteristics: Array<RefCharacteristic>;
};

const SuperbViewCard: FC<Props> = memo((props) => {
  const { name, imageUrl, bestSeason, countries, categories, characteristics } = props;
  const countryNames = countries.map((country) => country.name);
  const countryNameResult = countryNames.length > 1 ? countryNames.join(" ") : countryNames[0];

  const riskLevels = countries.map((country) => country.riskLevel);
  const maxRiskLevel = Math.max(...riskLevels);

  const categoryNames = categories.map((category) => category.name);
  const categoryNameResult = categoryNames.length > 1 ? categoryNames.join(" ") : categoryNames[0];

  const characteristicNames = characteristics.map((characteristic) => characteristic.name);
  const characteristicNameResult =
    characteristicNames.length > 1 ? characteristicNames.join(" ") : characteristicNames[0];

  return (
    <Box>
      <Flex h="230px" bg="gray.100" color="blue.800" _hover={{ cursor: "pointer", opacity: "0.8" }}>
        <Box w="100%">
          <Image h="100%" w="100%" src={imageUrl} alt="絶景画像" />
        </Box>
        <Box>
          <Heading fontSize="lg" pt="3" pl="3" textShadow="1px 1px" noOfLines={1}>
            {name}
          </Heading>
          <Box pt="2" pl="3" textShadow="0.5px 0.5px">
            <Text role="heading" fontSize="sm" noOfLines={4} mb="2">
              ナイアガラは、北アメリカ大陸にある三つの滝から成る大瀑布で、その壮大な景観と迫力ある水量が特徴です。観光名所として知られ、アメリカとカナダの国境に位置しています。
            </Text>
            <Flex mb="1">
              <Text role="heading" bg="#B67B03" fontSize="xs" color="gray.100" mr="2" px="1">
                国名
              </Text>
              <Text role="heading" fontSize="xs" color="gray.500">
                {countryNameResult}
              </Text>
            </Flex>
            <Flex mb="1">
              <Text role="heading" bg="#B67B03" fontSize="xs" color="gray.100" mr="2" px="1">
                カテゴリー
              </Text>
              <Text role="heading" fontSize="xs" color="gray.500">
                {categoryNameResult}
              </Text>
            </Flex>
            <Flex mb="1">
              <Text
                role="heading"
                bg="#B67B03"
                fontSize="xs"
                color="gray.100"
                mr="2"
                px="1"
                noOfLines={1}
              >
                ベストシーズン
              </Text>
              <Text role="heading" fontSize="xs" color="gray.500" noOfLines={1}>
                {bestSeason}
              </Text>
            </Flex>
            <Flex mb="1">
              <Text role="heading" bg="#B67B03" fontSize="xs" color="gray.100" mr="2" px="1">
                リスクレベル
              </Text>
              <RiskLevelStar maxRiskLevel={maxRiskLevel} />
            </Flex>
            <Flex mb="1">
              <Text role="heading" bg="#B67B03" fontSize="xs" color="gray.100" mr="2" px="1">
                属性
              </Text>
              <Text role="heading" fontSize="xs" color="gray.500">
                {characteristicNameResult}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
});

export default SuperbViewCard;
