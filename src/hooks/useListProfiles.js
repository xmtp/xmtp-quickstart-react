import { useQuery } from "urql";

const listProfiles = `
query ListProfiles($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        handle
        ownedBy
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
      }
    }
  }
`;

const buildProfileMap = (data, myProfileId) =>
  data && new Map(data.profiles.items.map((profile) => [profile.id, profile]));

/**
 *
 * @param {string[]} profileIds
 */
const useListProfiles = (profileIds) => {
  const [result] = useQuery({
    query: listProfiles,
    variables: { request: { profileIds } },
    // Don't run when no handle provided
    pause: !profileIds || !profileIds.length,
  });

  return {
    profiles: buildProfileMap(result?.data),
    loading: result.fetching,
  };
};

export default useListProfiles;
