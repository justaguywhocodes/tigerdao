import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const appModule = sdk.getAppModule(
    "0xB74AB21fb3c5DA1e9702826031f1Ef8cda0e6cE7"
);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "tigerDAO's #WINNING Proposals",
            votingTokenAddress: "0x4A5cD3b6d9Bbd53f05F006C6999f7e9D8CbDf88E",
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: "0",
        });

        console.log(
            "✅ Successfully deployed vote module #EPICWINNING:  address:",
            voteModule.address,
        );
    } catch(err) {
        console.error("#WEAK: Failed to deploy vote module", err);   
    }
})();