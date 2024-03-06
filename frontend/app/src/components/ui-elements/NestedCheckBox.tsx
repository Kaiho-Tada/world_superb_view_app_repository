import { Box, Center, Checkbox, Spinner } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";
import { NestedCheckItem } from "types/nestedCheckItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";
import handleChangeVisibility from "utils/handleChangeVisibility";
import handleGetNestedCheckItemInfo from "utils/handleGetNestedCheckItemInfo";

type Props = {
  checkItems: NestedCheckItem[];
  loadingGetCheckItems: boolean;
  loadingSearchModel: boolean;
  checkItemsDispatch: (newCheckBoxItems: NestedCheckItem[]) => void;
  isSkipSearchApiDispatch: (payload: boolean) => void;
};

const NestedCheckBox: FC<Props> = memo((props) => {
  const {
    checkItems,
    loadingGetCheckItems,
    loadingSearchModel,
    checkItemsDispatch,
    isSkipSearchApiDispatch,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckItem[]>({ e, checkItems, checkItemsDispatch });
  };

  const handleChangeParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({ e, checkItems, checkItemsDispatch });
  };

  const handleToggleVisibility = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeVisibility({ e, checkItems, checkItemsDispatch });
    isSkipSearchApiDispatch(true);
  };

  const checkBoxInfo = handleGetNestedCheckItemInfo({ checkItems });

  return loadingGetCheckItems ? (
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
            {checkItems.map((checkItem) =>
              checkItem.parentLabel === information.parentLabel ? (
                <Checkbox
                  key={checkItem.label}
                  size="md"
                  colorScheme="teal"
                  isChecked={checkItem.checked}
                  value={checkItem.label}
                  onChange={handleChange}
                  isDisabled={loadingSearchModel}
                  style={{ display: checkItem.isVisible ? "inline-flex" : "none" }}
                >
                  {checkItem.label}
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
