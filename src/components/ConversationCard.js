import React from "react";
import { shortAddress, truncate } from "../utils/utils";

const ConversationCard = ({ setSelectedConvo, address, latestMessage }) => {
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className="conversation-header"
    >
      <div className="identicon" />
      <div className="convo-info">
        <div>
          <b>{shortAddress(address)}</b>
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
