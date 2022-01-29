import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log(`👋🏽 address: ${address}`);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to 🐅 TigerDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          <span>Connect your wallet bro</span>
        </button>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>👀 wallet connected, I call that #WINNING</h1>
      <iframe style={{margin: 'auto'}} src="https://giphy.com/embed/x0kMYoT7J31i8" width="480" height="410" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reaction-winning-charlie-sheen-x0kMYoT7J31i8">via GIPHY</a></p>
    </div>
  );
};

export default App;
