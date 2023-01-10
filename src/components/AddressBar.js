import { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import AddressInput from "./AddressInput";
import BackButton from "./BackButton";

const AddressBar = ({
  reset,
  errorMsg,
  selectedConvo,
  isNewMsg,
  setErrorMsg,
  setSelectedConvo
}) => {
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState;

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = (newAddress) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else if (!checkIfOnNetwork(newAddress)) {
      setErrorMsg("Address not on XMTP network");
    } else {
      setSelectedConvo(newAddress);
      setErrorMsg("");
    }
  };
  return (
    <div className='conversation-header convo-header align-center flex justify-start '>
      <div className='back-btn'>
        <BackButton reset={reset} />
      </div>
      <div className='identicon'></div>
      <AddressInput
        isNewMsg={isNewMsg}
        onInputBlur={onInputBlur}
        errorMsg={errorMsg}
        selectedConvo={selectedConvo}
      />
    </div>
  );
};

export default AddressBar;
