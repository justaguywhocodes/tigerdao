import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    process.env.BUNDLE_DROP_ADDRESS
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "TigerDAO Goddesses",
                description: "This NFT will give you access to tigerDAO",
                image: readFileSync("scripts/assets/goddesses.jpeg")
            }
        ]);

        console.log("🐅 #WINNING - Successfully created a new NFT in the drop!");
    } catch (err) {
        console.error("failed to create the new NFT", err)
    }
})();