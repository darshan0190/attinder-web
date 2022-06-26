import React from "react";
import AccountCircle from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {Box,Container,Avatar,Typography, Grid,Divider,MenuItem} from "@material-ui/core"
import TinderCard from 'react-tinder-card'
import Advanced from "../components/Advanced";




const SwipePage = ()=>{
  return <div style={{paddingLeft:"16px"}}>
 <Grid container  >
    <Grid item>
    <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2}}
          >
            <AccountCircle />
          </IconButton>
    </Grid>
    <Grid item>
        
    </Grid>
    <Grid item>
    <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2}}
          >
            <AccountCircle />
          </IconButton>
    </Grid>

    
 </Grid>
 <SwipeInterFace/>
 <Advanced/>
  </div>
}

const SwipeInterFace =()=>{
    const onSwipe = (direction:any) => {
        console.log('You swiped: ' + direction)
      }
      
      const onCardLeftScreen = (myIdentifier:any) => {
        console.log(myIdentifier + ' left the screen')
      }
    return <>
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} ></TinderCard>
</>
}

export default SwipePage