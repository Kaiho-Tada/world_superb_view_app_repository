import { Box, Flex, Heading, Image, Text, WrapItem } from "@chakra-ui/react";
import Favorite from "components/atoms/worldView/Favorite";
import RiskLevelStar from "components/molecules/RiskLevelStar";
import { FC, memo } from "react";
import { WorldViewFavorite } from "types/api/worldViewFavorite";
import { RefCategory } from "types/ref/refCategory";
import { RefCharacteristic } from "types/ref/refCharacteristic";
import { RefCountry } from "types/ref/refCountry";

type Props = {
  id: number;
  name: string;
  imgUrl: string;
  bestSeason: string;
  countries: Array<RefCountry>;
  categories: Array<RefCategory>;
  characteristics: Array<RefCharacteristic>;
  favorites: Array<WorldViewFavorite>;
};

const WorldViewCard: FC<Props> = memo((props) => {
  const { id, name, imgUrl, bestSeason, countries, categories, characteristics, favorites } = props;
  const countryNames = countries.map((country) => country.name);
  const countryNameResult = countryNames.length > 1 ? countryNames.join(" ") : countryNames[0];

  const riskLevels = countries.map((country) => country.riskLevel);
  const maxRiskLevel = Math.max(...riskLevels);

  const categoryNames = categories.map((category) => category.name);
  const categoryNameResult = categoryNames.length > 1 ? categoryNames.join(" ") : categoryNames[0];

  const characteristicNames = characteristics.map((characteristic) => characteristic.name);
  const characteristicNameResult =
    characteristicNames.length > 1 ? characteristicNames.join(" ") : characteristicNames[0];

  const countryBmi = countries.map((country) => country.bmi);
  const countryBmiResult = countryBmi.length > 1 ? countryBmi.join("% ") : countryBmi[0];

  return (
    <WrapItem
      role="listitem"
      w={{ sm: "100%", md: "49%" }}
      key={id}
      aria-label={`絶景一覧: ${name}`}
    >
      <Box position="relative">
        <Flex
          h="270px"
          bg="gray.100"
          color="blue.800"
          _hover={{ cursor: "pointer", opacity: "0.8" }}
        >
          <Box w="100%">
            <Image h="100%" w="100%" src={imgUrl} alt="絶景画像" />
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
                <Text
                  role="heading"
                  bg="#B67B03"
                  fontSize="xs"
                  color="gray.100"
                  mr="2"
                  px="1"
                  noOfLines={1}
                >
                  リスクレベル
                </Text>
                <RiskLevelStar maxRiskLevel={maxRiskLevel} />
                {countries.length > 1 && (
                  <Text role="heading" fontSize="xs" color="gray.500" noOfLines={1} pl="0.5">
                    (リスクレベルの高い方を表示)
                  </Text>
                )}
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
                  属性
                </Text>
                <Text role="heading" fontSize="xs" color="gray.500" noOfLines={1}>
                  {characteristicNameResult}
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
                  BMI
                </Text>
                <Text role="heading" fontSize="xs" color="gray.500" noOfLines={1}>
                  {countryBmiResult}%
                </Text>
              </Flex>
            </Box>
          </Box>
          <Favorite selectedId={id} favorites={favorites} />
        </Flex>
      </Box>
    </WrapItem>
  );
});

export default WorldViewCard;
