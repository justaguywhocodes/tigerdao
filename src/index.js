import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// Channels:
// 1 = Mainnet
// 2 = mainnet
// 3 = ropsten
// 4 = rinkeby
// 5 = goerli
// 6 = kovan
// 59 = xdai-private
const supportedChainIds = [ 4 ]

const connectors = {
  injected: {

  },
};

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={supportedChainIds}>
    <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
