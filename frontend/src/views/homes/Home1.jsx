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

import { useMoralis } from "react-moralis";

const Moralis = require("moralis-v1");

const Home1 = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { isInitialized } = useMoralis();

  const getData = async () => {
    setLoading(true);
    // //console.log("getting data");
    try {
      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      let data = [];

      const result1 = await Moralis.Cloud.run("getItemsSingle");
      // console.log(result1);
      const data1 = await Promise.all(
        result1.map(async (item) => {
          if (item) {
            const params = {
              tokenId: item.tokenId,
              tokenAddress: item.tokenAddress,
            };
            const history = await Moralis.Cloud.run("getHistory721", params);
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            const result = await fetch(uri);
            // console.log(await result.json());
            return { ...item, ...(await result.json()), ...history };
          }
        })
      );
      // console.log(data1);

      const res = await Moralis.Cloud.run("getItemsBatch");
      // console.log(res);
      const result2 = await Promise.all(
        res.map(async (val, i) => {
          let params = {
            owner: val.ownerOf.toLowerCase(),
            uid: val.uid,
          };

          const res = await Moralis.Cloud.run("getUserDetails", params);
          // console.log(res);
          return {
            ...val,
            sellerUsername: res[0].attributes.ownerObject.attributes.username,
            sellerAvatar: res[0].attributes.ownerObject.attributes.avatar,
          };
        })
      );
      const data2 = await Promise.all(
        result2.map(async (item) => {
          if (item) {
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            const result = await fetch(uri);
            return { ...item, ...(await result.json()) };
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

  React.useEffect(() => {
    if (isInitialized) {
      getData().then((data) => {
        // console.log(data);
        setData(data);
      });
    }
  }, [isInitialized]);

  const [alignment, setAlignment] = React.useState("ERC-721");
  const [type, setType] = React.useState("ERC-721");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div>
      <Header />

      <img
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

      <ResponsiveSlider />
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
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (!loading && data === null) || data === undefined ? (
          <div>Check your connectivity</div>
        ) : !loading && data.length === 0 ? (
          <div>No Items yet</div>
        ) : (
          <div className="mx-auto">
            {data[0].length > 0 && type === "ERC-721" ? (
              <ExploreSection val={data[0]} />
            ) : data[1].length > 0 && type === "ERC-1155" ? (
              <ExploreSection val={data[1]} />
            ) : (
              <div className="flex items-center justify-center">
                No items found
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home1;
