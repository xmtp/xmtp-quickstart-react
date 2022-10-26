import { useCallback } from "react";
import { useClient } from "urql";

const query = `
query GetProfile($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
        id
        name
        picture {
            ... on NftImage {
            uri
            }
            ... on MediaSet {
            original {
                url
                mimeType
            }
            }
            __typename
        }
        handle
        ownedBy
    }
}
`;

const useGetProfile = () => {
  const client = useClient();

  const getProfile = useCallback(
    async (handle) => {
      const res = await client
        .query(query, { request: { handle } })
        .toPromise();

      return res.data?.profile;
    },
    [client]
  );

  return { getProfile };
};

export default useGetProfile;
