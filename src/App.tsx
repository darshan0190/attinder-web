import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SwipePage from "./pages/SwipePage";
import HomePage from "./pages/HomePage";
import { AccountContext } from "./context/AccountContext";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import HomePage2 from "./pages/HomePage2";
import DataPage from "./pages/DataPage";
import IntrimPage from "./pages/InterimPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  const { authentication } = React.useContext(AccountContext);

  useEffect(() => {}, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        {authentication ? (
          <div className="App">
            <BrowserRouter>
              <CssBaseline />
              <Routes>
                <Route path="/swipe" element={<SwipePage />} />
                <Route path="/home2" element={<HomePage2 />} />
                <Route path="/data" element={<DataPage />} />
                <Route path="/subject" element={<IntrimPage />} />
                {authentication ? (
                  <Route path="/home" element={<HomePage />} />
                ) : (
                  <Route path="/login" element={<LoginPage />} />
                )}
                <Route path="/" element={<HomePage />} />
              </Routes>
            </BrowserRouter>
          </div>
        ) : (
          <LoginPage />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
