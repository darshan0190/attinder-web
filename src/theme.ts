import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: red.A400,
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: red.A400,
    },
  },
});

export default theme;
