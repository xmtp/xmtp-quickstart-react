import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const Header = () => {
  const { connectWallet } = useContext(WalletContext);
  return (
    <div className="header">
      <h3>Logo</h3>
      <button className="btn" onClick={connectWallet}>
        Connect
      </button>
    </div>
  );
};

export default Header;
