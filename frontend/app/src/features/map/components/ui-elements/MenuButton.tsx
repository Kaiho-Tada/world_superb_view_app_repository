import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  onOpen: () => void;
};
const MenuButton: FC<Props> = memo((props) => {
  const { onOpen } = props;
  return (
    <IconButton
      aria-label="メニューボタン"
      icon={<HamburgerIcon />}
      variant="unstyled"
      fontSize={{ base: "30px", md: "35px" }}
      color="#000"
      onClick={onOpen}
    />
  );
});
export default MenuButton;
