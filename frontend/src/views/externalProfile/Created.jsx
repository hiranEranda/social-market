import React, { useRef, useState, useEffect } from "react";

import "reactjs-popup/dist/index.css";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";

import CardsCreated from "../../components/cards/CardsCreated";

const Moralis = require("moralis-v1");

function Created({ isMultiple }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isInitialized } = useMoralis();

  let { ethAddress } = useParams();

  const getData = async () => {
    setLoading(true);
    // //console.log("getting data");
    const user = await Moralis.User.current();

    const params = {
      ethAddress: ethAddress.toString().toLowerCase(),
    };

    try {
      const data = await Moralis.Cloud.run("SM_getUserDesignedItems", params);
      console.log(data);

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
        // //console.log(data);
        setData(data);
      });
    }
  }, [isInitialized]);

  return (
    <div>
      {loading ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (!loading && data === null) || data === undefined ? (
        <div>Check your connectivity</div>
      ) : !loading && data.length === 0 ? (
        <div>No Items added yet....</div>
      ) : (
        <>
          {isMultiple ? (
            <div className="grid gap-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1350px] ">
              {data
                .filter(function (item) {
                  return item.contractType === "erc1155";
                })
                .map((val, i) => (
                  <CardsCreated val={val} isMultiple={isMultiple} />
                ))}
            </div>
          ) : (
            <div className="grid gap-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1350px] ">
              {data
                .filter(function (item) {
                  return item.contractType === "erc721";
                })
                .map((val, i) => (
                  <CardsCreated key={i} val={val} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Created;
