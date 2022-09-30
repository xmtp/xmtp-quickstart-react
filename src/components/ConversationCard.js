import React from "react";
import { shortAddress } from "../utils/utils";

const ConversationCard = ({setSelectedConvo, address}) => {
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className="conversation-header"
    >
      <div className="identicon"></div>
      <div><b>{shortAddress(address)}</b></div>
    </div>
  );
};

export default ConversationCard