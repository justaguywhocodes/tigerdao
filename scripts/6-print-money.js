import ethers from 'ethers';
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    process.env.TOKEN_MODULE_ADDRESS
);

(async () => {
    try {
        // set max supply
        const amount = 1_000_000;

        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);

        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "✅ #EPICWINNING - There are now",
            ethers.utils.formatUnits(totalSupply, 18),
            "$WINNING in circulation. That's alot of tigerBlood",
        );
    } catch (err) {
        console.error("Failed to print money -- #WEAK: ", error);

    }
})();
