import React, { useRef, useState, useEffect } from "react";

import "reactjs-popup/dist/index.css";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useMoralis } from "react-moralis";
import CardsCreated from "../../components/cards/CardsCreated";
import CardsOwned721 from "../../components/cards/CardsOwned721";

const Moralis = require("moralis-v1");

function Bought({ isMultiple }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isInitialized } = useMoralis();

  const getData = async () => {
    setLoading(true);
    // //console.log("getting data");
    const user = await Moralis.User.current();

    const params = {
      ethAddress: user.get("ethAddress").toString().toLowerCase(),
    };

    try {
      let prefix = "https://gateway.moralisipfs.com/ipfs/";
      let data = [];

      const result1 = await Moralis.Cloud.run("SM_getUserBoughtItems", params);

      const data1 = await Promise.all(
        result1.map(async (item) => {
          if (item) {
            let uri = prefix + item.uri.substring(34, item.uri.length);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            return { ...item, ...result.data };
          }
        })
      );
      //   console.log(data1);

      const result2 = await Moralis.Cloud.run(
        "SM_getUserBoughtItems1155",
        params
      );
      const data2 = await Promise.all(
        result2.map(async (item) => {
          if (item) {
            let uri = prefix + item.uri.substring(34, item.uri.length);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            return { ...item, ...result.data };
          }
        })
      );
      //   console.log(data1);

      data.push(data1);
      data.push(data2);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      // //console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (isInitialized) {
      getData().then((data) => {
        console.log(data);
        setData(data);
      });
    }
  }, [isInitialized]);

  return (
    <div>
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
        <div>No Items bought yet....</div>
      ) : (
        // <div>data fetched</div>

        <>
          {isMultiple ? (
            <div className="grid gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1350px] ">
              {data[1].map((val, i) => (
                <CardsOwned721 val={val} isMultiple={isMultiple} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1350px] ">
              {data[0].map((val, i) => (
                <CardsOwned721 val={val} isMultiple={isMultiple} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Bought;
