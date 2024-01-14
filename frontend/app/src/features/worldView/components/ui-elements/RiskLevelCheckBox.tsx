import { Checkbox, Flex, Image, VStack } from "@chakra-ui/react";
import starIcon from "assets/riskLevelStar.png";
import zeroStarIcon from "assets/zoroRiskLevelStar.png";
import useHandleChangeCheckBox from "features/worldView/hooks/useHandleChangeCheckBox";
import { RiskLevelCheckBoxItem } from "features/worldView/types/checkBoxItems/riskLevelCheckBoxItem";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC, memo } from "react";

const RiskLevelCheckBox: FC = memo(() => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleChangeCheckBox } = useHandleChangeCheckBox();
  const checkBoxItems = state.riskLevelCheckBoxItems;

  const checkBoxItemsDispatch = (newCheckBoxItems: RiskLevelCheckBoxItem[]) => {
    dispatch({ type: "SET_RISK_LEVEL_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_RISK_LEVEL_LABELS", payload: newCheckedLabels });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox({ checkBoxItems, checkBoxItemsDispatch, e, checkedLabelsDispatch });
  };

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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
