import React from "react";
import { shortAddress, truncate } from "../utils/utils";

const ConversationCard = ({ setSelectedConvo, address, latestMessage }) => {
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className="conversation-header flex justify-start"
    >
      <div className="identicon" />
      <div className="flex convo-info align-start flex-dir-col justify-start">
        <div>
          <b>{shortAddress(address)}</b>
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
