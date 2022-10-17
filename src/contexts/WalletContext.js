import { createContext, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    const instance = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(instance, "any");
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

  const providerOptions = {};

  // Redirect User to Install MetaMask if not already installed
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    providerOptions["custom-metamask"] = {
      display: {},
      package: {},
      connector: async () => {
        window.open("https://metamask.io");
      },
    };
  }

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
