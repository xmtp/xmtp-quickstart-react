import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./contexts/WalletContext";
import { XmtpContextProvider } from "./contexts/XmtpContext";
import Home from "./components/Home";
import { Buffer } from "buffer";
import "./styles/styles.css"
import "./App.css";

window.Buffer = Buffer;

function App() {
  return (
    <div className="App">
      <WalletContextProvider>
        <XmtpContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </XmtpContextProvider>
      </WalletContextProvider>
    </div>
  );
}

export default App;
