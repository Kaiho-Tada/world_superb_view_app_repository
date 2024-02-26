import { Box, Center, Checkbox, Spinner } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";
import handleChangeVisibility from "utils/handleChangeVisibility";
import handleGetNestedCheckBoxInfo from "utils/handleGetNestedCheckBoxInfo";

type Props = {
  checkBoxItems: NestedCheckBoxItem[];
  loadingGetCheckBoxItems: boolean;
  loadingSearchModel: boolean;
  checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => void;
  isSkipSearchApiDispatch: (payload: boolean) => void;
};

const NestedCheckBox: FC<Props> = memo((props) => {
  const {
    checkBoxItems,
    loadingSearchModel,
    loadingGetCheckBoxItems,
    checkBoxItemsDispatch,
    isSkipSearchApiDispatch,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckBoxItem[]>({ e, checkBoxItems, checkBoxItemsDispatch });
  };

  const handleChangeParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({ e, checkBoxItems, checkBoxItemsDispatch });
  };

  const handleToggleVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeVisibility({ e, checkBoxItems, checkBoxItemsDispatch });
    isSkipSearchApiDispatch(true);
  };

  const checkBoxInfo = handleGetNestedCheckBoxInfo({ checkBoxItems });
  return loadingGetCheckBoxItems ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <Box>
      {checkBoxInfo.map((information) => (
        <Box key={information.parentLabel}>
          <Checkbox
            isChecked={information.allVisible}
            value={information.parentLabel}
            disabled={loadingSearchModel}
            onChange={handleToggleVisibility}
            colorScheme="teal"
          >
            {information.parentLabel}
          </Checkbox>
          <Box pl={6}>
            <Checkbox
              isChecked={information.allChecked}
              isIndeterminate={information.isIndeterminate}
              value={information.parentLabel}
              disabled={loadingSearchModel}
              onChange={handleChangeParent}
              colorScheme="teal"
              style={{ display: information.allVisible ? "inline-flex" : "none" }}
            >
              全て
            </Checkbox>
            {checkBoxItems.map((checkBoxItem) =>
              checkBoxItem.parentLabel === information.parentLabel ? (
                <Checkbox
                  key={checkBoxItem.label}
                  size="md"
                  colorScheme="teal"
                  isChecked={checkBoxItem.checked}
                  value={checkBoxItem.label}
                  onChange={handleChange}
                  isDisabled={loadingSearchModel}
                  style={{ display: checkBoxItem.isVisible ? "inline-flex" : "none" }}
                >
                  {checkBoxItem.label}
                </Checkbox>
              ) : null
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
});

export default NestedCheckBox;
