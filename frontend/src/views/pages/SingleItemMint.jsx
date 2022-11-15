import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useMoralis } from "react-moralis";

import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaEthereum } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";

import Response from "./Response";

import lazyMint721 from "../../../src/contract/functions/erc721/lazymint";
const Moralis = require("moralis-v1");
const contract = require("../../../src/contract/functions/erc721/contract");

function SingleItemMint() {
  const bought = (msg) => toast.success(msg);
  const boughtError = (msg) => toast.error(msg);

  let { objectId } = useParams();
  // Get data from db
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(null);
  const [id, setId] = useState(null);
  const [_loading, _setLoading] = useState(false);

  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { isInitialized, authenticate, user } = useMoralis();
  let navigate = useNavigate();

  function fromBinary(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  }

  const getData = async () => {
    _setLoading(true);
    // //console.log("getting data");
    try {
      const query = new Moralis.Query("SM_NFTLazy721");
      query.equalTo("objectId", id);
      const obj = await query.first();

      const result = obj.attributes;

      // console.log(result);

      const params = {
        tokenAddress: result.tokenAddress,
      };

      const creatorObject = await Moralis.Cloud.run("SM_getUser", {
        ethAddress: result.owner,
      });
      // console.log("creatorObject: ", creatorObject);

      var contractAvatar = await Moralis.Cloud.run("SM_getContractAvatar", params);

      // console.log("contractAvatar: ", contractAvatar);
      if (contractAvatar === undefined) {
        contractAvatar = [];
      } else {
        // console.log(contractAvatar);
      }
      const contractDetails = await contract.getNameAndSymbol(result.tokenAddress);
      // console.log(contractDetails);

      const isCustomToken = {
        isCustomToken: result.isCustomToken,
      };

      let res = [];
      res.push(result);
      // console.log(res);

      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      const data = await Promise.all(
        res.map(async (item) => {
          if (item) {
            let uri = prefix + item.uri.substring(34, item.uri.length);
            const res = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            let decoded_name = fromBinary(res.data.name);
            let decoded_description = fromBinary(res.data.description);
            res.data.name = decoded_name;
            res.data.description = decoded_description;

            return {
              ...item,
              ...res.data,
              creatorObject,
              contractDetails,
              contractAvatar,
              ...isCustomToken,
            };
          }
        })
      );

      _setLoading(false);
      return { history, data };
    } catch (error) {
      _setLoading(false);
      // //console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (isInitialized) {
      setId(objectId);

      getData().then((info) => {
        if (info !== null && info !== undefined) {
          console.log(info, data);
          setData(info.data);
          setHistory(info.history.history);
        }
      });
    }
  }, [isInitialized, id, setId, id]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full pt-[90px]">
        {/* {console.log(data)} */}
        <div className="w-full h-[250px] bg-slate-900 flex">
          <p className="flex items-center justify-center text-6xl text-white">Single Product</p>
        </div>
      </div>
      {_loading && data === null ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (!_loading && data === null) || data === undefined ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className="flex items-center justify-center py-[70px] mx-auto ">
            <div className="px-4 border-gray-400 rounded-2xl border-1 max-w-[560px] md:max-w-[760px] lg:max-w-[1400px]">
              <div className="grid gap-4 p-3 lg:grid-cols-2">
                <div className="pt-3">
                  <img className="flex mx-auto rounded-xl max-h-[700px] min-h-[400px]" src={data[0].image} alt="" />
                  <div className="flex items-center justify-center px-4 py-2 mt-4 bg-yellow-500 h-[40px] lg:w-[200px] rounded-full gap-4">
                    <AiFillInstagram className="text-xl text-white" />
                    <BsFacebook className="text-xl text-white" />
                    <AiFillTwitterCircle className="text-xl text-white" />
                  </div>
                </div>
                <div className="mt-3 md:pl-4">
                  <p className="text-black">NFT ID: {data[0].tokenId}</p>
                  <p className="text-2xl font-bold text-black">NFT name: {data[0].name}</p>
                  <p className="mt-3 text-black">Item category: {data[0].category}</p>
                  <div className="grid gap-3 my-3 md:grid-cols-2">
                    <div className="p-2 border-gray-400 rounded-lg border-1 h-[70px] my-auto">
                      <div className="grid grid-flow-col grid-rows-2 gap-2 h-[50px]">
                        <div className="flex items-center row-span-2 mx-auto">
                          <img
                            className="w-10 h-10 rounded-full"
                            // {data[0].creatorObject[0].attributes.username}
                            src={
                              !data[0].creatorObject[0].attributes.avatar ||
                              data[0].creatorObject[0].attributes.avatar === undefined ||
                              data[0].creatorObject[0].attributes.avatar === null
                                ? `/images/avatar.png`
                                : data[0].creatorObject[0].attributes.avatar._url
                            }
                            alt=""
                          />
                        </div>
                        <div className="col-span-2">Creator</div>
                        <div className="col-span-2 text-sm text-gray-500">
                          {data[0].creatorObject[0].attributes.username}
                        </div>
                      </div>
                    </div>
                    <div className=" p-2 border-gray-400 rounded-lg border-1 h-[70px]">
                      <div className="grid grid-flow-col grid-rows-2 gap-2 h-[50px]">
                        <div className="flex items-center row-span-2 mx-auto">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={
                              !data[0].contractAvatar || data[0].contractAvatar.length === 0
                                ? `/images/smkt.jpeg`
                                : data[0].contractAvatar[0].attributes.Avatar
                            }
                            alt=""
                          />
                        </div>
                        <div className="col-span-2">Collection</div>
                        <div className="col-span-2 text-sm text-gray-500">{data[0].contractDetails.name}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-black">Description</p>
                  <div className="overflow-auto scroll-y scroll-smooth h-[6rem] border- border-gray-300 rounded-lg py-2">
                    <p>{data[0].description}</p>
                  </div>
                  <div className="mt-4 ">
                    <p className="text-xl text-black">Price</p>
                    <p className="flex text-xl font-bold text-black">
                      <span className="mr-2">
                        {data[0].isCustomToken ? (
                          <img className="w-[30px] mr-2" src="/images/smkt.jpeg" alt="" />
                        ) : (
                          <FaEthereum size={20} />
                        )}
                      </span>
                      {Moralis.Units.FromWei(data[0].askingPrice, 18)} {data[0].isCustomToken ? "SMKT" : "ETH"}
                    </p>
                  </div>
                  <div className="mt-4 ">
                    <button
                      className="px-[100px] py-2 bg-yellow-400 rounded-md"
                      onClick={async () => {
                        const user = await Moralis.User.current();
                        if (!user) {
                          navigate(`/connect-wallet`);
                          // boughtError("Please connect wallet");
                        } else {
                          setOpen(true);
                          setTitle("Mint Item");
                          setMessage("Sign the transaction to mint item");
                          console.log(id);
                          try {
                            let res = await lazyMint721(
                              data[0].uri,
                              data[0].tokenAddress,
                              data[0].askingPrice,
                              id,
                              data[0].owner,
                              data[0].isCustomToken
                            );
                            if (res.state) {
                              bought(res.message);
                              setLoading(false);
                              setTimeout(() => {
                                setOpen(false);
                                setLoading(true);
                                navigate("/profile");
                              }, 1000);
                            } else {
                              setOpen(false);
                              setLoading(true);
                              boughtError(res.message);
                              console.log(res);
                            }
                          } catch (error) {
                            setOpen(false);
                            setLoading(true);
                            boughtError(error.message);
                            console.log(error);
                          }
                        }
                      }}
                    >
                      Mint now
                    </button>
                  </div>
                  {/* <div className="px-3 mt-4">
                    <p className="text-black">Highest bid by</p>
                    <p className="text-xl text-black">
                      TTyYHxpVNNPub8xwpsifQjHRTBZLLQ4Ur8
                    </p>
                    <p>0.0007 SMKT</p>
                  </div> */}
                  {/* <div className="mt-4">
                    <p className="text-black">Item History</p>
                    <div className="overflow-auto scroll-y scroll-smooth h-[6rem] border- border-gray-300 rounded-lg py-2">
                      {history !== null && history.state === true ? (
                        history.data.map((his, i) => (
                          <div
                            key={i}
                            className="space-x-10 creator_item creator_card"
                          >
                            <div className="space-x-10 avatars">
                              <div className="media">
                                <div className="badge">
                                  <img
                                    src="/img/icons/Badge.svg"
                                    alt="ImgPreview"
                                  />
                                </div>
                                <Link
                                  // to={`/ExternalProfile/${his.buyerEthAddress}`}
                                  to="#"
                                >
                                  <img
                                    src={
                                      his.buyerAvatar !== undefined
                                        ? his.buyerAvatar._url
                                        : `/images/avatar.png`
                                    }
                                    alt="Avatar"
                                    className="avatar avatar-md"
                                  />
                                </Link>
                              </div>
                              <div>
                                <p className="color_black">
                                  <Link
                                    className="color_black txt _bold"
                                    // to={`/ExternalProfile/${his.buyerEthAddress}`}
                                    to="#"
                                  >
                                    {his.buyerUsername}
                                  </Link>
                                </p>
                                Bought At:{" "}
                                {Moralis.Units.FromWei(his.boughtPrice, 18)} ETH
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="">
                          {history !== null && history.state === false ? (
                            <div>{history.data}</div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      <Response open={open} loading={loading} title={title} message={message} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default SingleItemMint;
