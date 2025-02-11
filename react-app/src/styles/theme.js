import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#666",
          "&.Mui-focused": {
            color: "#060606",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#060606",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase": {
            "&.Mui-checked": {
              color: "#060606",
              "& + .MuiSwitch-track": {
                backgroundColor: "#060606",
              },
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#060606",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#a4a3a3",
          },
        },
        containedError: {
          backgroundColor: "#d32f2f !important",
          color: "#FFFFFF !important",
          "&:hover": {
            backgroundColor: "#f13d35 !important",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#060606",
        },
      },
    },
  },
});

export default theme;
