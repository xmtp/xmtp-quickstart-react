import { createContext, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    let web3Provider = null;
    let instance = null;
    instance = await web3Modal.connect();
    web3Provider = new ethers.providers.Web3Provider(instance, "any");
    const newSigner = await web3Provider.getSigner();
    setSigner(newSigner);
    setWalletAddress(await newSigner.getAddress());

    instance.on("accountsChanged", () => {
      disconnectWallet();
    });

    instance.on("connect", () => {
      connectWallet();
    });

    instance.on("disconnect", () => {
      disconnectWallet();
    });
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setSigner(null);
  };

  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        walletAddress,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
