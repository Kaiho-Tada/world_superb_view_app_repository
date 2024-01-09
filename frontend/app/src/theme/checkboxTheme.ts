import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys
);

const baseStyle = definePartsStyle({
  label: {
    fontFamily: "mono",
    textShadow: "2px 2px #000000",
    pr: 1,
  },
  control: {
    borderRadius: 0,
    boxShadow: "2px 2px #000000",
    _disabled: {
      borderColor: "gray.500",
      backgroundColor: "transparent",
    },
  },
});

const checkboxTheme = defineMultiStyleConfig({ baseStyle });
export default checkboxTheme;
