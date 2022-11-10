import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Header from "../../components/header/Header";
import ExploreSection from "./ExploreSection";
import { useNavigate, Link } from "react-router-dom";
import { useMoralis, useChain } from "react-moralis";
import CircularStatic from "../../components/LoadingAnime";
import ExploreAll from "../homes/ExploreAll";
import ExploreCategory from "../homes/ExploreCategory";

const Moralis = require("moralis-v1");

function Marketplace() {
  let navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [categoryData, setCategoryData] = React.useState(null);
  const [lazyData, setLazyData] = React.useState(null);
  const [collectionData, setCollectionData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState(null);
  const [filter, setFilter] = React.useState("All");

  const { isInitialized } = useMoralis();

  const getData = async () => {
    setLoading(true);
    // //console.log("getting data");
    try {
      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      let data = [];

      const result1 = await Moralis.Cloud.run("SM_getItemsSingle");
      // console.log(result1);
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

  const getCategoryData = async () => {
    setLoading(true);
    // //console.log("getting data");
    const params = {
      collection: filter,
    };
    try {
      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      let data = [];

      const result = await Moralis.Cloud.run("SM_filterCollections", params);
      const data1 = await Promise.all(
        result.map(async (item) => {
          if (item) {
            const params = {
              tokenId: item.tokenId,
              tokenAddress: item.tokenAddress,
            };
            const history = await Moralis.Cloud.run("SM_getHistory721", params);
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });

            return { ...item, ...result.data, ...history };
          }
        })
      );
      const res = await Moralis.Cloud.run("SM_getItemsBatch");
      const result2 = await Promise.all(
        res.map(async (val, i) => {
          let params = {
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
      // //console.log(result2);

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
      // //console.log("init data");

      const filterData = [];
      for (let i = 0; i < data2.length; i++) {
        if (data2[i].category === filter) {
          filterData.push(data2[i]);
        }
      }

      data.push(data1);
      data.push(filterData);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      // //console.log(error);
      return null;
    }
  };

  //   React.useEffect(() => {
  //     console.log(filter);
  //     if (filter !== "All")
  //       getCategoryData().then((data) => {
  //         console.log(data);
  //         setCategoryData(data);
  //       });
  //   }, [filter]);

  React.useEffect(() => {
    if (isInitialized) {
      getData().then((data) => {
        // console.log(data);
        setData(data);
      });

      if (filter !== "All")
        getCategoryData().then((data) => {
          //   console.log(data);
          setCategoryData(data);
        });
      //   console.log(filter);
      //   console.log(categoryData);
      //   console.log(data);

      // getLazyData().then((data) => {
      //   // console.log(data);
      //   setLazyData(data);
      // });
    }
  }, [isInitialized, filter]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [alignment, setAlignment] = React.useState("ERC-721");
  const [type, setType] = React.useState("ERC-721");
  const [typeMint, setTypeMint] = React.useState("ERC-721");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Header />
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
      ) : null}
      <div className="flex items-center justify-center w-full pt-[90px]">
        <div className="w-full bg-slate-900 h-[200px] flex justify-center items-center text-white text-4xl font-bold">
          Marketplace
        </div>
      </div>

      <div
        className="w-full mx-auto"
        style={{
          padding: "3em 3.5rem 3em 3.5rem",
          backgroundColor: "#fff",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="flex justify-between mb-3 max-h-10">
            <h2 style={{ color: "#c19a2e", paddingBottom: "1.5rem" }}>
              Explore ⚡️
            </h2>

            {/* ================= search bar ================= */}
            <div className="flex border-blue-500 rounded-xl header__search border-1">
              <input
                type="text"
                placeholder="Search"
                className="flex"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    text === null || text === undefined || text.length === 0
                      ? navigate(`/no-results`)
                      : navigate(`/results/${text}`);
                  }
                }}
              />

              <Link
                to={
                  text === null || text === undefined || text.length === 0
                    ? `/no-results`
                    : `/results/${text}`
                }
                className=""
              >
                {/* <BsSearch /> */}
              </Link>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 mb-3 max-h-15 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
            <div
              onClick={() => setFilter("All")}
              className={classNames(
                filter === "All" &&
                  "cursor-pointer flex items-center justify-center border-black bg-yellow-200 rounded-full border-2",
                "cursor-pointer flex items-center justify-center border-yellow-400 rounded-full border-1"
              )}
            >
              <img
                src="/images/category/rainbow.png"
                className="flex items-center justify-center w-5 mr-2"
                alt=""
              />
              All
            </div>
            <div
              onClick={() => setFilter("Art")}
              className={classNames(
                filter === "Art" &&
                  "cursor-pointer flex items-center justify-center border-black bg-yellow-200 rounded-full border-2",
                "cursor-pointer flex items-center justify-center border-yellow-400 rounded-full border-1"
              )}
            >
              <img
                src="/images/category/art.png"
                className="flex items-center justify-center w-5 mr-2"
                alt=""
              />
              Art
            </div>
            <div
              onClick={() => setFilter("Games")}
              className={classNames(
                filter === "Games" &&
                  "cursor-pointer flex items-center justify-center border-black bg-yellow-200 rounded-full border-2",
                "cursor-pointer flex items-center justify-center border-yellow-400 rounded-full border-1"
              )}
            >
              <img
                src="/images/category/cup.png"
                className="flex items-center justify-center w-5 mr-2"
                alt=""
              />{" "}
              Games
            </div>
            <div
              onClick={() => setFilter("Music")}
              className={classNames(
                filter === "Music" &&
                  "cursor-pointer flex items-center justify-center border-black bg-yellow-200 rounded-full border-2",
                "cursor-pointer flex items-center justify-center border-yellow-400 rounded-full border-1"
              )}
            >
              <img
                src="/images/category/music.png"
                className="flex items-center justify-center w-5 mr-2"
                alt=""
              />{" "}
              Music
            </div>
            <div
              onClick={() => setFilter("Memes")}
              className={classNames(
                filter === "Memes" &&
                  "cursor-pointer flex items-center justify-center border-black bg-yellow-200 rounded-full border-2",
                "cursor-pointer flex items-center justify-center border-yellow-400 rounded-full border-1"
              )}
            >
              <img
                src="/images/category/dino.png"
                className="flex items-center justify-center w-5 mr-2"
                alt=""
              />{" "}
              Memes
            </div>
          </div>

          <div className="mb-3">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              size="small"
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

        {loading ? null : filter === "All" && data !== null ? (
          <ExploreAll
            loading={loading}
            data={data}
            data_1={data[0]}
            data_2={data[1]}
            type={type}
          />
        ) : categoryData !== null ? (
          <ExploreCategory
            loading={loading}
            data={categoryData}
            data_1={categoryData[0]}
            data_2={categoryData[1]}
            type={type}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Marketplace;
