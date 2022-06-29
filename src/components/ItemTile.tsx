import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { ReactComponent as LinuxSv } from "../assets/linux.svg";
import { ReactComponent as IMG1 } from "../assets/1.svg";
import { ReactComponent as IMG2 } from "../assets/2.svg";
import { ReactComponent as IMG3 } from "../assets/3.svg";
import { ReactComponent as IMG4 } from "../assets/4.svg";
import { ReactComponent as IMG5 } from "../assets/5.svg";
import { ReactComponent as IMG6 } from "../assets/6.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const ItemTile = ({ subject, date }: any) => {
  const IMGS = [
    <LinuxSv height={90} width={80} fill="orange" />,
    <IMG1 height={90} width={80} />,
    <IMG2 height={90} width={80} />,
    <IMG3 height={90} width={80} />,
    <IMG4 height={90} width={80} />,
    <IMG5 height={90} width={80} />,
    <IMG6 height={90} width={80} />,
  ];
  //   const colors = ["#52c1fc"]

  return (
    <Grid item style={{ height: "100px" }}>
      <Box
        style={{
          height: "90px",
          backgroundColor: "whitesmoke",
          borderRadius: "20px",
        }}
      >
        <Grid container direction="row">
          <Grid item>
            <br /> &nbsp;&nbsp;&nbsp;
          </Grid>
          <Grid item>{IMGS[subject["subjectcode"] % 7]}</Grid>
          <Grid item style={{ margin: "auto" }}>
            <ItemDetails
              subjectname={subject["subjectname"]}
              subjectcode={subject["subjectcode"]}
              semester={subject["semester"]}
              checked={subject["checked"]}
              id={subject["id"]}
              date={date}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

const ItemDetails = ({
  checked,
  subjectname,
  subjectcode,
  semester,
  id,
  date,
}: any) => {
  let navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={(e: any) => {
        // let history = useHistory();

        // navigate(`../swipe?subid=${id}&date=${date}`);
        navigate(`../subject?subid=${id}&date=${date}`);
      }}
    >
      <Typography variant="h6" color="initial">
        {subjectname}
      </Typography>
      <Typography variant="overline" color="initial">
        sub code : 1221${subjectcode}
      </Typography>
      <IconButton>
        {checked ? (
          <HowToRegIcon color="inherit" />
        ) : (
          <PendingActionsIcon color="error" />
        )}
      </IconButton>
    </Box>
  );
};

export default ItemTile;
