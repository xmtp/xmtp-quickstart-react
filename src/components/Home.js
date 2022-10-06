import React, { useContext, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useConversation from "../hooks/useConversation";
import { getLatestMessage, shortAddress } from "../utils/utils";
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
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSelectedConvo(null);
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = () => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid Address");
    } else if (!checkIfOnNetwork(newAddress)) {
      setErrorMsg("Address not on XMTP network");
    } else {
      setSelectedConvo(newAddress);
      setErrorMsg("");
    }
  };

  const orderByLatestMessage = (convoA, convoB) => {
    const convoAMessages = convoMessages.get(convoA.peerAddress) ?? [];
    const convoBMessages = convoMessages.get(convoB.peerAddress) ?? [];
    const convoALastMessageDate =
      getLatestMessage(convoAMessages)?.sent || new Date();
    const convoBLastMessageDate =
      getLatestMessage(convoBMessages)?.sent || new Date();
    return convoALastMessageDate < convoBLastMessageDate ? 1 : -1;
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  return (
    <div className="flex home">
      <Header />
      <div className="card">
        {!selectedConvo && !isNewMsg ? (
          <>
            <div className="card-header flex">
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
            {Array.from(convoMessages.keys())
              .sort(orderByLatestMessage)
              .map((address) => {
                return (
                  <ConversationCard
                    key={"Convo_" + address}
                    setSelectedConvo={setSelectedConvo}
                    address={address}
                    latestMessage={getLatestMessage(convoMessages.get(address))}
                  />
                );
              })}
          </>
        ) : (
          <>
            <div className="conversation-header flex">
              <div onClick={reset} className="flex back-chevron">
                &#8249;
              </div>
              <div className="identicon"></div>
              <div className="flex new-address-div">
                {isNewMsg ? (
                  <>
                    <Input
                      setNewValue={setNewAddress}
                      placeholder="Wallet Address"
                      value={newAddress}
                      onInputBlur={onInputBlur}
                    />
                    {errorMsg && <span>{errorMsg}</span>}
                  </>
                ) : (
                  <b>{shortAddress(selectedConvo)}</b>
                )}
              </div>
            </div>
            <div className="msgs-container flex">
              <div className="mt-auto">
                {!isNewMsg &&
                  convoMessages.get(selectedConvo).map((msg) => {
                    return <MessageCard key={msg.id} msg={msg} />;
                  })}
              </div>
            </div>
            <hr />
            <div className="flex">
              <Input
                setNewValue={setMsgTxt}
                placeholder="Message"
                value={msgTxt}
              />
              <button className="btn" onClick={sendNewMessage}>
                Send message
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
