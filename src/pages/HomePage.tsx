import React from "react";
import {Box,Container,Avatar,Typography, Grid,Divider,MenuItem} from "@material-ui/core"
import Emoji from "../components/Emoji";
import {ReactComponent as UserAva} from '../assets/profile.svg';
import TextField from '@mui/material/TextField';

import ItemTile from "../components/ItemTile";
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';


const HomePage = ()=>{

    return <Container >
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <br/>
            
            {/* <Typography component="h1" variant="h5"> Hi, Surya <Emoji symbol="👋" label="sheep"/></Typography>
            <Typography component="body" variant="overline"> Welcome to Attinder </Typography> */}

            <Grid container
            direction="row"
            justifyContent="space-between"
            >
                <Grid item>
                    <Box sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'start',
                         textAlign:"start"
                    }}>
                        <Typography  style={{textAlign:"start"}} component="body" variant="overline"> Hello,</Typography>
                        <Typography style={{textAlign:"start"}} component="h1" variant="h5"> User Name <Emoji symbol="👋" label="sheep"/></Typography>
                    </Box>
                </Grid>
                <Grid item>
                <UserAva height={60} width={60} fill='orange' />
                </Grid>
            </Grid>
            <br/>
            <Divider/>
            <br/>
                    <PickDate/>
                    <br/>
            <Divider/>
            <br/>
            <Subjects/>
         </Box>
    </Container>
}


const PickDate = ()=>{

    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );
    
      const handleChange = (newValue: Date | null) => {
        setValue(newValue);
      };
      const [currency, setCurrency] = React.useState('EUR');

      const handleChangeselec = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
      };
    return <Grid container direction="row" justifyContent="space-between">
                <Grid item >
                    
                    <Box style={{ display: 'flex' }}>
        {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2}}
          >
            <AccountCircle />
          </IconButton>
        {/* <TextField id="input-with-sx" label="With sx" variant="standard" /> */}
        <TextField
                        size="small"
                    id="outlined-select-currency"
                    select
                    //   label="Select"
                    value={currency}
                    onChange={handleChangeselec}
                    // helperText="Class"
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
      </Box>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                        //   label="Date mobile"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField size="small" {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>

  
        </Grid>
}


const Subjects  = ()=>{
    return <Grid container direction="column" spacing={1}>
        <ItemTile/>
        <ItemTile/>
        <ItemTile/>
        <ItemTile/>
    </Grid>
}
export default HomePage;