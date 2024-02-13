import { Box } from "@chakra-ui/react";
import Loading from "components/ui-elements/Loading";
import { FC, memo, MouseEvent } from "react";
import CheckItem from "types/checkItem";
import handleChangeCheckItem from "utils/handleChangeCheckItem";

interface Props {
  loadingGetModels: boolean;
  checkItems: CheckItem[];
  checkItemsDispatch: (newCheckItems: CheckItem[]) => void;
  loadingSearchModels: boolean;
}
const CheckItemBox: FC<Props> = memo(
  ({ loadingGetModels, checkItems, checkItemsDispatch, loadingSearchModels }) => {
    const handleChange = (e: MouseEvent<HTMLDivElement>) => {
      handleChangeCheckItem({
        e,
        checkItems,
        checkItemsDispatch,
      });
    };
    return (
      <div>
        {loadingGetModels ? (
          <Loading />
        ) : (
          checkItems.map((checkItem) => (
            <Box
              key={checkItem.label}
              role="button"
              style={{
                display: "inline-block",
                backgroundColor: checkItem.checked ? "#4FD1C5" : "",
                opacity: loadingSearchModels ? 0.5 : 1,
                pointerEvents: loadingSearchModels ? "none" : "auto",
              }}
              px="3"
              py="1.5"
              border="1px solid #3d3333"
              borderRadius="20px"
              fontSize="sm"
              m="0.5"
              _hover={{ cursor: "pointer" }}
              onClick={handleChange}
            >
              {checkItem.label}
            </Box>
          ))
        )}
      </div>
    );
  }
);

export default CheckItemBox;
