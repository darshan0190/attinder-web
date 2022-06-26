import React, { useState, useMemo, useRef } from 'react'
import { useEffect } from 'react';
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

import "../Swipe.css"
import API from '../utils/API';
import Alert from '@mui/material/Alert';

import {Card,Grid,} from "@material-ui/core"
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import SwipeLeftOutlinedIcon from '@mui/icons-material/SwipeLeftOutlined';
import SwipeRightOutlinedIcon from '@mui/icons-material/SwipeRightOutlined';

// interface Student  { name: String; url:String};

function Advanced () {

  const [studentsData,setStudentsData] = React.useState([]);

  useEffect(()=>{
    console.log("doing api call")
    API.get("http://192.168.1.36:5001").then((response)=>{
      console.log(response.data.data)
      setStudentsData(response.data.data)
    })
  },[])

  const [currentIndex, setCurrentIndex] = useState(studentsData.length==0?0:studentsData.length - 1)
  const [lastDirection, setLastDirection] = useState()

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(studentsData.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < studentsData.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < studentsData.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }


  return (
   <>
    <div style={{
      display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "center",
  backgroud:"whitesmoke"
    }}>
       {studentsData.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            {/* <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div> */}
            <div style={{margin:"auto",backgroud:"whitesmoke"}}>
              <Card elevation={0} style={{height:"70vh",width:"90vw",background:"whitesmoke",borderRadius:"15px"}}>
              <img 
                     style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                     }}
      src="https://i.pinimg.com/originals/5e/8c/cf/5e8ccf3db56deb865236158c6f30f4f3.jpg"
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

              </Card>
             {/* <img 
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      alt="new"
      />
      <div style={{"background":"red"}}>{character.name}</div> */}
      </div>
          </TinderCard>
        ))}
        

        <Grid container style={{position:"fixed", bottom:0,marginBottom:"10px"}}  
         container
         direction="row"
         justifyContent="space-around"
         alignItems="center">
    
    <div className='buttons' style={{}}>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
         <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button> */}
       </div>
        </Grid>
        <div className='buttons' style={{}}>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
         <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button> */}
       </div>
       {lastDirection ? (
         <h2 key={lastDirection} className='infoText'>
           You swiped {lastDirection}
         </h2>
       ) : (
         <h2 className='infoText'>
           Swipe a card or press a button to get Restore Card button visible!
         </h2>
       )}
     </div>
    
    
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
  )
}

export default Advanced
