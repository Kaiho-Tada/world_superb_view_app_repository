import { extendTheme } from "@chakra-ui/react";

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
    Button: {
      baseStyle: {
        _hover: {
          backgroundColor: "red.500",
        },
        _text: {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
        },
      },
      variants: {
        primaryA: {
          bg: "teal.400",
          color: "white",
          _text: {
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
          },
          width: "60",
        },
        primaryB: {
          bg: "cyan.400",
          color: "white",
          _text: {
            textShadow: "10px 2px 4px rgba(0, 0, 0, 0.4)",
          },
          width: "60",
        },
        secoundary: {
          bg: "#808080",
          color: "white",
          _text: {
            textShadow: "10px 2px 4px rgba(0, 0, 0, 0.4)",
          },
          width: "60",
        },
        danger: {
          bg: "red.600",
          color: "white",
          _text: {
            textShadow: "10px 2px 4px rgba(0, 0, 0, 0.4)",
          },
          width: "60",
        },
      },
    },
  },
});

export default theme;
