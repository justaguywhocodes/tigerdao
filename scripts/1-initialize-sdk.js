import {ThirdwebSDK} from "@3rdweb/sdk";
import ethers from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
    console.log("🛑 Please enter a private key");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
    console.log("🛑 Alchemy API URL is not set");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
    console.log("🛑 WALLET ADDRESS is not set");
}

const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    ),
);

(async () => {
    try {
       const apps = await sdk.getApps();
       console.log("Your app address is: ", apps[0].address);
     } catch (err) {
        console.error("Failed to get app from the SDK", err)
        process.exit(1);
    }
})();

export default sdk;