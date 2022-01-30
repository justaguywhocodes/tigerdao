import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  process.env.TOKEN_MODULE_ADDRESS,
);

(async () => {
    try {
        console.log(
            "👀 #WINNING: Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
          );
      
          await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
          console.log(
            "🎉 #WINNING: Roles after revoking ourselves",
            await tokenModule.getAllRoleMembers()
          );

          console.log("✅ #EPICWINNING: Successfully revoked our superpowers from the ERC-20 contract");

    } catch(err) {
        console.error("#WEAK: Failed to revoke ourselves from the DAO treasury", error);

    }
})();