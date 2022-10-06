import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { shortAddress } from "../utils/utils";
import xmtpLogo from "../assets/xmtp-logo.png";

const Header = () => {
  const { connectWallet, walletAddress } = useContext(WalletContext);
  return (
    <div className="header flex">
      <img className="logo" alt="XMTP Logo" src={xmtpLogo} />
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
