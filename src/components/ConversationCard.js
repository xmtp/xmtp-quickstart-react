import React from "react";
import { truncate } from "../utils/utils";

const ConversationCard = ({
  setSelectedConvo,
  address,
  latestMessage,
  handle,
}) => {
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className="conversation-header flex justify-start"
    >
      <div className="identicon" />
      <div className="flex convo-info align-start flex-dir-col justify-start">
        <div>
          <b>{handle}</b>
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
