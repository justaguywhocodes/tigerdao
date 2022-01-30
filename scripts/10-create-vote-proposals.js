import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    process.env.VOTING_CONTRACT_ADDRESS
);

const tokenModule = sdk.getTokenModule(
    process.env.TOKEN_MODULE_ADDRESS
);

(async () => {
   try {
        const amount = 420_000;

        await voteModule.propose(
            `Should TigerDAO mint an additional ${amount} tokens into the treasury?`,
            [
                {
                    // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                    // to send in this proposal. In this case, we're sending 0 ETH.
                    // We're just minting new tokens to the treasury. So, set to 0.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        // We're doing a mint! And, we're minting to the voteModule, which is
                        // acting as our treasury.
                        "mint",
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]
        );

        console.log("✅ #WINNING: Successfully created proposal to mint tokens");

    } catch (err) {
        console.error("#WEAK: failed to create first proposal", err);

        process.exit(1);
    }

    try {
        const amount = 6_900;  // Create proposal to transfer ourselves 6,900 tokens for being awesome.

        await voteModule.propose(
            "Should the DAO (tigerDAO) transfer" +
            amount + " tokens from the treasury to " +
            process.env.WALLET_ADDRESS + " for having tigerBLOOD and for an epic streak of #WINNING?",
            [
                {
                    // Again, we're sending ourselves 0 ETH. Just sending our own token.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(), 18)
                        ]
                    ),
                    toAddress: tokenModule.address
                }
            ]
        );

        console.log(
            "✅ #WINNING: Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
    } catch (err) {
        console.error("#WEAK: failed to create second proposal", err);
    }

})();