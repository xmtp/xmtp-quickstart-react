import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { shortAddress } from "../utils/utils";

const Header = () => {
  const { connectWallet, walletAddress } = useContext(WalletContext);
  return (
    <div className="header">
      <h3>Logo</h3>
      {walletAddress ? (
        <h3>{shortAddress(walletAddress)}</h3>
      ) : (
        <button className="btn" onClick={connectWallet}>
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;
