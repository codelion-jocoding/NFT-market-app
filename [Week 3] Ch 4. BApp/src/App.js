import React, { useState } from "react";
import logo from "./logo.svg";
import QRCode from "qrcode.react";
import { getBalance, readCount, setCount } from "./api/UseCaver";
import * as KlipAPI from "./api/UseKlip";
import "./App.css";

function onPressButton(balance) {
  console.log("hi");
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
};
const DEFAULT_QR_CODE = "DEFAULT";
function App() {
  const [balance, setBalance] = useState("0");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // readCount();
  // getBalance('0xf3810aca8544e19559b6f06249ce5bc93376a2ad');
  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            onClickGetAddress();
          }}
        >
          주소 가져오기
        </button>
        <button
          onClick={() => {
            onClickSetCount();
          }}
        >
          카운트 값 변경
        </button>
        <br />
        <br />
        <br />
        <QRCode value={qrvalue} />
        <p>{balance}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
