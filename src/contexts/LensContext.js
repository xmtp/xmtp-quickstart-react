import { createClient, Provider } from "urql";

const LENS_TESTNET_URL = "https://api-mumbai.lens.dev";

const client = createClient({ url: LENS_TESTNET_URL });

export const LensContextProvider = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
