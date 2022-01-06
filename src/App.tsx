import React ,{ useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

import Button from '@mui/material/Button';


function App() {
  const [url, setUrl] = useState<string>('');

  /**
   * Get current URL
   */
  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const url = tabs[0].url || '';
          setUrl(url);
      });
  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Typography
            variant="subtitle2"
            noWrap
            component="div"
          >
            Testnet
          </Typography>
          <Box >
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={1}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid item xs={10}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="195"
                image="algorand.png"
                alt="Algorand"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  10 Algo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total value ($) = 5
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={1}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid item xs={2}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" startIcon={<QrCodeScannerIcon />} 
              style={{maxWidth: '100px', minWidth: '100px', background: '#2E3B55' }}>
            Receive
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" endIcon={<SendIcon />} 
              style={{maxWidth: '100px', minWidth: '100px', background: '#2E3B55' }}>
            Send
          </Button>
        </Grid>
        <Grid item xs={2}>
          {/* <Item>xs=2</Item> */}
        </Grid>
      </Grid>

      <Container>
        

        {/* <Box sx={{ my: 2 }}>
          {[...new Array(1)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box> */}

      </Container>
    </React.Fragment>

      // <div className="App">
      //     <header className="App-header">
      //         <img src={logo} className="App-logo" alt="logo"/>
      //         <p>URL:</p>
      //         <p>
      //             {url}
      //         </p>
      //         <Button variant="contained">Hello World</Button>;
      //     </header>
      // </div>
  );
}

export default App;
