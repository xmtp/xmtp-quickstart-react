import React, { useContext, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import Header from "./Header";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import AddressInput from "./AddressInput";
import BackButton from "./BackButton";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState({});
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSelectedConvo({});
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = (newAddress) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else if (!checkIfOnNetwork(newAddress)) {
      setErrorMsg("Address not on XMTP network");
    } else {
      setSelectedConvo({ peerAddress: newAddress });
      setErrorMsg("");
    }
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  const convoKey = selectedConvo?.conversationId ?? selectedConvo?.peerAddress;

  return (
    <div className="flex align-center flex-dir-col home">
      <Header />
      {client && (
        <div className="card">
          {!selectedConvo?.peerAddress && !isNewMsg ? (
            <>
              <CardHeader setIsNewMsg={setIsNewMsg} />
              <div className="conversation-list">
                <ConversationList
                  convoMessages={convoMessages}
                  setSelectedConvo={setSelectedConvo}
                />
              </div>
            </>
          ) : (
            <>
              <div className="conversation-header align-center flex justify-start">
                <BackButton reset={reset} />
                <div className="identicon"></div>
                <AddressInput
                  isNewMsg={isNewMsg}
                  onInputBlur={onInputBlur}
                  errorMsg={errorMsg}
                  convoKey={convoKey}
                />
              </div>
              <MessageList
                isNewMsg={isNewMsg}
                convoKey={convoKey}
                convoMessages={convoMessages.get(convoKey)}
                selectedConvo={selectedConvo}
              />
              <hr />
              <MessageComposer
                msgTxt={msgTxt}
                setMsgTxt={setMsgTxt}
                sendNewMessage={sendNewMessage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
