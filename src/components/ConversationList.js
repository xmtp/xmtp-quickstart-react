import React from "react";
import { extractOtherProfile } from "../utils/lens";
import { getLatestMessage } from "../utils/utils";
import ConversationCard from "./ConversationCard";

const ConversationList = ({
  convoMessages,
  setSelectedConvo,
  profiles,
  myProfileId,
}) => {
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
          const profile = profiles?.get(
            extractOtherProfile(myProfileId, address)
          );
          if (!profile) {
            return null;
          }
          return (
            <ConversationCard
              key={"Convo_" + address}
              setSelectedConvo={setSelectedConvo}
              address={address}
              handle={profile?.handle}
              latestMessage={getLatestMessage(convoMessages.get(address))}
            />
          );
        })}
    </>
  );
};

export default ConversationList;
