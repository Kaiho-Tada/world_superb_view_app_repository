import { extendTheme } from "@chakra-ui/react";
import buttonTheme from "./buttonTheme";
import checkboxTheme from "./checkboxTheme";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blue.800",
        color: "white",
      },
    },
  },
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
  },
});

export default theme;
