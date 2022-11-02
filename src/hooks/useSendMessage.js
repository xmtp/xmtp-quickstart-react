import { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";

const useSendMessage = ({peerAddress, conversationId}) => {
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState || {};

  const sendMessage = async (message) => {
    if (!client || !peerAddress) {
      return;
    }
    let conversation;
    if (conversationId) {
      conversation = await client.conversations.newConversation(peerAddress, {
        conversationId: conversationId,
        metadata: {},
      });
    } else {
      conversation = await client.conversations.newConversation(peerAddress);
    }
    if (!conversation) return;
    await conversation.send(message);
  };

  return {
    sendMessage,
  };
};

export default useSendMessage;
