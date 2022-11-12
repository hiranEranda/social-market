import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "reactjs-popup/dist/index.css";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

import { useMoralis } from "react-moralis";
import CardsPrice721 from "../../components/cards/CardsPrice721";

const Moralis = require("moralis-v1");

function OnSale({ isMultiple }) {
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

      const result = await Moralis.Cloud.run("SM_getUserItems", params);
      //console.log(result);
      const data1 = await Promise.all(
        result.map(async (item) => {
          if (item) {
            let uri =
              prefix + item.tokenUri.substring(34, item.tokenUri.length);
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            let decoded_name = fromBinary(result.data.name);
            let decoded_description = fromBinary(result.data.description);
            result.data.name = decoded_name;
            result.data.description = decoded_description;
            return { ...item, ...result.data };
          }
        })
      );
      const res = await Moralis.Cloud.run("SM_getUserItemsBatch", params);
      const result2 = await Promise.all(
        res.map(async (val, i) => {
          let params = {
            owner: val.ownerOf.toLowerCase(),
            uid: val.uid,
          };
          const res = await Moralis.Cloud.run("SM_getUserDetails", params);
          // //console.log(res);
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
            const result = await Moralis.Cloud.run("FetchJson", {
              url: uri,
            });
            let decoded_name = fromBinary(result.data.name);
            let decoded_description = fromBinary(result.data.description);
            result.data.name = decoded_name;
            result.data.description = decoded_description;
            return { ...item, ...result.data };
          }
        })
      );
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
        //console.log(data);
        setData(data);
      });
    }
  }, [isInitialized]);

  return (
    <>
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
        <>
          {isMultiple ? (
            <>
              <div className="grid gap-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1350px] ">
                {data[1].map((val, i) => (
                  <CardsPrice721 key={i} val={val} isMultiple={isMultiple} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1350px] ">
                {data[0].map((val, i) => (
                  <CardsPrice721 key={i} val={val} isMultiple={isMultiple} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default OnSale;
