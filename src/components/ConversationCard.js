import React from "react";
import { shortAddress, truncate } from "../utils/utils";

const ConversationCard = ({
  setSelectedConvo,
  peerAddress,
  convoKey,
  conversationId,
  latestMessage,
}) => {
  return (
    <div
      onClick={() => setSelectedConvo({ peerAddress, conversationId })}
      className="conversation-header flex justify-start"
    >
      <div className="identicon" />
      <div className="flex convo-info align-start flex-dir-col justify-start">
        <div>
          <b>{shortAddress(convoKey)}</b>
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
