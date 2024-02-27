import { createTheme, Theme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D58EF",
    },
    secondary: {
      main: "#848484",
      dark: "#000000",
    },
  },
});

interface CustomThemeProviderProps {
  children: React.ReactNode;
  theme: Theme;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
  theme,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { theme, CustomThemeProvider };
