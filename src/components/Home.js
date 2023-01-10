import React, { useContext, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import Header from "./Header";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";
import useWindowSize from "../hooks/useWindowSize";
import AddressBar from "./AddressBar";

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const isMobile = useWindowSize();

  const reset = () => {
    setSelectedConvo(null);
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  const ConvoList = () => (
    <div className='convo-list'>
      <CardHeader setIsNewMsg={setIsNewMsg} />
      <div className='conversation-list'>
        <ConversationList
          convoMessages={convoMessages}
          setSelectedConvo={setSelectedConvo}
          reset={reset}
        />
      </div>
    </div>
  );

  return (
    <div className='flex align-center flex-dir-col home'>
      <Header />
      {client && (
        <div className='card'>
          {!isMobile ? <ConvoList /> : !selectedConvo ? <ConvoList /> : null}
          {isMobile && !selectedConvo ? null : !selectedConvo &&
            !isNewMsg ? null : (
            <div className='msg-card'>
              <AddressBar
                reset={reset}
                isNewMsg={isNewMsg}
                setErrorMsg={setErrorMsg}
                errorMsg={errorMsg}
                selectedConvo={selectedConvo}
                setSelectedConvo={setSelectedConvo}
              />
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages.get(selectedConvo)}
                selectedConvo={selectedConvo}
              />
              <MessageComposer
                msgTxt={msgTxt}
                setMsgTxt={setMsgTxt}
                sendNewMessage={sendNewMessage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
