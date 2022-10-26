import { useQuery } from "urql";

const query = `
query DefaultProfile($address: String!) {
    defaultProfile(request: { ethereumAddress: $address}) {
      id
      handle
    }
}
`;

const useGetDefaultProfile = (address) => {
  const [result] = useQuery({
    query: query,
    variables: { address },
    // Don't run when no handle provided
    pause: !address,
  });
  return {
    defaultProfile: result.data?.defaultProfile,
    loading: result.fetching,
  };
};

export default useGetDefaultProfile;
