import { Checkbox, Flex, Image, VStack } from "@chakra-ui/react";
import useRiskLevelHandleChange from "hooks/api/riskLevel/useRiskLevelHandleChange";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import starIcon from "img/riskLevelStar.png";
import zeroStarIcon from "img/zoroRiskLevelStar.png";
import { FC, memo } from "react";
import { RiskLevel } from "types/riskLevel";

const RiskLevelCheckBox: FC = memo(() => {
  const { riskLevels, loadingSearchWorldViews } = useWorldViewListContext();
  const { handleChangeRiskLevel } = useRiskLevelHandleChange();

  return (
    <VStack align="left">
      {riskLevels.map((riskLevel: RiskLevel) => {
        if (riskLevel.label === "4") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevel.label}
              isChecked={riskLevel.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevel.label}
              isDisabled={loadingSearchWorldViews}
              aria-label="リスクレベル4"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
              </Flex>
            </Checkbox>
          );
        }
        if (riskLevel.label === "3") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevel.label}
              isChecked={riskLevel.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevel.label}
              isDisabled={loadingSearchWorldViews}
              aria-label="リスクレベル3"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
              </Flex>
            </Checkbox>
          );
        }
        if (riskLevel.label === "2") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevel.label}
              isChecked={riskLevel.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevel.label}
              isDisabled={loadingSearchWorldViews}
              aria-label="リスクレベル2"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
              </Flex>
            </Checkbox>
          );
        }
        if (riskLevel.label === "1") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevel.label}
              isChecked={riskLevel.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevel.label}
              isDisabled={loadingSearchWorldViews}
              aria-label="リスクレベル1"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
              </Flex>
            </Checkbox>
          );
        }
        if (riskLevel.label === "0") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevel.label}
              isChecked={riskLevel.checked}
              onChange={handleChangeRiskLevel}
              isDisabled={loadingSearchWorldViews}
              key={riskLevel.label}
              aria-label="リスクレベル0"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={zeroStarIcon} mr="1.5" alt="リスクレベル(0)" />
              </Flex>
            </Checkbox>
          );
        }
        return null;
      })}
    </VStack>
  );
});

export default RiskLevelCheckBox;
