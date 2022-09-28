import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";
import { shortAddress } from "../utils/utils";

const Home = () => {
  const { connectWallet, walletAddress } = useContext(WalletContext);
  const { convoMessages } = useContext(XmtpContext);

  return (
    <div>
      <button onClick={connectWallet}>Connect</button>
      <span>{walletAddress}</span>
      {Array.from(convoMessages.keys()).map((address) => {
        return (
          <>
            <hr />
            <div>From: {address}</div>
            <hr />
            {convoMessages.get(address).map((msg) => {
              return (
                <div>
                  Sender-{shortAddress(msg.senderAddress)}
                  <br />
                  Msg-{msg.content}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default Home;
