import React from "react";
import useStreamMessages from "../hooks/useStreamMessages";
import MessageCard from "./MessageCard";

const MessageList = ({ isNewMsg, convoMessages, selectedConvo }) => {
  useStreamMessages(selectedConvo);
  
  return (
    <div className="msgs-container flex flex-dir-col">
      <div className="mt-auto">
        {!isNewMsg &&
          convoMessages.map((msg) => {
            return <MessageCard key={msg.id} msg={msg} />;
          })}
      </div>
    </div>
  );
};

export default MessageList;
