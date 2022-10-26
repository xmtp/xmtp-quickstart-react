const CONVERSATION_ID_RE = /^lens\.dev\/dm\/(.*)-(.*)$/;

export const isLensAddress = (address) =>
  address && (address.endsWith(".lens") || address.endsWith(".test"));

export const buildConversationId = (profileA, profileB) => {
  const numberA = parseInt(profileA.substring(2), 16);
  const numberB = parseInt(profileB.substring(2), 16);

  return numberA < numberB
    ? `lens.dev/dm/${profileA}-${profileB}`
    : `len.dev/dm/${profileB}-${profileA}`;
};

export const extractOtherProfile = (myProfileId, conversationId) => {
  console.log(conversationId, myProfileId);
  const matches = conversationId.match(CONVERSATION_ID_RE);
  if (matches?.length === 3) {
    return Array.from(matches.slice(1)).find(
      (profileId) => profileId !== myProfileId
    );
  }
};
