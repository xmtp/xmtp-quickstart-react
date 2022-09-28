import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";
import useConversation from "../hooks/useConversation";
import { shortAddress } from "../utils/utils";

const Home = () => {
  const { connectWallet, walletAddress } = useContext(WalletContext);
  const [providerState] = useContext(XmtpContext);
  const { convoMessages } = providerState;
  const { sendMessage } = useConversation(Array.from(convoMessages.keys())[0]);

  return (
    <div>
      <button onClick={connectWallet}>Connect</button>
      <button onClick={()=>sendMessage("Yo Babe 28/09")}>Send message</button>
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
