import React, { useState, createContext, useEffect, useContext } from "react";
import { Client } from '@xmtp/xmtp-js'
import { WalletContext } from "./WalletContext";

export const XmtpContext = createContext();

export const XmtpContextProvider = ({ children }) => {
  const { signer, walletAddress } = useContext(WalletContext);
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
    signer ? initClient(signer) : disconnect();
  }, [signer]);

  useEffect(() => {
    if (!providerState.client) return;

    const listConversations = async () => {
      console.log("Listing conversations");
      setProviderState({ ...providerState, loadingConversations: true });
      const { client, convoMessages, conversations } = providerState;
      const convos = await client.conversations.list();
      Promise.all(
        convos.map(async (convo) => {
          if (convo.peerAddress !== walletAddress) {
            const messages = await convo.messages();
            convoMessages.set(convo.peerAddress, messages);
            conversations.set(convo.peerAddress, convo);
            setProviderState({
              ...providerState,
              convoMessages,
              conversations,
            });
          }
        })
      ).then(() => {
        setProviderState({ ...providerState, loadingConversations: false });
        if (Notification.permission === "default") {
          Notification.requestPermission();
        }
      });
    };

    const streamConversations = async () => {
      const { client, convoMessages, conversations } = providerState;
      const stream = await client.conversations.stream();
      for await (const convo of stream) {
        if (convo.peerAddress !== walletAddress) {
          const messages = await convo.messages();
          convoMessages.set(convo.peerAddress, messages);
          conversations.set(convo.peerAddress, convo);
          setProviderState({
            ...providerState,
            convoMessages,
            conversations,
          });
        }
      }
    };

    listConversations();
    streamConversations();
  }, [providerState.client]);

  return (
    <XmtpContext.Provider value={providerState}>
      {children}
    </XmtpContext.Provider>
  );
};
