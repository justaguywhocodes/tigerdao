
import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { UnsupportedChainIdError } from '@web3-react/core';
const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
  "0x7Cf2722391982CA4AD1066Ffef50e76FB7a10e2D"
);

const tokenModule = sdk.getTokenModule(
  "0x4A5cD3b6d9Bbd53f05F006C6999f7e9D8CbDf88E"
);

const voteModule = sdk.getVoteModule(
  "0xB6Be05b4ecf1f645A7Abbef22d2Fbab3996C77cb"
);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();

  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // shorten member addresses to
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  console.log(`👋🏽 address: ${address}`);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    voteModule
      .getAll()
      .then((proposals) => {
        // set state
        setProposals(proposals);
        console.log("🌈 #WINNING Proposals:", proposals);
      })
      .catch((err) => {
        console.error("#WEAK: failed to get proposals", err);
      });
  }, [hasClaimedNFT]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!proposals.length) {
      return;
    }

    voteModule
      .hasVoted(proposals[0].proposalId, address)
      .then((hasVoted) => {
        setHasVoted(hasVoted);

        if (hasVoted) {
          alert("#EPICWINNING: 🥵 User has already voted");
        } else {
          console.log("#WINNING: 🙂 User has not voted yet");
        }
      })
      .catch((err) => {
        console.error("#WEAK: failed to check if wallet has voted", err);
      });
  }, [hasClaimedNFT, proposals, address]);
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    bundleDropModule
      .getAllClaimerAddresses("0")
      .then((addresses) => {
        console.log("🚀 #WINNING -> Members addresses", addresses);
        setMemberAddresses(addresses);
      })
      .catch((err) => {
        console.error("#WEAK - failed to get member list", err);
      });
  }, [hasClaimedNFT]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    tokenModule
      .getAllHolderBalances()
      .then((amounts) => {
        console.log("🚀 #WINNING -> Amounts", amounts);
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        console.error("#WEAK - failed to get token amounts", err);
      });
  }, [hasClaimedNFT]);

  // now, combine the memberAddresses with the memberTokenAmounts into a single array

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        address,
        tokenAmount: ethers.utils.formatUnits(
          memberTokenAmounts[address] || 0,
          18
        ),
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  useEffect(() => {
    if (!address) {
      return;
    }

    // Check if the user has the NFT by enabling bundleDropModule.balanceOf
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("#WINNING 🎉 - user has a membership NFT ");
        } else {
          setHasClaimedNFT(false);
          console.log("#WEAK - 😭 this user doesn't have a membership NFT.");
        }
      })
      .catch((err) => {
        setHasClaimedNFT(false);
        console.log("WEAK - 😭 failed to pull nft balance", err);
      });
  }, [address]);

  if (error instanceof UnsupportedChainIdError) {
    return (
      <div>
        <h2>Please connect to Rinkeby bro 😎</h2>
        <p>
          #WEAK -
          This dapp only works on the Rinkeby network, please switch networks
        in your connected wallet.
        </p>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to 🐅 TigerDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          <span>Connect your wallet bro</span>
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🐅 tigerDAO Members Page</h1>
        <p>
          Congratulations on being a member bro, that's some #epicwinning right
          there.
        </p>
        <div>
          <div>
            <h2>Members</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount ($WINNING)</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Active Proposals</h2>
            <form
              onSubmit={async (evt) => {
                evt.preventDefault();
                evt.stopPropagation();

                setIsVoting(true);

                const votes = proposals.map((proposal) => {
                  let voteResult = {
                    proposalId: proposal.proposalId,
                    vote: 2, // abstain by default
                  };

                  proposal.vote.forEach((vote) => {
                    const elem = document.getElementById(
                      proposal.proposalId + "-" + vote.type
                    );

                    if (elem.checked) {
                      voteResult.vote = vote.type;

                      return;
                    }
                  });

                  return voteResult;
                });
                // first we need to make sure the user delegates their token to vote

                try {
                  const delegation = await tokenModule.getDelegationOf(address);

                  if (delegation === ethers.constants.addressZero) {
                    await tokenModule.delegateTo(address);
                  }

                  try {
                    await Promise.all(
                      votes.map(async (vote) => {
                        const proposal = await voteModule.get(vote.proposalId);

                        if (proposal.state === 1) {
                          return voteModule.vote(vote.proposalId, vote.vote);
                        }

                        return;
                      })
                    );

                    try {
                      await Promise.all(
                        votes.map(async (vote) => {
                          const proposal = await voteModule.get(
                            vote.proposalId
                          );

                          if (proposal.state === 4) {
                            return voteModule.execute(vote.proposalId);
                          }
                        })
                      );

                      setHasVoted(true);

                      console.log("#WINNING: successfully voted");
                    } catch (err) {
                      console.error("#WEAK: failed to execute votes", err);
                    }
                  } catch (err) {
                    console.error("#WEAK: failed to vote", err);
                  }
                } catch (err) {
                  console.error("failed to delegate tokens");
                } finally {
                  // in *either* case we need to set the isVoting state to false to enable the button again
                  setIsVoting(false);
                }
              }}
            >
            {proposals.map((proposal, index) => (
                <div key={proposal.proposalId} className="card">
                  <h5>{proposal.description}</h5>
                  <div>
                    {proposal.votes.map((vote) => (
                      <div key={vote.type}>
                        <input
                          type="radio"
                          id={proposal.proposalId + "-" + vote.type}
                          name={proposal.proposalId}
                          value={vote.type}
                          //default the "abstain" vote to chedked
                          defaultChecked={vote.type === 2}
                        />
                        <label htmlFor={proposal.proposalId + "-" + vote.type}>
                          {vote.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button disabled={isVoting || hasVoted} type="submit">
                  { isVoting ? "Voting..."
                  : hasVoted ? "You have already voted" : "Submit Votes"
                  }
              </button>
              <small>
                This will trigger multiple transactions that you will need to sign.
              </small>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /*
              {proposals.votes.map((vote) => (
              
              ))}

  */

  const mintNFT = () => {
    setIsClaiming(true);

    bundleDropModule
      .claim("0", 1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log("#EPICWINNING 🎉 - user has a membership NFT");
        console.log(
          "🌊 Successfully minted NFT, congrats you now have tigerblood"
        );
        console.log(
          `Check it here: https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0`
        );
      })
      .catch((err) => {
        console.error("#WEAK - failed to claim", err);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  };

  return (
    <div className="mint-nft">
      <h1>Mint your free 🐅 tigerDAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={() => mintNFT()}>
        {isClaiming
          ? "Minting..."
          : "Mint your tigerBLOOD (NFT) - its free bro"}
      </button>
    </div>
  );
};

export default App;
