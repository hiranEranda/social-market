import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

import "reactjs-popup/dist/index.css";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

import CardsOwned721 from "../../components/cards/CardsOwned721";

const Moralis = require("moralis-v1");

function Owned({ isMultiple }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isInitialized } = useMoralis();

  function fromBinary(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  }

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

      const result1 = await Moralis.Cloud.run("SM_getUserCreatedItems1155", params);

      const data1 = await Promise.all(
        result1.map(async (item) => {
          if (item) {
            let uri = prefix + item.attributes.uri.substring(34, item.attributes.uri.length);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            let decoded_name = fromBinary(result.data.name);
            let decoded_description = fromBinary(result.data.description);
            result.data.name = decoded_name;
            result.data.description = decoded_description;
            return { ...item.attributes, ...result.data };
          }
        })
      );

      const result = await Moralis.Cloud.run("SM_getUserCreatedItems721", params);
      // console.log(result);
      const data2 = await Promise.all(
        result.map(async (item) => {
          if (item) {
            let uri = prefix + item.attributes.uri.substring(34, item.attributes.uri.length);
            // const result = await fetch(uri);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            let decoded_name = fromBinary(result.data.name);
            let decoded_description = fromBinary(result.data.description);
            result.data.name = decoded_name;
            result.data.description = decoded_description;
            // return { ...item.attributes, ...(await result.json()) };
            return { ...item.attributes, ...result.data };
          }
        })
      );

      //console.log(data2);
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
    <>
      {loading ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (!loading && data === null) || data === undefined ? (
        <div>Check your connectivity</div>
      ) : !loading && data.length === 0 ? (
        <div>No Items yet</div>
      ) : (
        <>
          {isMultiple ? (
            <>
              <div className="grid gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1350px] ">
                {data[0].map((val, i) => (
                  <CardsOwned721 key={i} val={val} isMultiple={isMultiple} isExternal={false} type={"minted"} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1350px] ">
                {data[1].map((val, i) => (
                  <CardsOwned721 key={i} val={val} isMultiple={isMultiple} isExternal={false} type={"minted"} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Owned;
