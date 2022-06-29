import React from "react";

import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Divider,
  MenuItem,
} from "@material-ui/core";
import Popper from "@mui/material/Popper";
import Emoji from "../components/Emoji";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import ItemTile from "../components/ItemTile";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { AccountContext } from "../context/AccountContext";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import API from "../utils/API";
import { response } from "express";
import configData from "../helpers/ConfigData";
import { ReactComponent as UserAva } from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";

const HomePage2 = () => {
  const [cookies, removeCookie] = useCookies(["attinderToken"]);
  const { token, setauthentication } = React.useContext(AccountContext);
  return (
    <>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <br />
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  textAlign: "start",
                }}
              >
                <Typography
                  style={{ textAlign: "start" }}
                  component="body"
                  variant="overline"
                >
                  {" "}
                  Hello
                </Typography>
                <Typography
                  style={{ textAlign: "start", color: "black" }}
                  component="h1"
                  variant="h5"
                >
                  {" "}
                  {token.split("-")[1]} <Emoji symbol="👋" label="sheep" />
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <SimplePopper
                removeCookie={removeCookie}
                setauthentication={setauthentication}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </Container>
    </>
  );
};

const SimplePopper = ({ removeCookie, setauthentication }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      {/* <button aria-describedby={id} type="button" onClick={handleClick}> */}
      <IconButton onClick={handleClick}>
        <UserAva height={60} width={60} fill="orange" />
      </IconButton>
      {/* </button> */}
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Card>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            style={{ padding: "5px", margin: "2px" }}
          >
            <Grid item>
              <button
                onClick={() => {
                  removeCookie("attinderToken", "");
                  setauthentication(false);
                }}
              >
                Logout
              </button>
            </Grid>
            {/* <Grid item>
              <br />
            </Grid> */}
            {/* <Grid>
              <button
                onClick={() => {
                  navigate("../data");
                }}
              >
                All Data
              </button>
            </Grid> */}
          </Grid>
        </Card>
        {/* <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <button>Logout</button>
        </Box> */}
      </Popper>
    </div>
  );
};
export default HomePage2;
