import React from "react";
import { getLatestMessage } from "../utils/utils";
import ConversationCard from "./ConversationCard";

const ConversationList = ({ convoMessages, setSelectedConvo }) => {
  const orderByLatestMessage = (convoA, convoB) => {
    const convoAMessages = convoMessages.get(convoA.peerAddress) ?? [];
    const convoBMessages = convoMessages.get(convoB.peerAddress) ?? [];
    const convoALastMessageDate =
      getLatestMessage(convoAMessages)?.sent || new Date();
    const convoBLastMessageDate =
      getLatestMessage(convoBMessages)?.sent || new Date();
    return convoALastMessageDate < convoBLastMessageDate ? 1 : -1;
  };

  return (
    <>
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
  );
};

export default ConversationList;
