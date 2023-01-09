import React, { useContext, useEffect, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import Header from "./Header";
import BackButton from "./BackButton";
import useStreamMessages from "../hooks/useStreamMessages";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import AddressInput from "./AddressInput";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamMessages(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const reset = () => {
    setSelectedConvo(null);
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
      setSelectedConvo(newAddress);
      setErrorMsg("");
    }
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='flex align-center flex-dir-col home'>
      <Header />
      {client && (
        <div className='card'>
          {!isMobile ? (
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
          ) : !selectedConvo ? (
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
          ) : null}
          {isMobile && !selectedConvo ? null : !selectedConvo &&
            !isNewMsg ? null : (
            <div className='msg-card'>
              <div className='conversation-header convo-header align-center flex justify-start '>
                <div className='back-btn'>
                  <BackButton reset={reset} />
                </div>
                <div className='identicon'></div>
                <AddressInput
                  isNewMsg={isNewMsg}
                  onInputBlur={onInputBlur}
                  errorMsg={errorMsg}
                  selectedConvo={selectedConvo}
                />
              </div>
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages}
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
