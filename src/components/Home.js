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
    <div className="home">
      <button onClick={connectWallet}>Connect</button>
      <button onClick={() => sendMessage("Yo Babe 28/09")}>Send message</button>
      <span>{walletAddress}</span>
      <div className="card">
        <div className="card-header">
          <div>
            <h4>Conversations</h4>
          </div>
          <div>
            <button className="new-msg-btn">+ New Message</button>
          </div>
        </div>
        <hr />
        {Array.from(convoMessages.keys()).map((address) => {
          return (
            <div className="conversation-header">
              <div className="identicon">{address[0]}</div>
              <div>{address}</div>
              {/* {convoMessages.get(address).map((msg) => {
              return (
                <div>
                  Sender-{shortAddress(msg.senderAddress)}
                  <br />
                  Msg-{msg.content}
                </div>
              );
            })} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
