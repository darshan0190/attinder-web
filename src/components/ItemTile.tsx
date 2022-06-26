
import React from "react";
import {Grid,Box, Typography} from "@material-ui/core"
import {ReactComponent as LinuxSv} from '../assets/linux.svg';

const ItemTile = ()=>{

//   const colors = ["#52c1fc"]


    return <Grid item style={{height:"100px"}}>
        <Box style={{height:"90px",backgroundColor:"whitesmoke", borderRadius:"20px"}}>
            <Grid container direction="row">
                <Grid item  >
                <br/> &nbsp;&nbsp;&nbsp;
                </Grid>
                <Grid item  >
                <LinuxSv height={90} width={80} fill='orange' />
                </Grid>
                <Grid item style={{margin:"auto"}} >
                    <ItemDetails/>
                </Grid>

            </Grid>
        </Box>
    </Grid>
}


const ItemDetails = ()=>{
    return <Box sx={{
        margin:"auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    }}>
        <Typography variant="h6" color="initial" >Linux Programming</Typography>
        <Typography variant="overline" color="initial">subject code : 1012212</Typography>

    </Box>
}

export default ItemTile