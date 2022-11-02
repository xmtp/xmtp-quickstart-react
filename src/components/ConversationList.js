import React from "react";
import { getLatestMessage } from "../utils/utils";
import ConversationCard from "./ConversationCard";

const ConversationList = ({ convoMessages, setSelectedConvo }) => {
  
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
      {Array.from(sortedConvos.keys()).map((address) => {
        if (sortedConvos.get(address).length > 0) {
          return (
            <ConversationCard
              key={"Convo_" + address}
              setSelectedConvo={setSelectedConvo}
              address={address}
              latestMessage={getLatestMessage(sortedConvos.get(address))}
            />
          );
        } else return null;
      })}
    </>
  );
};

export default ConversationList;
