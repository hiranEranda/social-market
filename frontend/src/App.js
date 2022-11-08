import "./assets/css/plugins/bootstrap.min.css";
import ROUTES from "./Router/routes";
import "./assets/scss/style.scss";
import React from "react";

import { useMoralis, useChain } from "react-moralis";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const Moralis = require("moralis-v1");

function App() {
  const [chainId, setChainId] = React.useState(null);
  const [account, setAccount] = React.useState(null);

  const { isInitialized } = useMoralis();
  const { switchNetwork } = useChain();

  React.useEffect(() => {
    if (isInitialized) {
      if (window.ethereum) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      }
      let currentChain;

      const switchNetwork = async () => {
        currentChain = await window.ethereum.request({ method: "eth_chainId" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        return { currentChain, accounts };
      };

      switchNetwork().then((data) => {
        setChainId(data.currentChain);
        setAccount(data.accounts);
      });
      Moralis.enableWeb3();
    }
  }, [isInitialized, chainId]);

  return (
    <div className="overflow-hidden App ">
      {chainId === process.env.REACT_APP_CHAIN ? (
        <ROUTES />
      ) : (
        <>
          <div className="bg-[#111111] pt-3 px-3">
            <img
              className="header__logo"
              id="logo_js"
              style={{
                height: "50px",
              }}
              src="/images/logo2.png"
              // src="/img/logos/coin.svg"
              alt="logo"
            />
          </div>
          <div className="mx-auto py-[250px] bg-[#111111] h-[full]">
            <div className="mx-auto">
              <h1 className="flex items-center justify-center mb-3 text-5xl text-white md:text-6xl">
                Wrong network
              </h1>
              <p className="flex items-center justify-center text-white w-[400px] text-l md:text-xl text-center">
                Looks like you connected to unsupported network. Change network
                to Goerli
              </p>
              <div
                onClick={() => {
                  switchNetwork(process.env.REACT_APP_CHAIN);
                }}
                className="w-[180px] h-[50px] border-1 bg-white rounded-2xl mx-auto mt-3 flex items-center justify-center text-black cursor-pointer"
              >
                Switch network
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
