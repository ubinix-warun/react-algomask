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

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {

  const [tatumApikey] = React.useState('');

  const [openSetting, setOpenSetting] = React.useState(false);

  const handleClickOpenSetting = () => {

    setPrivateKey(localStorage.getItem('pk') || '');

    setOpenSetting(true);
  };

  const handleSettingSave = () => {

    // TODO SAVE to localStorage! and <secure>

    localStorage.setItem('pk', privateKey);

    handleSettingClose();
  };

  const handleSettingClose = () => {
    setOpenSetting(false);
    
  };

  const [openReceive, setOpenReceive] = React.useState(false);

  const handleClickOpenReceive = () => {
    setOpenReceive(true);
  };

  const handleReceiveClose = () => {
    setOpenReceive(false);
    
  };

  const [openSend, setOpenSend] = React.useState(false);

  const handleClickOpenSend = () => {

    setTxSendAddress('');
    setTxSendAmount(0);

    setOpenSend(true);
  };

  const handleSendTx = () => {
    
    console.log(txFromAddress);
    console.log(txSendAddress);
    console.log(txSendAmount);

    handleSendClose()
  };

  const handleSendClose = () => {
    setOpenSend(false);
  };

  const [privateKey, setPrivateKey] = React.useState('');

  const inputPrivateKeyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pk = event.target.value;
    setPrivateKey(pk);
  };

  const [algoBalance, setAlgoBalance] = React.useState(0);

  const [txFromAddress, setTxFromAddress] = React.useState('M2C7MYGCZBAQJJM5U2MXTZP7L3L3ATVSQFXYLPICS5PSVAX7XQFAWADCNA');
  const [txSendAddress, setTxSendAddress] = React.useState('');

  const inputSendAddressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pk = event.target.value;
    setTxSendAddress(pk);
  };

  const [txSendAmount, setTxSendAmount] = React.useState(0);

  const inputTxSendAmountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pk = event.target.value;
    setTxSendAmount(Number(pk));
  };

  const [txFee, setTxFee] = React.useState(0);

  const inputTxFeeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pk = event.target.value;
    setTxFee(Number(pk));
  };

  const [fromQRAddress, setFromQRAddress] = React.useState('');
  // const [fromQRAddress, setFromQRAddress] = React.useState({"https://api.qrserver.com/v1/create-qr-code/?data=" + txFromAddress + "&amp;size=195x195"});
  // const [txFromAddressIsReady, setTxFromAddressIsReady] = React.useState(txFromAddress != '');


  // const [url, setUrl] = useState<string>('');

  useEffect(() => {
      // const queryInfo = {active: true, lastFocusedWindow: true};

      // chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      //     const url = tabs[0].url || '';
      //     setUrl(url);
      // });

      console.log(localStorage.getItem('pk'))
      if(localStorage.getItem('pk') == '') {
        handleClickOpenSetting();
        // Require!
      }
      

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
              onClick={handleClickOpenSetting} >
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
                  { algoBalance } Algo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total value ($) = ~
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={1}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid item xs={1}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid item xs={5}>
          <Button variant="contained" startIcon={<QrCodeScannerIcon />} 
              style={{maxWidth: '120px', minWidth: '120px', background: '#2E3B55' }}
              onClick={handleClickOpenReceive}>
            Receive
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button variant="contained" endIcon={<SendIcon />} 
              style={{maxWidth: '120px', minWidth: '120px', background: '#2E3B55' }}
              onClick={handleClickOpenSend} >
            Send
          </Button>
        </Grid>
        <Grid item xs={1}>
          {/* <Item>xs=2</Item> */}
        </Grid>
      </Grid>

      <Dialog open={openSetting} onClose={handleSettingClose}>
        <DialogTitle>Setup Wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Import private key.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="privatekey"
            label="Private key"
            type="text"
            fullWidth
            variant="standard"
            value={privateKey}
            onChange={inputPrivateKeyHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingSave}>Save</Button>
          <Button onClick={handleSettingClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReceive} onClose={handleReceiveClose}>
        <DialogTitle>Account</DialogTitle>
        <DialogContent>
          {/* <Typography>
            { txFromAddress }
          </Typography> */}

          <Card sx={{ maxWidth: 195 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="195"
                image={ fromQRAddress }
                alt="Algorand"
              />
              <CardContent>
                {/* <Typography gutterBottom variant="h4" component="div">
                  { algoBalance } Algo
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  { txFromAddress }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog open={openSend} onClose={handleSendClose}>
        <DialogTitle>Send Algo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Send your Algo to Address
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sendFromAddress"
            label="From"
            type="text"
            fullWidth
            variant="standard"
            value={txFromAddress}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="sendToAddress"
            label="To"
            type="text"
            fullWidth
            variant="standard"
            value={txSendAddress}
            onChange={inputSendAddressHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="txSendAmount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={txSendAmount}
            onChange={inputTxSendAmountHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="txFee"
            label="Fee"
            type="number"
            fullWidth
            variant="standard"
            value={txFee}
            onChange={inputTxFeeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendTx}>Send</Button>
          <Button onClick={handleSendClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
