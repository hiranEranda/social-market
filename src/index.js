import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { MoralisProvider } from "react-moralis";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const APP_ID = process.env.REACT_APP_DAPP_ID;
const SERVER_URL = process.env.REACT_APP_DAPP_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <App />,
    </MoralisProvider>
  </React.StrictMode>
);
