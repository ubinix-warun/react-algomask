# React Algomask with Tatum!

Algomask <> Metamask -- [Algo wallet on Chrome](https://gitcoin.co/issue/algorandfoundation/grow-algorand/122/100027180), [MIT LICENSE](https://github.com/ubinix-warun/react-algomask/blob/master/LICENSE)

**the project is not audited and should not be used in a production environment.
 
![Project](https://raw.githubusercontent.com/ubinix-warun/react-algomask/main/doc/images/landing_ext.png)

# Screenshots

![UI](https://raw.githubusercontent.com/ubinix-warun/react-algomask/main/doc/images/flow_ui.png)

### [Setup & Demo](https://www.youtube.com/watch?v=urilzrmp5b0)

# Config & Build

* Edit Tatum API key on src/config.json
```
{
    "TATUM_API_KEY": "<TATUM_API_KEY>",
    "TATUM_API_URL": "https://api-eu1.tatum.io"
}
```
* Run build script with npm
```
nvm use v16.10.0
npm run install

npm run build
```

# Manual 

* Goto chrome://extensions/ > Enable developer mode
* Load unpacked from %PROJECT%/build

# Credit

* Use [Tatum API](https://tatum.io/apidoc.php#tag/Blockchain-Algorand-(ALGO)) for Blockchain platform.
* Use MUI for opensource https://mui.com/
* Generate qr with https://api.qrserver.com 
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
