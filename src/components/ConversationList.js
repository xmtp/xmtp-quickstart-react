import React, { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import { getLatestMessage } from "../utils/utils";
import ConversationCard from "./ConversationCard";

const ConversationList = ({ convoMessages, setSelectedConvo }) => {
  const [providerState] = useContext(XmtpContext);
  const { conversations } = providerState;

  const sortedConvos = new Map(
    [...convoMessages.entries()].sort((convoA, convoB) => {
      return getLatestMessage(convoA[1])?.sent <
        getLatestMessage(convoB[1])?.sent
        ? 1
        : -1;
    })
  );

  return (
    <>
      {Array.from(sortedConvos.keys()).map((convoKey) => {
        const isKeyAddress =
          convoKey.startsWith("0x") && convoKey.length === 42;
        if (convoMessages.get(convoKey).length > 0)
          return (
            <ConversationCard
              key={"Convo_" + convoKey}
              convoKey={convoKey}
              setSelectedConvo={setSelectedConvo}
              peerAddress={
                isKeyAddress
                  ? convoKey
                  : conversations.get(convoKey).peerAddress
              }
              conversationId={isKeyAddress ? null : convoKey}
              latestMessage={getLatestMessage(convoMessages.get(convoKey))}
            />
          );
        else return null;
      })}
    </>
  );
};

export default ConversationList;
