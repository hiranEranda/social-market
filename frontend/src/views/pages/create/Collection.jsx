import React from "react";
import { useMoralis } from "react-moralis";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import FormDialog from "./deploy";

const Moralis = require("moralis-v1");

function Collection(props) {
  const [st, setSt] = React.useState(false);
  const [id, setId] = React.useState(-1);

  const { isInitialized, isAuthenticated, user } = useMoralis();

  const [collectionAddress, setCollectionAddress] = React.useState(null);
  const [items, setItems] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);

  const handler = (itemId) => {
    setId((currentItem) => (currentItem === -1 ? itemId : -1)); // toggle between -1 and itemPressed to make active state taggable
  };

  const getContracts = async () => {
    setLoading(true);
    const user = await Moralis.User.current();

    const query = new Moralis.Query("ContractOwners");
    query.equalTo("userAddress", user.get("ethAddress").toLowerCase());
    if (!props.value.flag) {
      query.equalTo("collectionType", "erc721");
      //  //console.log("erc721 contracts");
    } else {
      //  //console.log("erc1155 contracts");
      query.equalTo("collectionType", "erc1155");
    }
    try {
      const data = await query.find();
      setLoading(false);
      return data;
    } catch (error) {}
    return null;
  };

  React.useEffect(() => {
    if (isInitialized && isAuthenticated) {
      setBackDrop(false);
      getContracts().then((data) => {
        console.log(data);
        setItems(data);
        // setLoading(false);
      });
    }
  }, [isInitialized, isAuthenticated]);

  return (
    <div className="mt-3 space-y-10">
      <span className="variationInput">Choose collection</span>

      <div
        className="pt-1 pb-1 d-flex flex-column flex-md-row"
        style={{ overflowY: "hidden", overflowX: "auto" }}
      >
        <FormDialog isBatch={props.value.flag} />

        <a
          type="button"
          style={{
            height: 54,
            maxHeight: 54,
            minHeight: 54,
            width: 200,
            minWidth: 200,
          }}
          className={
            st
              ? "choose_collection mb-10 mb-md-0  mr-md-3 border border-success mr-3"
              : "choose_collection mb-10 mb-md-0  mr-md-3 is_brand mr-3"
          }
          onClick={() => {
            if (!props.value.flag) {
              setCollectionAddress(
                process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721
              );
              // console.log(
              //   process.env
              //     .REACT_APP_TOKEN_CONTRACT_ADDRESS_721
              // );
            } else {
              setCollectionAddress(
                process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_1155
              );
              // console.log(
              //   process.env
              //     .REACT_APP_TOKEN_CONTRACT_ADDRESS_1155
              // );
            }

            setSt(true);
            setId(-1);
          }}
        >
          <img className="w-[30px] mr-2" src="/images/fire.gif" alt="" />
          SMKT Collection
        </a>
        {!loading && items !== undefined ? (
          items.map((val, i) => (
            <div key={i}>
              <a
                style={{
                  height: 54,
                  maxHeight: 54,
                  minHeight: 54,
                  width: 200,
                  minWidth: 200,
                }}
                type="button"
                className={
                  id === i
                    ? "choose_collection mb-10 mb-md-0  mr-md-3 border border-success mr-3"
                    : "choose_collection mb-10 mb-md-0  mr-md-3 is_brand mr-3"
                }
                onClick={() => {
                  handler(i);
                  setCollectionAddress(val.attributes.collectionAddress);
                  setId(i);
                  setSt(false);
                  // console.log(
                  //   val.attributes.collectionAddress
                  // );
                }}
              >
                <img
                  style={{
                    height: 30,
                    maxHeight: 30,
                    minHeight: 30,
                    width: 30,
                    minWidth: 30,
                    maxWidth: 30,
                  }}
                  src={val.attributes.Avatar}
                  alt="avtr"
                />{" "}
                {val.attributes.name}
              </a>
            </div>
          ))
        ) : (
          // <LinearColor />
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </div>
  );
}

export default Collection;
