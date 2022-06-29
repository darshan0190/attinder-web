import React from "react";
import AccountCircle from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
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
import { ReactComponent as ReactLogo } from "../assets/nodata.svg";

const SwipePage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let subid = searchParams.get("subid");
  let date = searchParams.get("date");

  let navigate = useNavigate();

  let [students, setStudents] = React.useState([]);

  useEffect(() => {
    FetchStudentsForSub(searchParams.get("subid"));
  }, []);

  const FetchStudentsForSub = (id: any) => {
    API.get(`${configData["backendUrl"]}/API/students?subjectid=${id}`).then(
      (response: any) => {
        console.log(response.data.data);
        setStudents(response.data.data);
      }
    );
  };

  return (
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

      {students && students.length > 0 ? (
        <Advanced subid={subid} studentsData={students} date={date} />
      ) : (
        <>
          {" "}
          <div>
            <br />
            <br />
            <ReactLogo height={250} width={250} fill="orange" />
            <br />
            <br />
            <Typography> No records found.</Typography>
          </div>
        </>
      )}
    </div>
  );
};

const SwipeInterFace = () => {
  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <>
      <TinderCard
        onSwipe={onSwipe}
        onCardLeftScreen={() => onCardLeftScreen("fooBar")}
      ></TinderCard>
    </>
  );
};

export default SwipePage;
