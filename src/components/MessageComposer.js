import React from "react";
import Input from "./Input";

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage }) => {
  return (
    <div className="flex">
      <Input
        setNewValue={setMsgTxt}
        placeholder="Write a message"
        value={msgTxt}
      />
      <button className="btn" onClick={sendNewMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageComposer;
