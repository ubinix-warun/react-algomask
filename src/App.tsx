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

import configApi from "./config.json";

import axios from 'axios';

import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';

function App() {

  const [openSetting, setOpenSetting] = React.useState(false);

  const handleClickOpenSetting = () => {

    setPrivateKey(localStorage.getItem('pk') || '');

    setOpenSetting(true);
  };

  const handleSettingSave = () => {

    // TODO SAVE to localStorage! and <secure>

    localStorage.setItem('pk', privateKey);

    setAlgoBalance(0);
    getWalletInfor();

    handleSettingClose();
  };

  const handleSettingClose = () => {
    setOpenSetting(false);
    
  };
  const [openProgress, setOpenProgress] = React.useState(false);

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

  const [urlLastTxSuccess, setUrlLastTxSuccess] = React.useState('');
  const [lastTxSuccess, setLastTxSuccess] = React.useState('');

  const handleSendTx = () => {
    
    // console.log(txFromAddress);
    // console.log(txSendAddress);
    // console.log(txSendAmount);

    // {
    //   "from": "QOY7F6G6LVLMB4PZ74S5GZMSI5ST44FRZTEUTS3KDTUA27ADV25YF3WTBA",
    //   "to": "V56ESV4XVJPG723RORQDTOORMNRXJYSDL7LBYKZCFBGRCYID32Y66HZIAI",
    //   "fee": "0.01",
    //   "amount": "3.23",
    //   "fromPrivateKey": ".."
    // }

    const req = { 
      from: txFromAddress,
      to: txSendAddress,
      fee: txFee.toString(),
      amount: txSendAmount.toString(),
      fromPrivateKey: localStorage.getItem('pk'),
    };

    // console.log(req);
    setOpenProgress(true);

    axios.post(
      configApi.TATUM_API_URL+`/v3/algorand/transaction`,
      req,
      { headers: { 'x-api-key': configApi.TATUM_API_KEY }}
    )
      .then(res => {
        console.log(res.data);

        // DONE!
        // setLastTxSuccess(res.data);
        // setUrlLastTxSuccess(`https://testnet.algoexplorer.io/tx/`+res.data);

        setOpenProgress(false);
        setTxSuccess(true);

        getWalletInfor();


      }).catch(error => {

        console.log(error)
        
        setOpenProgress(false);
        setTxError(true);

      });

    handleSendClose()
  };

  const handleSendClose = () => {
    setOpenSend(false);
  };

  const [txSuccess, setTxSuccess] = React.useState(false);

  const handleTxSuccessClose = () => {

    setTxSuccess(false);

  };

  const [txError, setTxError] = React.useState(false);

  const handleTxErrorClose = () => {

    setTxError(false);

  };


  const [privateKey, setPrivateKey] = React.useState('');

  const inputPrivateKeyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pk = event.target.value;
    setPrivateKey(pk);
  };

  const [algoBalance, setAlgoBalance] = React.useState(0);

  const [txFromAddress, setTxFromAddress] = React.useState('');
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

  // const [url, setUrl] = useState<string>('');

  const getWalletInfor = () => {
    setOpenProgress(true);
    axios.get(
      configApi.TATUM_API_URL+`/v3/algorand/address/`+localStorage.getItem('pk'),
      { headers: { 'x-api-key': configApi.TATUM_API_KEY }} )
    .then(res => {
      const addr = res.data;
      setTxFromAddress(addr);
      setFromQRAddress(`https://api.qrserver.com/v1/create-qr-code/?data=` + addr + `&amp;size=195x195`)

      axios.get(
        configApi.TATUM_API_URL+`/v3/algorand/account/balance/`+addr,
        { headers: { 'x-api-key': configApi.TATUM_API_KEY }} )
      .then(res => {
        const balance = res.data;
        setAlgoBalance(balance);
        setOpenProgress(false);
      })

    })
  };

  useEffect(() => {
      // const queryInfo = {active: true, lastFocusedWindow: true};

      // chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      //     const url = tabs[0].url || '';
      //     setUrl(url);
      // });

      if(localStorage.getItem('pk') == '' || 
          localStorage.getItem('pk') == null) {
            
        handleClickOpenSetting();
        // Require!
        
      } else {

        getWalletInfor();
        
      }

      // console.log(configApi.TATUM_API_KEY);
      // console.log(configApi.TATUM_API_URL);
    

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
          {openProgress ? <LinearProgress color="inherit" /> : null}
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

      <Dialog open={txSuccess} onClose={handleTxSuccessClose}>
        <DialogTitle>Tx Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Card sx={{ maxWidth: 195 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="195"
                image="green-check.png"
                alt="Algorand"
              />
              <CardContent>
              <Link href={urlLastTxSuccess}>{lastTxSuccess}</Link>
              </CardContent>
            </CardActionArea>
          </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog open={txError} onClose={handleTxErrorClose}>
        <DialogTitle>Tx Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Card sx={{ maxWidth: 195 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="195"
                image="red-error.png"
                alt="Algorand"
              />
              <CardContent>

              </CardContent>
            </CardActionArea>
          </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
