import React, { useState, useMemo, useRef } from "react";
import { useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import Snackbar from "@mui/material/Snackbar";

import "../Swipe.css";
import API from "../utils/API";
import Alert from "@mui/material/Alert";
import { Typography, Button } from "@material-ui/core";

import { Card, Grid } from "@material-ui/core";
import Menu from "@mui/material/Menu";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import SwipeLeftOutlinedIcon from "@mui/icons-material/SwipeLeftOutlined";
import SwipeRightOutlinedIcon from "@mui/icons-material/SwipeRightOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoadingButton from "@mui/lab/LoadingButton";
import configData from "../helpers/ConfigData";

// interface Student  { name: String; url:String};

function Advanced({ subid, studentsData, date }) {
  let navigate = useNavigate();
  const [attendenceData, setAttendenceData] = useState([]);
  var [upLoadData2, setUploadData] = useState([]);

  var present = [];

  useEffect(() => {
    var attendenceData2 = [];
    var upLoadData2 = [];
    studentsData.map((item, index) => {
      attendenceData2.push({
        studentname: item["studentname"],
        studentlink: item["studentlink"],
        id: item["id"],
        state: 0,
      });
    });
    console.log("Updated upload data : ", upLoadData2);
    setAttendenceData(attendenceData2);
    setUploadData(attendenceData2);

    // setUploadData(upLoadData2);
    console.log("DEBUG Students data :", studentsData.length);
    console.log("DEBUG data :", attendenceData.length);
  }, [studentsData]);

  const [currentIndex, setCurrentIndex] = useState(
    studentsData.length == 0 ? 0 : studentsData.length - 1
  );
  const [lastDirection, setLastDirection] = useState();

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(studentsData.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const canGoBack = currentIndex < studentsData.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index, id) => {
    console.log("swipped", direction, index);
    console.log("swipped att: ", JSON.stringify(attendenceData));
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    updateAttendence(direction, nameToDelete, index, id);
  };

  const updateAttendence = (direction, nameToDelete, index, id) => {
    if (direction === "left") {
      setSev("error");
      setUploadData((prevState) => {
        const newState = prevState.map((obj) => {
          // 👇️ if id equals 2, update country property
          if (obj.id === id) {
            return { ...obj, state: 0 };
          }
          // 👇️ otherwise return object as is
          return obj;
        });

        return newState;
      });
    }
    if (direction === "right") {
      setSev("success");
      setUploadData((prevState) => {
        const newState = prevState.map((obj) => {
          // 👇️ if id equals 2, update country property
          if (obj.id === id) {
            return { ...obj, state: 1 };
          }

          // 👇️ otherwise return object as is
          return obj;
        });

        return newState;
      });
      // upLoadData[index]["state"] = 1;
      // present.push(index);
    }

    // attendenceData[index]
  };

  const upLoadToDb = () => {
    const url = `${configData["backendUrl"]}/API/attendence?date=${date}&subid=${subid}`;
    console.log("URL", url);
    API.post(url, upLoadData2).then((response: any) => {
      if (response.status == 200) {
        navigate("../");
      } else {
        setButtonLoading(false);
      }
    });
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const revert = () => {
    setTimeout(function () {
      setSev("info");
      console.log("reverting");
    }, 1000);
  };

  const swipe = async (dir) => {
    if (dir == "right") {
      setSev("success");
    } else {
      setSev("error");
    }
    if (canSwipe && currentIndex < studentsData.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
    revert();
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const [sev, setSev] = useState("info");
  return (
    <>
      {studentsData.length ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              backgroud: "whitesmoke",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              {currentIndex < 0 ? (
                <>
                  {upLoadData2 && upLoadData2.length > 0 ? (
                    <>
                      {upLoadData2.map((attend: any) => (
                        <TableBody>
                          <TableRow>
                            <TableCell>{attend["id"]}</TableCell>
                            <TableCell>{attend["studentname"]}</TableCell>
                            <TableCell>{attend["state"]}</TableCell>
                            <TableCell>
                              {attend["state"] == 1 ? "Present" : "Absent"}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </Table>
            <br />
            {/* <Snackbar
              open={true}
              autoHideDuration={2000}
              onClose={false}
              message="Note archived"
              // action={action}
            >
              <Alert onClose={false} severity="success" sx={{ width: "100%" }}>
                This is a success message!
              </Alert>
            </Snackbar> */}

            <LoadingButton
              onClick={(e: any) => {
                setButtonLoading(true);
                upLoadToDb();
              }}
              loading={buttonLoading}
              variant="outlined"
            >
              Update
            </LoadingButton>
            {studentsData.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={(dir) =>
                  swiped(dir, character.studentname, index, character.id)
                }
                onCardLeftScreen={() =>
                  outOfFrame(character.studentname, index)
                }
              >
                {/* <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div> */}
                <div
                  style={{
                    margin: "auto",
                    marginTop: "10px",
                    backgroud: "whitesmoke",
                  }}
                >
                  <Card
                    elevation={0}
                    style={{
                      height: "60vh",
                      width: "90vw",
                      background: "whitesmoke",
                      borderRadius: "15px",
                    }}
                  >
                    <div
                      style={{
                        height: "50vh",
                        width: "90vw",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "50vh",
                          objectFit: "cover",
                        }}
                        src={
                          character["studentlink"]
                            ? character["studentlink"]
                            : "https://i.pinimg.com/originals/5e/8c/cf/5e8ccf3db56deb865236158c6f30f4f3.jpg"
                        }
                        alt="new"
                      />
                      {/* <Grid container style={{backgroud:"whitesmoke"}}>
                  <Grid item style={{backgroud:"whitesmoke"}}>
                    <div  style={{backgroud:"whitesmoke"}}>
                    <img 
                     style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                     }}
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      alt="new"
      />
                    </div>
                  </Grid>
                  <Grid item></Grid>

                </Grid> */}
                    </div>
                    <div
                      style={{
                        height: "10vh",
                        width: "90vw",
                        background: "whitesmoke",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          textAlign: "center",
                          background: "white",
                        }}
                      >
                        .
                        <Typography variant="h3" color="textSecondary">
                          {character["studentname"]}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                  {/* <img 
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      alt="new"
      />
      <div style={{"background":"red"}}>{character.name}</div> */}
                </div>
              </TinderCard>
            ))}

            {/* <Grid
          container
          style={{ position: "fixed", bottom: 0, marginBottom: "10px" }}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <div className="buttons" style={{}}>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left!
            </button>
            <button
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo swipe!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              Swipe right!
            </button>{" "}
            
          </div>
        </Grid> */}
            {/* <div className="buttons" style={{}}>
          <button
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("left")}
          >
            Swipe left!
          </button>
          <button
            style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
            onClick={() => goBack()}
          >
            Undo swipe!
          </button>
          <button
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("right")}
          >
            Swipe right!
          </button>{" "}
          
        </div> */}
            {/* {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText">
            Swipe a card or press a button to get Restore Card button visible!
          </h2>
        )} */}
          </div>
          <div
            style={{
              position: "absolute",
              border: 0,
              bottom: 0,
              left: 0,
              background: "whitsmoke",
              width: "100%",
              color: "black",
            }}
          >
            <br />

            <br />
            <div style={{ alignItems: "center", display: "flex" }}>
              <Alert severity={sev} style={{ margin: "auto" }}>
                {sev == "error" ? (
                  "Absent"
                ) : (
                  <>{sev == "success" ? "Present" : "Swipe to record"}</>
                )}
              </Alert>
            </div>
            <br />
            {/* {JSON.stringify(attendenceData)} */}
            <Typography variant="overline">
              Student No : {`${currentIndex + 1}/ ${studentsData.length}`}
            </Typography>
            <br />
            <Grid
              container
              // style={{ position: "fixed", bottom: 0, marginBottom: "10px" }}

              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  aria-label=""
                  onClick={(e) => {
                    goBack();
                  }}
                >
                  <UndoOutlinedIcon color="warning" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label=""
                  onClick={(e) => {
                    swipe("left");
                  }}
                >
                  <SwipeLeftOutlinedIcon color="error" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label=""
                  onClick={(e) => {
                    swipe("right");
                  }}
                >
                  <SwipeRightOutlinedIcon color="success" />
                </IconButton>
              </Grid>
              {/* <div className="buttons" style={{}}>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left!
            </button>
            <button
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo swipe!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              Swipe right!
            </button>{" "}
          </div> */}
            </Grid>
            <br />
          </div>
        </>
      ) : (
        "nope"
      )}
    </>
    //   <div
    //   // className='cardContainer'
    //   style={{backgroundColor:"red"}}
    //   >

    //   <div className='buttons'>
    //     {/* <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
    //     <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
    //     <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button> */}
    //   </div>
    //   {lastDirection ? (
    //     <h2 key={lastDirection} className='infoText'>
    //       You swiped {lastDirection}
    //     </h2>
    //   ) : (
    //     <h2 className='infoText'>
    //       Swipe a card or press a button to get Restore Card button visible!
    //     </h2>
    //   )}
    // </div>
  );
}

export default Advanced;
