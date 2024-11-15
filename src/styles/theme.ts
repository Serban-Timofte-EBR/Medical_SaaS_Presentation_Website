import { createTheme } from "@mui/material/styles";
import { pink, grey, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500], // Pink for key actions
    },
    secondary: {
      main: blue[700], // Blue for supporting actions
    },
    background: {
      default: grey[100],
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      letterSpacing: "0.05rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "2rem",
      letterSpacing: "0.03rem",
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
