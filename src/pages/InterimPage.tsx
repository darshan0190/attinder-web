import React from "react";
import AccountCircle from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ClassIcon from "@mui/icons-material/Class";
import { ReactComponent as ReactLogo } from "../assets/research.svg";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Divider,
  MenuItem,
} from "@material-ui/core";
import TinderCard from "react-tinder-card";
import Advanced from "../components/Advanced";
import { useNavigate } from "react-router-dom";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import configData from "../helpers/ConfigData";
import API from "../utils/API";

import { useState } from "react";

const IntrimPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let subid = searchParams.get("subid");
  let date = searchParams.get("date");
  let navigate = useNavigate();

  const [subjectdata, setSubjectData] = useState({
    id: 0,
    semester: 0,
    subjectcode: "",
    subjectname: "",
  });

  const [attendenceinfo, setAttendenceInfo] = useState([]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    API.get(
      `${configData["backendUrl"]}/API/substat?date=${date}&subid=${subid}`
    ).then((response) => {
      console.log(response.data.data);
      setSubjectData(response.data.data["subjectinfo"]);
      setAttendenceInfo(response.data.data["attendenceinfo"]);
      setChecked(response.data.data["checked"]);
    });
  }, []);
  return (
    <>
      {" "}
      <div style={{ padding: "8px" }}>
        <Grid container>
          <Grid item>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              // sx={{ mr: 2}}
              onClick={(e) => {
                navigate("../");
              }}
            >
              <AccountCircle />
            </IconButton>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <div>
          <ReactLogo height={150} width={150} fill="orange" />
        </div>
        <Grid container justifyContent="center" direction="column">
          <Grid item>
            <Typography variant="h4">{subjectdata.subjectname}</Typography>
            <Typography variant="overline">
              ID : {subjectdata.id} &nbsp; SEM: {subjectdata.semester}&nbsp;
              CODE:
              {subjectdata.subjectcode}
            </Typography>
          </Grid>

          {/* <Grid item>
            <button
              onClick={(e) => {
                navigate(`../swipe?subid=${subid}&date=${date}`);
              }}
            >
              Take Attendence
            </button>
          </Grid> */}
          <Grid item>
            <Divider />
          </Grid>

          {checked === true ? (
            <Grid item>
              {attendenceinfo.length > 0 ? (
                <Box>
                  <br />
                  Attendence List
                  <br />
                  <br />
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendenceinfo.map((item) => (
                        <TableRow>
                          <TableCell>{item["id"]}</TableCell>
                          <TableCell>{item["studentname"]}</TableCell>
                          <TableCell>
                            {item["attended"] == true ? (
                              <IconButton>
                                <CheckCircleOutlineIcon color="success" />
                              </IconButton>
                            ) : (
                              <IconButton>
                                <ReportGmailerrorredIcon color="error" />
                              </IconButton>
                            )}
                          </TableCell>
                          {/* <TableCell>{item["studentlink"]}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              ) : (
                <>
                  <br />
                  <br />
                  No Data
                </>
              )}
            </Grid>
          ) : (
            <div>
              <br />
              <IconButton>
                <ClassIcon color="warning" />
              </IconButton>
              Stundents enrolled : {attendenceinfo.length}
              <br />
              <br />
              <Button
                onClick={(e) => {
                  navigate(`../swipe?subid=${subid}&date=${date}`);
                }}
                style={{ background: "#6b63ff", color: "white" }}
              >
                Take Attendence{" "}
              </Button>
            </div>
          )}
        </Grid>
      </div>
    </>
  );
};

export default IntrimPage;
