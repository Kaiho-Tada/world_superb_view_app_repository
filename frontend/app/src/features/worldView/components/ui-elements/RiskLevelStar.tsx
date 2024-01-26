import { Flex, Image } from "@chakra-ui/react";
import starIcon from "assets/riskLevelStar.png";
import zeroStarIcon from "assets/zoroRiskLevelStar.png";

import { FC, memo } from "react";

type Props = {
  maxRiskLevel: number;
};
const RiskLevelStar: FC<Props> = memo((props) => {
  const { maxRiskLevel } = props;
  return (
    <>
      {(() => {
        if (maxRiskLevel === 4) {
          return (
            <Flex align="center">
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
            </Flex>
          );
        }
        if (maxRiskLevel === 3) {
          return (
            <Flex align="center">
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
            </Flex>
          );
        }
        if (maxRiskLevel === 2) {
          return (
            <Flex align="center">
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
            </Flex>
          );
        }
        if (maxRiskLevel === 1) {
          return (
            <Flex align="center">
              <Image boxSize="13px" src={starIcon} mr="0.5" alt="リスクレベル" />
            </Flex>
          );
        }
        if (maxRiskLevel === 0) {
          return (
            <Flex align="center">
              <Image boxSize="13px" src={zeroStarIcon} mr="0.5" alt="リスクレベル(0)" />
            </Flex>
          );
        }
        return null;
      })()}
    </>
  );
});

export default RiskLevelStar;
