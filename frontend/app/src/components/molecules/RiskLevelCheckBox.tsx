import { Checkbox, Flex, Image, VStack } from "@chakra-ui/react";
import useRiskLevelHandleChange from "hooks/api/riskLevel/useRiskLevelHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import starIcon from "img/riskLevelStar.png";
import zeroStarIcon from "img/zoroRiskLevelStar.png";
import { FC, memo } from "react";
import { RiskLevel } from "types/riskLevel";

const RiskLevelCheckBox: FC = memo(() => {
  const { riskLevels, loadingSearchSuperbViews, loadingSuperbViews } = useSuperbViewListContext();
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
              isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
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
              isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
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
              isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
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
              isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
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
              isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
              key={riskLevel.label}
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
