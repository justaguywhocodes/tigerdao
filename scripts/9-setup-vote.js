import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const voteModule = sdk.getVoteModule(
    process.env.VOTING_CONTRACT_ADDRESS
);

const tokenModule = sdk.getTokenModule(
    process.env.TOKEN_MODULE_ADDRESS,
);

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log(
            "Successfully gave vote module permissions to act on token module. #EPICWINNING"
        );
    } catch(err) {
        console.error(
            "#WEAK: failed to grant vote module permissions on token module",
            error
        );
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address, 
            percent90, 
        );

        console.log("✅ #WINNING: Successfully transferred tokens to vote module");

    } catch(err) {
        console.error("#WEAK bro: failed to transfer tokens to vote module", err);

    }
})();