import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

import { useMoralis } from "react-moralis";

const Moralis = require("moralis-v1");

function Collections() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { isInitialized } = useMoralis();

  const getData = async () => {
    setLoading(true);
    try {
      // const user = await Moralis.User.current();
      const query1 = new Moralis.Query("SM_ContractOwners");

      query1.equalTo("collectionType", "erc1155");
      const collection = await query1.find();

      const data = await Promise.all(
        collection.map(async (item) => {
          let params = {
            // ethAddress: user.get("ethAddress").toLowerCase(),
            tokenAddress: item.attributes.collectionAddress,
            isAll: true,
          };
          const user = await Moralis.Cloud.run("SM_getUser", {
            ethAddress: item.attributes.userAddress,
          });
          //   console.log(user);

          const items = await Moralis.Cloud.run("SM_getCollectionData", params);
          const nfts = await Promise.all(
            items.map(async (item) => {
              let prefix = "https://gateway.moralisipfs.com/ipfs/";
              let uri = prefix + item.tokenUri.substring(34, item.tokenUri.length);
              //   const result = await fetch(uri);
              const result = await Moralis.Cloud.run("FetchJson", {
                url: uri,
              });

              console.log(result);

              //   return { ...item, ...(await result.json()) };
              return { ...item, ...result.data };
            })
          );

          return { ...item.attributes, nfts, user };
        })
      );

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      //  //console.log(error.message);
      return null;
    }
  };

  React.useEffect(() => {
    if (isInitialized) {
      getData().then((data) => {
        console.log(data);
        setData(data);
      });
    }
  }, [isInitialized]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full pt-[90px]">
        {/* {console.log(data)} */}
        <div className="w-full h-[250px] bg-slate-900 flex">
          <p className="flex items-center justify-center text-6xl text-white">All Collections</p>
        </div>
      </div>

      {loading ? (
        <>
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="section h-[500px] bg-white"></div>
        </>
      ) : (!loading && data === null) || data === undefined ? (
        <div>Check your connectivity</div>
      ) : !loading && data.length === 0 ? (
        <>
          <div className="section my-100 ">
            <div className="container d-flex align-items-center justify-content-center">
              <h2> No Collection data available!!!</h2>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="max-w-[1350px] mx-auto flex justify-center mt-[30px]">
            <div className="grid justify-center gap-4 px-4 mx-auto md:grid-cols-3 items center">
              {data.map((val, i) => (
                <div key={i} className="h-[360px] w-[420px] rounded-2xl border-1 border-gray-400 p-3">
                  <img
                    className="rounded-xl h-[220px] w-[380px] object-cover mx-auto"
                    src={val === null || val.Avatar === undefined ? "/images/NFT.png" : val.Avatar}
                    alt=""
                  />
                  <p className="px-2 mt-3 text-xl text-black text-bold">{val.name}</p>
                  <div className="p-2 mt-2 rounded-2xl">
                    <div className="flex">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={
                          val === null || val.user[0].attributes.avatar === undefined
                            ? "/images/avatar.png"
                            : val.user[0].attributes.avatar._url
                        }
                        alt=""
                      />
                      <p className="flex items-center px-3">{val.user[0].attributes.username}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Collections;
