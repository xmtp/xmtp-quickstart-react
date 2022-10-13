import React from "react";

const CardHeader = ({ setIsNewMsg }) => {
  return (
    <div className="flex justify-between align-center">
      <div>
        <h4>Conversations</h4>
      </div>
      <div>
        <button onClick={() => setIsNewMsg(true)} className="btn">
          + New message
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
