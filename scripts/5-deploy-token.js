import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
    try {
        // deploy a standard ERC-20 contract.
        const tokenModule = await app.deployTokenModule({
            name: "TigerDAO Governance Token",
            symbol: "WINNING",
        });

        console.log(
            "✅ #WINNING - Successfully deployed token module, address:",
            tokenModule.address,
          );
    } catch(err) {
        console.error("Failed to deploy token module, #WEAK: ", err);
    }
})();

