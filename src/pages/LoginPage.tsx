import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../utils/API';
import { response } from 'express';
import { AccountContext } from '../context/AccountContext';
import { useCookies } from 'react-cookie';

// import Cookies from 'universal-cookie';

function Copyright(props:any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {

  const { authentication ,setauthentication} = React.useContext(AccountContext);
  const [cookies, setCookie] = useCookies(['attinderToken']);
  
  React.useEffect(()=>{
    if (!authentication){
      // window.location.hash = new Date().getTime();
      // window.location.href = "http://192.168.1.36:3000/login"
      
      console.log("Not Authenticated")
    }
    else{
      console.log("Authenticated")
      if (window.location.pathname == "/login"){
        window.location.href = "http://192.168.1.36:3000"
      }
    }
  },
  [])

  const handleSubmit = (event:any) => {
    console.log(cookies['attinderToken'])
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    API.post("http://192.168.1.36:5001/API/login",{
      "username":data.get('email'),
      "password":data.get('password'),
    }).then(response=>{
      if (response.status==200){
        console.log(response.data.data)
        
        var newToken = response.data.data["token"]
        if (response.data.data.token){
          var genToken = `${newToken}-${data.get('email')}`
          setCookie('attinderToken', genToken, { path: '/' });
          setauthentication(true)
          window.location.href = "http://192.168.1.36:3000"
        }
        else{
          console.log("Invalid c ",newToken)
        }
       

        // const cookies = new Cookies();
        // cookies.set('token', '1', { path: '/' });
        // console.log(cookies.get('token')); // Pacman
      }
      
      
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          {authentication?"Loggedin ":"Logedout"}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}