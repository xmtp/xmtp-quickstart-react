import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";

let stream;

const useConversation = (peerAddress, onMessageCallback) => {
  const { walletAddress } = useContext(WalletContext);
  const [providerState, setProviderState] = useContext(XmtpContext);
  const [conversation, setConversation] = useState(null);
  const { client, convoMessages } = providerState;

  useEffect(() => {
    const getConvo = async () => {
      if (!client || !peerAddress) {
        return;
      }
      setConversation(await client.conversations.newConversation(peerAddress));
    };
    getConvo();
  }, [client, peerAddress]);

  useEffect(() => {
    if (!conversation) return;
    const streamMessages = async () => {
      stream = await conversation?.streamMessages();
      for await (const msg of stream) {
        if (setProviderState) {
          const newMessages = convoMessages.get(conversation.peerAddress) ?? [];
          newMessages.push(msg);
          const uniqueMessages = [
            ...Array.from(
              new Map(newMessages.map((item) => [item["id"], item])).values()
            ),
          ];
          convoMessages.set(conversation.peerAddress, uniqueMessages);
          setProviderState({
            ...providerState,
            convoMessages: new Map(convoMessages),
          });
        }
        if (onMessageCallback) {
          onMessageCallback();
        }
      }
    };
    streamMessages();
    return () => {
      const closeStream = async () => {
        if (!stream) return;
        await stream.return();
      };
      closeStream();
    };
  }, [conversation, convoMessages, onMessageCallback, walletAddress]);

  const sendMessage = async (message) => {
    if (!conversation) return;
    await conversation.send(message);
  };

  return {
    sendMessage,
  };
};

export default useConversation;
