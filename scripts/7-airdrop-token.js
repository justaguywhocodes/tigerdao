import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
    process.env.BUNDLE_DROP_ADDRESS
);

const tokenModule = sdk.getTokenModule(
    process.env.TOKEN_MODULE_ADDRESS
);

(async () => {
    try {
        // Grab all the addresses of people who own our membership NFT, which has 
        // a tokenId of 0.
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if (walletAddresses.length === 0) {
            console.log(
                "🐅 C'mon bro 😎 I got tigerBlood, #WINNING - No one has claimed the bundle drop yet."
            );

            process.env(0);
        }

        // loop through the addresses 
        const airdropTargets = walletAddresses.map(address => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // setup the drop yo -- that would be #winning 
            const airdropTarget = {
                address,
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
            };

            return airdropTarget;
        });

        // Call transferBatch on the targets
        console.log("🌈 Starting airdrop...");
        console.log("I'm Flipping Drop With Indvisible Tops / Hoes Bop When My Drop Step Out / I'm Flipping Drop With Indvisible Tops / Hoes Bop When My Drop Step Out...");
        console.log("🎤 I SAID");
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT! #EPICWINNING");


    } catch (err) {
        console.error("#WEAK - Failed to airdrop tokens", err);
    }
})();