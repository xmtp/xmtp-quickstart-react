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
import useGetProfile from "../hooks/useGetProfile";
import useGetDefaultProfile from "../hooks/useGetDefaultProfile";
import useListProfiles from "../hooks/useListProfiles";
import {
  extractOtherProfile,
  buildConversationId,
  isLensAddress,
} from "../utils/lens";

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client, conversations } = providerState;
  const [selectedConvoId, setSelectedConvoId] = useState(null);
  const [msgTxt, setMsgTxt] = useState("");
  const convo = conversations.get(selectedConvoId);
  const { sendMessage } = useSendMessage(convo);
  const { getProfile } = useGetProfile();
  const { defaultProfile, loading } = useGetDefaultProfile(client?.address);
  useStreamConversations();
  const { profiles, loading: profilesLoading } = useListProfiles(
    Array.from(conversations?.keys())
      .map((conversationId) =>
        extractOtherProfile(defaultProfile?.id, conversationId)
      )
      .filter((match) => !!match)
  );
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSelectedConvoId(null);
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = async (handle) => {
    if (!isLensAddress(handle)) {
      setErrorMsg("Invalid address");
    } else {
      const profile = await getProfile(handle);
      const isOnNetwork = await checkIfOnNetwork(profile.ownedBy);
      if (!isOnNetwork) {
        setErrorMsg("Address not on XMTP network");
      } else {
        setSelectedConvoId(buildConversationId(profile.id, defaultProfile?.id));
        setErrorMsg("");
      }
    }
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  return (
    <div className="flex align-center flex-dir-col home">
      <Header />
      {client && !loading && !profilesLoading && (
        <div className="card">
          {!selectedConvoId && !isNewMsg ? (
            <>
              <CardHeader setIsNewMsg={setIsNewMsg} />
              <div className="conversation-list">
                <ConversationList
                  profiles={profiles}
                  convoMessages={convoMessages}
                  setSelectedConvo={setSelectedConvoId}
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
                  handle={
                    profiles?.get(
                      extractOtherProfile(defaultProfile?.id, selectedConvoId)
                    )?.handle
                  }
                />
              </div>
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages.get(selectedConvoId)}
                selectedConvo={conversations.get(selectedConvoId)}
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
