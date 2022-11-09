import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useMoralis } from "react-moralis";
import { FaEthereum } from "react-icons/fa";

import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import Response from "./Response";

const Moralis = require("moralis-v1");
const contract = require("../../../src/contract/functions/erc1155/contract");

const nft = {
  id: "3213154654",
  category: "Art",
  price: "120",
};

function BatchItem() {
  const bought = (msg) => toast.success(msg);
  const boughtError = (msg) => toast.error(msg);

  let { tokenId, tokenAddress, uid } = useParams();
  // Get data from db
  const [data, setData] = useState(null);
  const [owner, setOwner] = useState(null);
  const [balance, setBalance] = useState(null);
  const [royalty, setRoyalty] = useState(null);
  const [_tokenId, setTokenId] = useState(null);
  const [_tokenAddress, setTokenAddress] = useState(null);
  const [_uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);

  const [_loading, _setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { isInitialized, authenticate, user } = useMoralis();
  let navigate = useNavigate();
  useEffect(() => {
    setTokenId(tokenId);
    setTokenAddress(tokenAddress);
    setUid(uid);
  }, [setTokenAddress, setTokenId, setUid, tokenAddress, tokenId]);

  const getData = async () => {
    setLoading(true);
    // console.log("getting data");
    try {
      //   console.log(state);
      var params = {
        tokenId: _tokenId,
        tokenAddress: _tokenAddress,
        uid: _uid,
      };

      const res = await Moralis.Cloud.run("SM_viewItem1155", params);
      const owner = await Moralis.Cloud.run("SM_getOwners", params);

      var params = {
        tokenId: parseInt(res[0].tokenId),
        tokenAddress: res[0].tokenAddress,
      };

      const royalty = await Moralis.Cloud.run(
        "SM_getCreatorAndRoyalty",
        params
      );
      setRoyalty(royalty[0]);

      const balance = await contract.getBalance(
        _tokenAddress,
        res[0].ownerOf,
        _tokenId
      );
      setBalance(balance);

      //   console.log(royalty);

      const result = await Promise.all(
        res.map(async (val, i) => {
          const params = {
            owner: val.ownerOf.toLowerCase(),
            uid: val.uid,
          };
          const res = await Moralis.Cloud.run("SM_getUserDetails", params);
          return {
            ...val,
            sellerUsername: res[0].attributes.ownerObject.attributes.username,
            sellerAvatar: res[0].attributes.ownerObject.attributes.avatar,
          };
        })
      );
      // //console.log(result);

      const userObject = await Moralis.Cloud.run("SM_getCreator", params);

      var contractAvatar = await Moralis.Cloud.run(
        "SM_getContractAvatar",
        params
      );

      if (contractAvatar === undefined) {
        contractAvatar = [];
      } else {
        // //console.log(contractAvatar);
      }
      const contractDetails = await contract.getNameAndSymbol(
        result[0].tokenAddress
      );

      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      const data = await Promise.all(
        result.map(async (item) => {
          if (item) {
            //  //console.log(item);
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            const res = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            //  //console.log(res);
            return {
              ...item,
              ...res.data,
              userObject,
              contractDetails,
              contractAvatar,
            };
          }
        })
      );
      //   console.log("data fetch completed");

      setLoading(false);
      return { owner, data };
    } catch (error) {
      setLoading(false);
      // //console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (isInitialized) {
      getData().then((info) => {
        if (info !== null && info !== undefined) {
          //   console.log(info.data);
          setData(info.data);
          setOwner(info.owner);
        }
      });
    }
  }, [isInitialized, _tokenAddress, _tokenId, _uid]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full pt-[90px]">
        {/* {console.log(data)} */}
        <div className="w-full h-[250px] bg-slate-900 flex">
          <p className="flex items-center justify-center text-6xl text-white">
            Batch Product
          </p>
        </div>
      </div>
      {_loading && data === null ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (!_loading && data === null) || data === undefined ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className="flex items-center justify-center py-[70px] mx-auto border-black border-1">
            <div className="px-4 border-gray-400 rounded-2xl border-1 max-w-[560px] md:max-w-[760px] lg:max-w-[1400px]">
              <div className="grid gap-4 p-3 lg:grid-cols-2">
                <div className="pt-3">
                  <img
                    className="flex mx-auto rounded-xl max-h-[700px]"
                    src={data[0].image}
                    alt=""
                  />
                  <div className="flex items-center justify-center px-4 py-2 mt-4 bg-yellow-500 h-[40px] lg:w-[200px] rounded-full gap-4">
                    <AiFillInstagram className="text-xl text-white" />
                    <BsFacebook className="text-xl text-white" />
                    <AiFillTwitterCircle className="text-xl text-white" />
                  </div>
                </div>
                <div className="mt-3 md:pl-4">
                  <p className="text-black">NFT ID: {data[0].tokenId}</p>
                  <p className="text-2xl font-bold text-black">
                    NFT name: {data[0].name}
                  </p>
                  <p className="mt-3 text-black">
                    Item category: {data[0].category}
                  </p>
                  <p className="mt-3 text-black">
                    Item Amount: {data[0].amount}
                  </p>
                  <div className="grid gap-3 my-3 md:grid-cols-2">
                    <div className="p-2 border-gray-400 rounded-lg border-1 h-[70px] my-auto">
                      <div className="grid grid-flow-col grid-rows-2 gap-2 h-[50px]">
                        <div className="flex items-center row-span-2 mx-auto">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="/images/fire.gif"
                            alt=""
                          />
                        </div>
                        <div className="col-span-2">02</div>
                        <div className="col-span-2">03</div>
                      </div>
                    </div>
                    <div className=" p-2 border-gray-400 rounded-lg border-1 h-[70px]">
                      <div className="grid grid-flow-col grid-rows-2 gap-2 h-[50px]">
                        <div className="row-span-2">01</div>
                        <div className="col-span-2">02</div>
                        <div className="col-span-2">03</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-black">Description</p>
                  <div className="overflow-auto scroll-y scroll-smooth h-[6rem] border- border-gray-300 rounded-lg py-2">
                    <p>{data[0].description}</p>
                  </div>

                  <div className="px-3 mt-4">
                    <p className="text-xl text-black">Price</p>
                    <p className="flex items-center text-xl font-bold text-black">
                      <span className="mr-2">
                        {data[0].isCustomToken ? (
                          <img
                            className="w-[30px] mr-2"
                            src="/images/smkt.jpeg"
                            alt=""
                          />
                        ) : (
                          <FaEthereum size={20} />
                        )}
                      </span>
                      {Moralis.Units.FromWei(data[0].askingPrice, 18)} ETH
                    </p>
                  </div>
                  <div className="px-3 mt-4">
                    <button
                      className="px-[100px] py-2 bg-yellow-400 rounded-md"
                      onClick={async () => {
                        const user = await Moralis.User.current();
                        if (!user) {
                          //   navigate(`/connect-wallet`);
                          boughtError("Please connect wallet");
                        } else {
                          setOpen(true);
                          setTitle("Buy Item");
                          setMessage("Sign the transaction to buy item");
                          let res = await contract.buyItem(
                            data[0],
                            authenticate
                          );
                          if (res.status) {
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
                          }
                        }
                      }}
                    >
                      Buy now
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
      <Response
        open={open}
        loading={_loading}
        title={title}
        message={message}
      />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default BatchItem;
