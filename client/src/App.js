import React from "react";
import { BrowserRouter} from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import "App.css";
import Sidebar from './components/Sidebar';
import UserRoutes from "routes/UserRoutes";
import AdminRoutes from "routes/AdminRoutes";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const { isAdmin } = useSelector(state => state.user) || {}

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserRoutes />
          {isAdmin === true && isAdmin !== null && <Sidebar>
          <AdminRoutes />
          </Sidebar>}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
