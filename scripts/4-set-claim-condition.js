import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
    process.env.BUNDLE_DROP_ADDRESS
);

(async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();

        // Specify the conditions. 
        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1
        });

        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("🐅 C'mon bro 😎 I got tigerBlood,#WINNING - Successfully set the claim condition on bundle drop:", bundleDrop.address);

    } catch (err) {
        console.error("Failed to set claim condition", err);
    }
})();