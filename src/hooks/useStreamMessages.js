import { useEffect, useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";

const useStreamMessages = (conversation) => {
  const { walletAddress } = useContext(WalletContext);
  const [providerState, setProviderState] = useContext(XmtpContext);
  const { convoMessages } = providerState;

  useEffect(() => {
    if (!conversation) return;
    let stream;
    const streamMessages = async () => {
      stream = await conversation.streamMessages();
      for await (const msg of stream) {
        if (setProviderState) {
          const newMessages =
            convoMessages.get(conversation.context?.conversationId) ?? [];
          newMessages.push(msg);
          const uniqueMessages = [
            ...Array.from(
              new Map(newMessages.map((item) => [item["id"], item])).values()
            ),
          ];
          convoMessages.set(
            conversation.context?.conversationId,
            uniqueMessages
          );
          setProviderState({
            ...providerState,
            convoMessages: new Map(convoMessages),
          });
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
    // eslint-disable-next-line
  }, [convoMessages, walletAddress, conversation]);
};

export default useStreamMessages;
