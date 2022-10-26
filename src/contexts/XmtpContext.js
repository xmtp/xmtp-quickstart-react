import React, { useState, createContext, useEffect, useContext } from "react";
import { Client } from "@xmtp/xmtp-js";
import { WalletContext } from "./WalletContext";

export const XmtpContext = createContext();

export const XmtpContextProvider = ({ children }) => {
  const { signer, walletAddress } = useContext(WalletContext);
  /**
   * @typedef {Object} ProviderState — Provider State
   * @property {Client} client -
   */
  /**
   * @type {[ProviderState, Function]} State
   */
  const [providerState, setProviderState] = useState({
    client: null,
    initClient: () => {},
    loadingConversations: true,
    conversations: new Map(),
    convoMessages: new Map(),
  });

  const initClient = async (wallet) => {
    if (wallet && !providerState.client) {
      try {
        const client = await Client.create(wallet, { env: "dev" });
        setProviderState({
          ...providerState,
          client,
        });
      } catch (e) {
        console.error(e);
        setProviderState({
          ...providerState,
          client: null,
        });
      }
    }
  };

  const disconnect = () => {
    setProviderState({
      ...providerState,
      client: null,
      conversations: new Map(),
      convoMessages: new Map(),
    });
  };

  useEffect(() => {
    signer ? setProviderState({ ...providerState, initClient }) : disconnect();
    // eslint-disable-next-line
  }, [signer]);

  useEffect(() => {
    if (!providerState.client) return;

    const listConversations = async () => {
      console.log("Listing conversations");
      setProviderState({ ...providerState, loadingConversations: true });
      const { client, convoMessages, conversations } = providerState;
      const convos = (await client.conversations.list()).filter(
        (convo) =>
          convo.context?.conversationId &&
          convo.context.conversationId.startsWith("lens.dev/dm/")
      );
      Promise.all(
        convos.map(async (convo) => {
          if (convo.peerAddress !== walletAddress) {
            const messages = await convo.messages();
            convoMessages.set(convo.context.conversationId, messages);
            conversations.set(convo.context.conversationId, convo);
            setProviderState({
              ...providerState,
              convoMessages,
              conversations,
            });
          }
        })
      ).then(() => {
        setProviderState({ ...providerState, loadingConversations: false });
      });
    };

    listConversations();
    // eslint-disable-next-line
  }, [providerState.client]);

  return (
    <XmtpContext.Provider value={[providerState, setProviderState]}>
      {children}
    </XmtpContext.Provider>
  );
};
