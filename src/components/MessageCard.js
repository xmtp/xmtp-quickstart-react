import React from "react";
import { shortAddress } from "../utils/utils";

const MessageCard = ({ msg }) => {
  return (
    <>
      <div className="msg-header">
        <div className="identicon"></div>
        <div><b>{shortAddress(msg.senderAddress)}</b></div>
      </div>
      <div className="msg-container">{msg.content}</div>
    </>
  );
};

export default MessageCard;
