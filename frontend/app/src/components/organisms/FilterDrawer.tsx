import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import FilterDrawerAccordion from "components/organisms/FilterDrawerAccordion";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC, memo } from "react";

const FilterDrawer: FC = memo(() => {
  const { state, dispatch } = useWorldViewListContext();

  return (
    <Drawer
      placement="right"
      onClose={() => dispatch({ type: "CLOSE_FILTER_DRAWER" })}
      isOpen={state.isOpenFilterDrawer}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody py={3} bg="blue.800">
            <FilterDrawerAccordion />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
export default FilterDrawer;
