import React from "react";
import { shortAddress } from "../utils/utils";

const MessageCard = ({ msg }) => {
  return (
    <>
      <div className="msg-header flex">
        <div className="identicon" />
        <div className="convo-info">
          <div>
            <b>{shortAddress(msg.senderAddress)}</b>
          </div>
          <div>{msg.content}</div>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
