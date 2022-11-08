import React from "react";

// import useDocumentTitle from "../../components/useDocumentTitle";
import Header from "../../components/header/Header";

import Footer from "../../components/footer/Footer";
import ResponsiveSlider from "../../components/carousel/HotBids";
import ExploreSection from "../pages/ExploreSection";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

import CircularStatic from "../../components/LoadingAnime";

import { useMoralis, useChain } from "react-moralis";
import { useNavigate } from "react-router-dom";
import CardsMint721 from "../../components/cards/CardsMint721";

const Moralis = require("moralis-v1");

const Home1 = () => {
  let navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [lazyData, setLazyData] = React.useState(null);
  const [collectionData, setCollectionData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { isInitialized } = useMoralis();

  const getData = async () => {
    setLoading(true);
    // //console.log("getting data");
    try {
      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      let data = [];

      const result1 = await Moralis.Cloud.run("SM_getItemsSingle");
      console.log(result1);
      const data1 = await Promise.all(
        result1.map(async (item) => {
          if (item) {
            const params = {
              tokenId: item.tokenId,
              tokenAddress: item.tokenAddress,
            };

            const query = new Moralis.Query("SM_NFTOwners721");
            query.equalTo("tokenId", item.tokenId);
            query.equalTo("tokenAddress", item.tokenAddress);
            const obj = await query.first();
            const isCustomToken = {
              isCustomToken: obj.attributes.isCustomToken,
            };

            const history = await Moralis.Cloud.run("SM_getHistory721", params);
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            // const result = await fetch(uri);
            const result = await Moralis.Cloud.run("FetchJson", { url: uri });
            // console.log(result);

            return { ...item, ...result.data, ...history, ...isCustomToken };
          }
        })
      );

      const res = await Moralis.Cloud.run("SM_getItemsBatch");
      // console.log(res);
      const result2 = await Promise.all(
        res.map(async (val, i) => {
          let params = {
            owner: val.ownerOf.toLowerCase(),
            uid: val.uid,
          };

          const query = new Moralis.Query("SM_NFTOwners1155");
          query.equalTo("tokenId", val.tokenId);
          query.equalTo("tokenAddress", val.tokenAddress);
          const obj = await query.first();
          const isCustomToken = {
            isCustomToken: obj.attributes.isCustomToken,
          };

          const res = await Moralis.Cloud.run("SM_getUserDetails", params);

          return {
            ...val,
            sellerUsername: res[0].attributes.ownerObject.attributes.username,
            sellerAvatar: res[0].attributes.ownerObject.attributes.avatar,
            ...isCustomToken,
          };
        })
      );
      const data2 = await Promise.all(
        result2.map(async (item) => {
          if (item) {
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            return { ...item, ...result.data };
          }
        })
      );
      //  //console.log(data2);
      data.push(data1);
      data.push(data2);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      //  //console.log(error.message);
      return null;
    }
  };

  const getLazyData = async () => {
    setLoading(true);
    // //console.log("getting data");
    try {
      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      let data = [];

      const result1 = await Moralis.Cloud.run("SM_getLazySingle");

      const data1 = await Promise.all(
        result1.map(async (item) => {
          if (item) {
            const id = { id: item.id };
            let uri =
              prefix +
              item.attributes.uri.substring(34, item.attributes.uri.length);
            // const result = await fetch(uri);
            const result = await Moralis.Cloud.run("FetchJson", { url: uri });

            return { ...item.attributes, ...result.data, ...id };
          }
        })
      );

      const result2 = await Moralis.Cloud.run("SM_getLazyBatch");
      // console.log(result2);
      const data2 = await Promise.all(
        result2.map(async (item) => {
          if (item) {
            const id = { id: item.id };
            let uri =
              prefix +
              item.attributes.uri.substring(34, item.attributes.uri.length);
            // const result = await fetch(uri);
            const result = await Moralis.Cloud.run("FetchJson", { url: uri });

            return { ...item.attributes, ...result.data, ...id };
          }
        })
      );

      data.push(data1);
      data.push(data2);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      //  //console.log(error.message);
      return null;
    }
  };

  const getCollectionData = async () => {
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
          console.log(user);

          const items = await Moralis.Cloud.run("SM_getCollectionData", params);
          const nfts = await Promise.all(
            items.map(async (item) => {
              let prefix = "https://gateway.moralisipfs.com/ipfs/";
              let uri =
                prefix + item.tokenUri.substring(34, item.tokenUri.length);
              //   const result = await fetch(uri);
              const result = await Moralis.Cloud.run("FetchJson", {
                url: uri,
              });

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
      getCollectionData().then((data) => {
        // console.log(data);
        setCollectionData(data);
      });
      getLazyData().then((data) => {
        // console.log(data);
        setLazyData(data);
      });
    }
  }, [isInitialized]);

  const [alignment, setAlignment] = React.useState("ERC-721");
  const [type, setType] = React.useState("ERC-721");
  const [typeMint, setTypeMint] = React.useState("ERC-721");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Header />

      <img
        className="mx-auto"
        style={{ maxWidth: " 100%", height: "auto" }}
        src="images/back_01.png"
        alt="..."
      />
      <div
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
        className="max-w-[1240px] mx-auto"
      >
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Social Market
          <span style={{ color: "#c19a2e" }}> &nbsp;All Categories</span>
          ⚡️
        </h2>
      </div>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (!loading && data === null) || data === undefined ? (
        <div className="flex justify-center mx-auto">
          <CircularStatic />
        </div>
      ) : !loading && data.length === 0 ? (
        <div>No Items yet</div>
      ) : (
        <ResponsiveSlider data={data[0]} />
      )}
      <div
        className="mx-auto max-w-[1400px]"
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ paddingBottom: "1.5rem" }}>
          <span style={{ color: "#c19a2e" }}>Top </span>Sellers
        </h2>
      </div>
      <div
        className="mx-auto max-w-[1400px]"
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ paddingBottom: "1.5rem" }}>
          <span style={{ color: "#c19a2e" }}>Live </span> Auctions 🏆
        </h2>
      </div>
      <div
        className="mx-auto max-w-[1400px]"
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ paddingBottom: "1.5rem" }}>
          <span style={{ color: "#c19a2e" }}>Top </span> Collections
        </h2>

        {loading ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (!loading && collectionData === null) ||
          collectionData === undefined ? (
          <div className="flex justify-center mx-auto">
            <CircularStatic />
          </div>
        ) : !loading && collectionData.length === 0 ? (
          <div>No Items yet</div>
        ) : (
          <div className="flex">
            {collectionData.slice(0, 5).map((val, i) => (
              <div
                key={i}
                className="h-[54px] max-w-[300px] mb-10 mr-3 choose_collection mb-md-0 mr-md-3 border-1 border-gray-300"
                type="button"
                onClick={() => {
                  navigate(`/all-collections`);
                }}
              >
                <div className="flex items-center">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      val === null ||
                      val.user[0].attributes.avatar === undefined
                        ? "/images/avatar.png"
                        : val.user[0].attributes.avatar._url
                    }
                    alt=""
                  />
                  <span className="flex items-center px-3 text-sm">
                    {val.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="w-full mx-auto"
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <h2 style={{ color: "#c19a2e", paddingBottom: "1.5rem" }}>
            Explore ⚡️
          </h2>
          <div className="mb-3">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton onClick={() => setType("ERC-721")} value="ERC-721">
                ERC-721
              </ToggleButton>
              <ToggleButton
                onClick={() => setType("ERC-1155")}
                value="ERC-1155"
              >
                ERC-1155
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        {loading ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (!loading && data === null) || data === undefined ? (
          <div className="mx-auto max-w-[1280px] flex justify-center">
            <CircularStatic />
          </div>
        ) : !loading && data.length === 0 ? (
          <div className="mx-auto max-w-[1280px]">No Items yet</div>
        ) : (
          <div className="mx-auto">
            {data[0].length > 0 && type === "ERC-721" ? (
              <ExploreSection val={data[0]} isMultiple={false} />
            ) : data[1].length > 0 && type === "ERC-1155" ? (
              <ExploreSection val={data[1]} isMultiple={true} />
            ) : (
              <div className="flex items-center justify-center">
                No items found
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className="w-full mx-auto"
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <h2 style={{ paddingBottom: "1.5rem" }}>
            <span style={{ color: "#c19a2e" }}>Mint </span> now 🏆
          </h2>
          <div className="mb-3">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                onClick={() => setTypeMint("ERC-721")}
                value="ERC-721"
              >
                ERC-721
              </ToggleButton>
              <ToggleButton
                onClick={() => setTypeMint("ERC-1155")}
                value="ERC-1155"
              >
                ERC-1155
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (!loading && lazyData === null) || lazyData === undefined ? (
            <div className="flex justify-center mx-auto">
              <CircularStatic />
            </div>
          ) : !loading && lazyData.length === 0 ? (
            <div>No Items yet</div>
          ) : (
            <div className="mx-auto">
              <div className="grid gap-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1350px] ">
                {lazyData[0].length > 0 && typeMint === "ERC-721" ? (
                  <>
                    {lazyData[0].map((val, i) => (
                      <CardsMint721 key={i} val={val} isMultiple={false} />
                    ))}
                  </>
                ) : lazyData[1].length > 0 && typeMint === "ERC-1155" ? (
                  <>
                    {lazyData[1].map((val, i) => (
                      <CardsMint721 key={i} val={val} isMultiple={true} />
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    No items found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home1;
