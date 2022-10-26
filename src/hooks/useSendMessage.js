import { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";

const useSendMessage = (conversation) => {
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState || {};

  const sendMessage = async (message) => {
    if (!client || !conversation) {
      return;
    }
    await conversation.send(message);
  };

  return {
    sendMessage,
  };
};

export default useSendMessage;
