import { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";

const useSendMessage = (peerAddress) => {
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState || {};

  const sendMessage = async (message) => {
    if (!client || !peerAddress) {
      return;
    }
    const conversation = await client.conversations.newConversation(
      peerAddress
    );
    if (!conversation) return;
    await conversation.send(message);
  };

  return {
    sendMessage,
  };
};

export default useSendMessage;
