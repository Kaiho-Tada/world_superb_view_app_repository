import { Checkbox, Flex, Image, VStack } from "@chakra-ui/react";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useRiskLevelHandleChange from "hooks/riskLevel/useRiskLevelHandleChange";
import starIcon from "img/riskLevelStar.png";
import zeroStarIcon from "img/zoroRiskLevelStar.png";
import { FC, memo } from "react";
import { RiskLevelCheckBoxItem } from "types/riskLevelCheckBoxItem";

const RiskLevelCheckBox: FC = memo(() => {
  const { state } = useWorldViewListContext();
  const { handleChangeRiskLevel } = useRiskLevelHandleChange();

  return (
    <VStack align="left">
      {state.riskLevelCheckBoxItems.map((riskLevelCheckBoxItem: RiskLevelCheckBoxItem) => {
        if (riskLevelCheckBoxItem.label === "4") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevelCheckBoxItem.label}
              isChecked={riskLevelCheckBoxItem.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevelCheckBoxItem.label}
              isDisabled={state.loadingSearchWorldViews}
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
        if (riskLevelCheckBoxItem.label === "3") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevelCheckBoxItem.label}
              isChecked={riskLevelCheckBoxItem.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevelCheckBoxItem.label}
              isDisabled={state.loadingSearchWorldViews}
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
        if (riskLevelCheckBoxItem.label === "2") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevelCheckBoxItem.label}
              isChecked={riskLevelCheckBoxItem.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevelCheckBoxItem.label}
              isDisabled={state.loadingSearchWorldViews}
              aria-label="リスクレベル2"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
              </Flex>
            </Checkbox>
          );
        }
        if (riskLevelCheckBoxItem.label === "1") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevelCheckBoxItem.label}
              isChecked={riskLevelCheckBoxItem.checked}
              onChange={handleChangeRiskLevel}
              key={riskLevelCheckBoxItem.label}
              isDisabled={state.loadingSearchWorldViews}
              aria-label="リスクレベル1"
            >
              <Flex align="center" pl="1">
                <Image boxSize="13px" src={starIcon} mr="1.5" alt="リスクレベル" />
              </Flex>
            </Checkbox>
          );
        }
        if (riskLevelCheckBoxItem.label === "0") {
          return (
            <Checkbox
              size="md"
              colorScheme="green"
              value={riskLevelCheckBoxItem.label}
              isChecked={riskLevelCheckBoxItem.checked}
              onChange={handleChangeRiskLevel}
              isDisabled={state.loadingSearchWorldViews}
              key={riskLevelCheckBoxItem.label}
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
