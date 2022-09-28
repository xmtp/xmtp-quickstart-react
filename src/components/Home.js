import React, { useContext, useState } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";
import useConversation from "../hooks/useConversation";
import { shortAddress } from "../utils/utils";

const Home = () => {
  const { connectWallet } = useContext(WalletContext);
  const [providerState] = useContext(XmtpContext);
  const { convoMessages } = providerState;
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [msgText, setMsgText] = useState("");
  const { sendMessage } = useConversation(selectedConvo);

  return (
    <div className="home">
      <button onClick={connectWallet}>Connect</button>
      <div className="card">
        {!selectedConvo ? (
          <>
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
                <div
                  onClick={() => setSelectedConvo(address)}
                  className="conversation-header"
                >
                  <div className="identicon"></div>
                  <div>{shortAddress(address)}</div>
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <div className="conversation-header">
              <div onClick={() => setSelectedConvo(null)}>{"<"}</div>
              <div className="identicon"></div>
              <div>{shortAddress(selectedConvo)}</div>
            </div>
            <div className="msgs-container">
              {convoMessages.get(selectedConvo).map((msg) => {
                return (
                  <div>
                    Sender-{shortAddress(msg.senderAddress)}
                    <br />
                    Msg-{msg.content}
                  </div>
                );
              })}
            </div>
            <div>
              <input
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                type="text"
              ></input>
              <button onClick={() => sendMessage(msgText)}>
                Send message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
