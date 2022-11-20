import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "reactjs-popup/dist/index.css";
import TextError from "../errors/TextError";
import Tooltip from "@mui/material/Tooltip";
import Response1 from "./Response1";
import { FaEthereum } from "react-icons/fa";

const Moralis = require("moralis-v1");
const contract721 = require("../../contract/functions/erc721/contract");
const contract1155 = require("../../contract/functions/erc1155/contract");

function CardsOwned721({ val, isMultiple, isExternal, type }) {
  let tooltip = "Here type the tooltip message";

  const added = (msg) => toast.success(msg);
  const mining = (msg) => toast.success(msg);
  const addedError = (msg) => toast.error(msg);

  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handle721 = async (values, item) => {
    setOpen(true);
    try {
      await contract721.ensureMarketplaceIsApproved(parseInt(item.tokenId), item.tokenAddress);
      setLoading1(false);
      let res = await contract721.addItemToMarket(
        parseInt(item.tokenId),
        Moralis.Units.ETH(values.price),
        item.category,
        item.uri,
        item.tokenAddress
      );
      if (res.status) {
        setLoading2(false);
        setTimeout(() => {
          setOpen(false);
          setLoading2(true);
          setLoading1(true);
          window.location.reload();
        }, 1000);

        mining("Transaction is mined");
        added("Item added to market");
      } else {
        setOpen(false);
        setLoading2(true);
        setLoading1(true);

        addedError(res.message);
      }
    } catch (error) {
      addedError(error.message);
    }
  };

  const handle1155 = async (values, item) => {
    console.log("1155");
    setOpen(true);

    await contract1155.ensureMarketplaceIsApproved(item.tokenAddress);
    setLoading1(false);

    // const query1 = new Moralis.Query("Creator");
    // query1.equalTo("tokenId", parseInt(props.data.tokenId));
    // query1.equalTo("tokenAddress", props.data.tokenAddress.toLowerCase());
    // query1.equalTo("ethAddress", props.data.owner.toLowerCase());
    // const obj = await query1.first();
    // obj.set("royalty", parseInt(values.royalty));
    // await obj.save();
    const res = await contract1155.addItemToMarket(
      item.tokenId,
      Moralis.Units.ETH(values.price),
      item.uri,
      "1",
      item.tokenAddress
    );
    // const receipt = res.wait(2);
    if (res.status === 1) {
      added("Item successfully added to market");
      setLoading2(false);
      setTimeout(() => {
        setOpen(false);

        setLoading2(true);
        setLoading1(true);
      }, 1000);

      window.location.reload();
    } else {
      setOpen(false);
      setLoading1(true);

      setLoading2(true);
      addedError("Item adding failed!");
    }
  };

  const initialValues = {
    price: "",
  };

  const validationSchema = Yup.object({
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required")
      .test("Is positive?", "value must be greater than 0!", (value) => value > 0),
  });
  return (
    <div>
      <ToastContainer position="bottom-right" />

      <div
        className="mx-auto"
        style={{
          // width: "260px",
          maxWidth: "280px",
          // padding: "0.5em",
        }}
        // key={i}
      >
        <div className="card__item four" style={{ border: "1px solid gray" }}>
          <div className="space-y-10 card_body">
            {/* =============== */}
            <div className="space-x-10 creators">
              {/* <div className="space-x-3 avatars">
                    <Link
                      to={{
                        pathname: "/ExternalProfile",
                        state: {
                          ethAddress: val.ownerOf,
                        },
                      }}
                    >
                      <img
                        src={
                          !val.avatar ||
                          val.avatar === undefined ||
                          val.avatar === null
                            ? `/img/avatars/avatar_8.png`
                            : val.avatar._url
                        }
                        alt="Avatar"
                        className="avatar avatar-sm"
                      />
                    </Link>
                    <Link
                      to={{
                        pathname: "/ExternalProfile",
                        state: {
                          ethAddress: val.ownerOf,
                        },
                      }}
                    >
                      <p className="avatars_name txt_xs">
                        {val.username.length > 10
                          ? `@${val.username.substring(0, 10)}....`
                          : `@${val.username}....`}
                      </p>
                    </Link>
                  </div> */}
            </div>
            <div className="card_head">
              <Link
                to={
                  isMultiple && type === "bought"
                    ? `/item-info-batch/assets/${val.tokenId}/${val.tokenAddress}/${val.uid}/${false}`
                    : !isMultiple && type === "bought"
                    ? `/item-info/assets/${val.tokenId}/${val.tokenAddress}/${false}/${false}/${true}`
                    : isMultiple && type === "minted"
                    ? `/item-info-batch/assets/${val.tokenId}/${val.tokenAddress}/${val.uid}/${true}`
                    : !isMultiple && type === "minted"
                    ? `/item-info/assets/${val.tokenId}/${val.tokenAddress}/${true}/${false}/${false}`
                    : null
                }
              >
                <img width="10" height="80" src={`${val.image}`} alt={"nftImage"} />
              </Link>
            </div>
            {/* =============== */}
            <h6 className="card_title">{val.name}</h6>
            {isExternal ? null : (
              <>
                <div className="space-y-10 card_footer d-block ">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      if (isMultiple) {
                        console.log(isMultiple);
                        handle1155(values, val);
                      } else {
                        console.log("721");
                        handle721(values, val);
                      }
                    }}
                  >
                    <Form className="">
                      <div className="space-y-10 form-group ">
                        {console.log(val.isCustomToken)}
                        <div className="space-y-10 ">
                          <span className="nameInput">List Price</span>
                          <Tooltip title={tooltip}>
                            <i className="float-right ri-information-line d-flex"></i>
                          </Tooltip>

                          <div className="d-flex align-items-center">
                            {val.isCustomToken ? (
                              <img className="w-[20px] mr-2" src="/images/smkt.jpeg" alt="" />
                            ) : (
                              <FaEthereum size={20} />
                            )}

                            <Field
                              name="price"
                              type="number"
                              className="ml-auto form-control"
                              placeholder="Enter price`"
                            />
                          </div>
                          <ErrorMessage name="price" component={TextError} />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-sm btn-primary float-end ">
                        Add Item to Market
                      </button>
                    </Form>
                  </Formik>
                </div>
              </>
            )}

            <Response1 open={open} loading1={loading1} loading2={loading2} isRemoved={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsOwned721;
