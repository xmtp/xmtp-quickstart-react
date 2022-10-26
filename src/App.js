import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./contexts/WalletContext";
import { XmtpContextProvider } from "./contexts/XmtpContext";
import Home from "./components/Home";
import { Buffer } from "buffer";
import "./styles/styles.css";
import "./App.css";
import { LensContextProvider } from "./contexts/LensContext";

window.Buffer = Buffer;

function App() {
  return (
    <div className="App">
      <LensContextProvider>
        <WalletContextProvider>
          <XmtpContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </XmtpContextProvider>
        </WalletContextProvider>
      </LensContextProvider>
    </div>
  );
}

export default App;
