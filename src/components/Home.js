import React, { useContext, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useConversation from "../hooks/useConversation";
import { shortAddress } from "../utils/utils";
import ConversationCard from "./ConversationCard";
import Header from "./Header";
import Input from "./Input";
import MessageCard from "./MessageCard";

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useConversation(selectedConvo);
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const checkIfOnNetwork = async (address) => {
    return client?.canMessage(address) || false;
  };

  const onInputBlur = () => {
    if (!newAddress.startsWith("0x") || !newAddress.length === 42) {
      alert("Invalid Address");
    } else if (!checkIfOnNetwork(newAddress)) {
      alert("Address not on XMTP network");
    } else {
      setSelectedConvo(newAddress)
    }
  };

  return (
    <div className="home">
      <Header />
      <div className="card">
        {!selectedConvo && !isNewMsg ? (
          <>
            <div className="card-header">
              <div>
                <h4>Conversations</h4>
              </div>
              <div>
                <button onClick={() => setIsNewMsg(true)} className="btn">
                  + New Message
                </button>
              </div>
            </div>
            <hr />
            {Array.from(convoMessages.keys()).map((address) => {
              return (
                <ConversationCard
                  key={"Convo_" + address}
                  setSelectedConvo={setSelectedConvo}
                  address={address}
                />
              );
            })}
          </>
        ) : (
          <div>
            <div className="conversation-header">
              <div
                onClick={() => {
                  setSelectedConvo(null);
                  setIsNewMsg(false);
                }}
                className="back-chevron"
              >
                &#8249;
              </div>
              <div className="identicon"></div>
              <div className="flex">
                {isNewMsg ? (
                  <Input
                    setNewValue={setNewAddress}
                    placeholder="Wallet Address"
                    value={newAddress}
                    onInputBlur={onInputBlur}
                  />
                ) : (
                  <b>{shortAddress(selectedConvo)}</b>
                )}
              </div>
            </div>
            <div className="msgs-container">
              {!isNewMsg &&
                convoMessages.get(selectedConvo).map((msg) => {
                  return <MessageCard key={msg.id} msg={msg} />;
                })}
            </div>
            <hr />
            <div className="flex">
              <Input
                setNewValue={setMsgTxt}
                placeholder="Message"
                value={msgTxt}
              />
              <button
                className="btn"
                onClick={() => {
                  sendMessage(msgTxt);
                  setMsgTxt("");
                }}
              >
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
