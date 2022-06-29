import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import API from "../utils/API";
import { response } from "express";
import { AccountContext } from "../context/AccountContext";
import { useCookies } from "react-cookie";
import { ReactComponent as ReactLogo } from "../assets/reading.svg";
import { useState } from "react";
import configData from "../helpers/ConfigData";
import CircularProgress from "@mui/material/CircularProgress";

// import Cookies from 'universal-cookie';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Attinder
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const { authentication, setauthentication } =
    React.useContext(AccountContext);
  const [cookies, setCookie] = useCookies(["attinderToken"]);

  React.useEffect(() => {
    if (!authentication) {
      // window.location.hash = new Date().getTime();
      // window.location.href = "http://192.168.1.36:3000/login"

      console.log("Not Authenticated");
    } else {
      console.log("Authenticated");
      if (window.location.pathname == "/login") {
        window.location.href = "/";
      }
    }
  }, []);

  const handleSubmit = (event: any) => {
    setLoading(true);
    console.log(cookies["attinderToken"]);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    API.post(`${configData["backendUrl"]}/API/login`, {
      username: data.get("email"),
      password: data.get("password"),
    }).then((response) => {
      if (response.status == 200) {
        console.log(response.data.data);

        var newToken = response.data.data["token"];
        if (response.data.data.token) {
          var genToken = `${newToken}-${data.get("email")}`;
          setCookie("attinderToken", genToken, { path: "/" });
          setauthentication(true);
          window.location.href = "/";
        } else {
          console.log("Invalid c ", newToken);
        }

        // const cookies = new Cookies();
        // cookies.set('token', '1', { path: '/' });
        // console.log(cookies.get('token')); // Pacman
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* {authentication ? "Loggedin " : "Logedout"} */}
          <div>
            <ReactLogo height={250} width={250} fill="orange" />
          </div>
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
           <LockOutlinedIcon /> 
          </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Typography component="h1" variant="h5" style={{ color: "black" }}>
            Attinder
          </Typography>
          <Typography
            component="h1"
            variant="overline"
            style={{ color: "black" }}
          >
            Attendance Management App
          </Typography>
          {loading ? (
            <div>
              <div>Authenticating......</div>
              <br />
              <CircularProgress disableShrink />
            </div>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                variant="filled"
                name="email"
                autoComplete="email"
                autoFocus
                size="small"
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                variant="filled"
                label="Password"
                // helperText="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login In
              </Button>
            </Box>
          )}
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
