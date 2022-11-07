import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useMoralis, useChain } from "react-moralis";
import useDocumentTitle from "../../components/useDocumentTitle";

import "reactjs-popup/dist/index.css";
// import { HistorySharp } from "@mui/icons-material";

const wallets = [
  {
    title: "metamask",
    // p: "A browser extension with great flexibility. The web's popular wallet",
    popup: "error",
  },
  {
    title: "walletconnect",
    // p: "Log in with Google,  Facebook, or other OAuth provider",
    popup: "error",
  },
];

const ConnectWallet = () => {
  useDocumentTitle("Connect wallet");

  const navigate = useNavigate();
  const chain = "0x5";

  const authenticateAsync = async () => {};

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    isWeb3EnableLoading,
    isWeb3Enabled,
  } = useMoralis();
  const { switchNetwork, chainId } = useChain();

  useEffect(() => {
    if (!isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      if (typeof window.ethereum !== "undefined") {
        enableWeb3();
      }
  }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, enableWeb3]);

  return (
    <div className="effect">
      <Header />

      <div className="container">
        <div>
          <Link to="/" className="mt-20 btn btn-white btn-sm">
            Back to home
          </Link>
          <div className="hero__wallets pt-100 pb-50">
            <div className="space-y-20 d-flex flex-column align-items-center">
              <div className="logo">
                <img
                  src={`images/smkt.jpeg`}
                  alt="ImgPreview"
                  className="w-[200px]"
                />
              </div>
              <h2 className="text-center">Connect your wallet</h2>
              <p className="text-center">
                Connect with one of available wallet providers or create a new
                wallet.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="wallets">
              <div className="row mb-20_reset">
                <div className="col-lg-6">
                  <>
                    <button
                      disabled={!isWeb3Enabled}
                      style={{ width: "100%" }}
                      className="space-y-10 box in__wallet"
                      onClick={async () => {
                        if (typeof window.ethereum !== "undefined") {
                          //   console.log(window.history);
                          if (chainId === chain) {
                            try {
                              await authenticate();
                              navigate(-1);
                            } catch (e) {
                              // //console.log(e);
                            }
                          } else {
                            try {
                              switchNetwork(chain);
                              await authenticate();
                              navigate(-1);
                            } catch (error) {
                              // //console.log(error);
                            }
                          }
                        } else {
                          alert("MetaMask is not installed!");
                        }
                      }}
                    >
                      <div className="logo">
                        <div className="flex justify-center">
                          <img
                            src={`img/icons/${wallets[0].title}.svg`}
                            alt="logo_community"
                          />
                        </div>
                      </div>
                      <h5 className="text-center">{wallets[0].title}</h5>
                      <p className="text-center">{wallets[0].p}</p>
                    </button>
                  </>
                </div>
                <div className="col-lg-6">
                  <>
                    <button
                      disabled={!isWeb3Enabled}
                      style={{ width: "100%" }}
                      className="space-y-10 box in__wallet"
                      onClick={async () => {
                        if (typeof window.ethereum !== "undefined") {
                          //console.log("walletConnect is installed!");

                          if (chainId === chain) {
                            try {
                              await authenticate({ provider: "walletconnect" });
                            } catch (e) {
                              // //console.log(e);
                            }
                          } else {
                            try {
                              switchNetwork(chain);
                              await authenticate({ provider: "walletconnect" });
                            } catch (error) {
                              // //console.log(error);
                            }
                          }
                          navigate(-1);
                        } else {
                          alert("walletConnect is not installed!");
                        }
                      }}
                    >
                      <div className="logo">
                        <div className="flex justify-center">
                          <img
                            src={`img/icons/${wallets[1].title}.svg`}
                            alt="logo_community"
                          />
                        </div>
                      </div>
                      <h5 className="text-center">{wallets[1].title}</h5>
                      <p className="text-center">{wallets[1].p}</p>
                    </button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConnectWallet;
