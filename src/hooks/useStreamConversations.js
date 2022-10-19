import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";

const useStreamConversations = () => {
  const { walletAddress } = useContext(WalletContext);
  const [providerState, setProviderState] = useContext(XmtpContext);
  const { client, convoMessages, conversations } = providerState;
  const [stream, setStream] = useState("");

  useEffect(() => {
    if (!conversations || !client) return;

    const streamConversations = async () => {
      const newStream = await client.conversations.stream();
      setStream(stream);
      for await (const convo of newStream) {
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

    streamConversations();

    return () => {
      const closeStream = async () => {
        if (!stream) return;
        await stream.return();
      };
      closeStream();
    };
    // eslint-disable-next-line
  }, [conversations]);
};

export default useStreamConversations;
