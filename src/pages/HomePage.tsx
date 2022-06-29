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
import Emoji from "../components/Emoji";
import { ReactComponent as UserAva } from "../assets/profile.svg";
import TextField from "@mui/material/TextField";
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
import HomePage2 from "./HomePage2";

const HomePage = () => {
  const [cookies, removeCookie] = useCookies(["attinderToken"]);
  const { token, setauthentication } = React.useContext(AccountContext);
  const [semesters, setSemesters] = React.useState([]);

  useEffect(() => {
    API.post(`${configData["backendUrl"]}/API/get_profile`, {
      token: token.split("-")[0],
    }).then((response) => {
      console.log(response.data);
    });
    FetchSemesters();
  }, []);

  const FetchSemesters = () => {
    API.get(`${configData["backendUrl"]}/API/semesters`).then((response) => {
      setSemesters(response.data.data);
    });
  };

  return (
    <>
      <HomePage2 />
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
          <PickDate semesters={semesters} setSemesters={setSemesters} />
          <br />
          <Divider />
          <br />
        </Box>
      </Container>
    </>
  );
};

const PickDate = ({ semesters, setSemesters }: any) => {
  const [currency, setCurrency] = React.useState("All");
  const [subsForSem, setSubsForSem] = React.useState<any | null>(null);

  React.useEffect(() => {
    FetchSubjectsForSemester();
  }, [currency]);

  const FetchSubjectsForSemester = () => {
    console.log("su for Sem");

    if (currency === "All") {
      API.get(
        `${configData["backendUrl"]}/API/subjects?date=${
          value ? value.toLocaleDateString() : new Date().toLocaleDateString()
        }`
      ).then((response) => {
        console.log(response.data.data);
        setSubsForSem(response.data.data);
      });
    } else {
      API.get(
        `${configData["backendUrl"]}/API/subjects?semester=${currency}&date=${
          value ? value.toLocaleDateString() : new Date().toLocaleDateString()
        }`
      ).then((response) => {
        console.log(response.data.data);
        setSubsForSem(response.data.data);
      });
    }
  };

  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const handleChangeselec = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Box style={{ display: "flex" }}>
            {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2}}
          >
            <AccountCircle />
          </IconButton> */}

            {/* <TextField id="input-with-sx" label="With sx" variant="standard" /> */}
            <TextField
              style={{ width: "100px" }}
              size="small"
              id="outlined-select-currency"
              select
              label="Semester"
              value={currency}
              onChange={handleChangeselec}
              // helperText="Class"
            >
              {semesters.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <br />

      {/* , subsem :{" "} */}
      {/* {JSON.stringify(subsForSem)} {*/}

      <Subjects data={subsForSem} date={value} />
    </>
  );
};

const Subjects = ({ data, date }: any) => {
  return (
    <>
      <Grid container direction="column" spacing={1}>
        {data ? (
          <>
            {data.map((item: any) => {
              return (
                <ItemTile subject={item} date={date.toLocaleDateString()} />
              );
            })}
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};
export default HomePage;
