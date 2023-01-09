import React from "react";
import Input from "./Input";

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage }) => {
  return (
    <div className='flex msg-composer'>
      <div className='flex-1'>
        <Input
          setNewValue={setMsgTxt}
          placeholder='Write a message'
          value={msgTxt}
        />
      </div>
      <div>
        <button className='btn' onClick={sendNewMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageComposer;
