import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "TigerDAO Membership",
            description: "A DAO for finding and joining the TigerDAO",
            image: readFileSync("scripts/assets/winning.png"),
            primarySaleRecipientAddress: ethers.constants.AddressZero
        });

        console.log("✅ #WINNING - Successfully deployed bundleDrop module, address: ", bundleDropModule.address);
        console.log("✅ #EPICWINNING - bundleDrop metadata: ", await bundleDropModule.getMetadata());
    } catch(err) {
        console.error("failed to deploy bundleDrop module", err)
    }
})();