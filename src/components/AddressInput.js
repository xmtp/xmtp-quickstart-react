import React, { useState } from "react";
import { shortAddress } from "../utils/utils";
import Input from "./Input";

const AddressInput = ({ isNewMsg, onInputBlur, errorMsg, convoKey }) => {
  const [newAddress, setNewAddress] = useState("");
  return (
    <div className={`flex flex-dir-col ${isNewMsg ? "flex-1" : ""}`}>
      {isNewMsg ? (
        <>
          <Input
            setNewValue={setNewAddress}
            placeholder="Enter a wallet address"
            value={newAddress}
            onInputBlur={() => onInputBlur(newAddress)}
          />
          {errorMsg && (
            <span className="new-address flex-dir-col">{errorMsg}</span>
          )}
        </>
      ) : (
        <b>{shortAddress(convoKey)}</b>
      )}
    </div>
  );
};

export default AddressInput;
