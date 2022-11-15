import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "reactjs-popup/dist/index.css";
import lazyMint721 from "../../contract/functions/erc721/lazymint";
import lazyMint1155 from "../../contract/functions/erc1155/lazymint";
import Response from "./Response";

const Moralis = require("moralis-v1");

function CardsMint721({ val, isMultiple }) {
  const bought = (msg) => toast.success(msg);
  const boughtError = (msg) => toast.error(msg);
  let navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  // console.log(val);
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: "260px",
      }}
      // key={i}
    >
      <div className="card__item four" style={{ border: "1px solid gray" }}>
        <div className="space-y-10 card_body">
          {/* =============== */}
          <div className="space-x-10 creators">
            <div className="space-x-3 avatars">
              <Link to="#">
                <img
                  // src={`/images/avatar.png`}
                  src={
                    val === undefined ||
                    !val.ownerObject.attributes.avatar ||
                    val.ownerObject.attributes.avatar === undefined ||
                    val.ownerObject.attributes.avatar === null
                      ? `/images/avatar.png`
                      : val.ownerObject.attributes.avatar._url
                  }
                  alt="Avatar"
                  className="avatar avatar-sm"
                />
              </Link>
              <Link
                to={
                  val === undefined || !val.ownerObject.attributes
                    ? `#`
                    : `/profile/${val.ownerObject.attributes.ethAddress}`
                }
              >
                {/* {console.log(val)} */}
                <p className="avatars_name txt_xs">
                  {val === undefined ||
                  val === null ||
                  val.ownerObject.attributes.username === undefined ||
                  val.ownerObject.attributes.username === null
                    ? "Loading.."
                    : val.ownerObject.attributes.username.length > 10
                    ? `@${val.ownerObject.attributes.username.substring(0, 10)}....`
                    : `@${val.ownerObject.attributes.username}`}
                </p>
              </Link>
            </div>
          </div>
          <div className="card_head">
            {isMultiple ? (
              <Link to={`/view-item/lazy1155/${val.id}`}>
                <img className="object-contain w-10 h-80" src={`${val.image}`} alt={"nftImage"} />
              </Link>
            ) : (
              // <Link to={`#`}>
              <Link to={`/view-item/lazy721/${val.id}`}>
                <img className="object-contain w-10 h-80" src={`${val.image}`} alt={"nftImage"} />
              </Link>
            )}
          </div>
          {/* =============== */}
          <div className="card_footer justify-content-between">
            <div className="creators">
              <p className="text-sm card_title">
                {val.name.length > 10 ? `${val.name.substring(0, 15)}....` : `${val.name}`}
              </p>
            </div>
            <div className="creators">
              {isMultiple ? <p className="txt_sm"> {val.amount} in stock</p> : <p className="txt_sm"> 1 in stock</p>}
            </div>
          </div>

          <div className="space-y-10 card_footer d-block">
            <div className="card_footer justify-content-between">
              <div className="creators">
                <p className="txt_sm">
                  {/* {console.log(val)} */}
                  Price:
                  <span className="color_green txt_sm">
                    {Moralis.Units.FromWei(val.askingPrice, 18)} {val.isCustomToken ? "SMKT" : "ETH"}
                  </span>
                </p>
              </div>

              {val.isCustomToken ? (
                <img className="w-[20px] mr-2" src="/images/smkt.jpeg" alt="" />
              ) : (
                <FaEthereum size={20} />
              )}
            </div>
            <div className="hr" />
            <div className="space-x-10 d-flex align-items-center justify-content-between">
              <div className="space-x-5 d-flex align-items-center">
                <i className="ri-history-line" />
                {/* <Popup
                        className="custom"
                        trigger={
                          <button className="popup_btn">
                            <p
                              className="color_text txt_sm view_history"
                              style={{ width: "auto" }}
                            >
                              View History
                            </p>
                          </button>
                        }
                        position="bottom center"
                      >
                        <div>
                          <div
                            className="popup"
                            id="popup_bid"
                            tabIndex={-1}
                            role="dialog"
                            aria-hidden="true"
                          >
                            <div>
                              <button
                                type="button"
                                className="button close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={closeTooltip}
                              >
                                <span aria-hidden="true">×</span>
                              </button>
                              <div className="space-y-20">
                                <h4> History </h4>
                                <div
                                  style={{
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                    maxHeight: "300px",
                                  }}
                                  className="space-x-10 creator_item creator_card"
                                >
                                  {val[0].history.state === true ? (
                                    <div
                                      key={i}
                                      className="space-x-10 creator_item creator_card"
                                    >
                                      <div className="space-x-10 avatars">
                                        <div className="media">
                                          <div className="badge">
                                            <img
                                              src="/img/icons/Badge.svg"
                                              alt="ImgPreview"
                                            />
                                          </div>
                                          <Link
                                            to={`/ExternalProfile/${val.history.data[0].buyerEthAddress}`}

                                            // to="#"
                                          >
                                            <img
                                              src={
                                                val.history.data[0]
                                                  .buyerAvatar !== null &&
                                                val.history.data[0]
                                                  .buyerAvatar !== undefined
                                                  ? val.history.data[0]
                                                      .buyerAvatar._url
                                                  : `/img/avatars/avatar_8.png`
                                              }
                                              alt="Avatar"
                                              className="avatar avatar-md"
                                            />
                                          </Link>
                                        </div>
                                        <div>
                                          <p className="color_black">
                                            <Link
                                              className="color_black txt _bold"
                                              to={`/ExternalProfile/${val.history.data[0].buyerEthAddress}`}
                                            >
                                              {
                                                val.history.data[0]
                                                  .buyerUsername
                                              }
                                            </Link>
                                          </p>
                                          Bought At:5 ETH
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="d-flex justify-content-center">
                                      <div>{val.history.data}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popup> */}
              </div>
              <button
                onClick={async () => {
                  const user = await Moralis.User.current();
                  if (!user) {
                    alert("connect wallet");
                  } else {
                    if (!isMultiple) {
                      setOpen(true);
                      setTitle("Mint Item");
                      setMessage("Sign the transaction to mint item");

                      let res = await lazyMint721(
                        val.uri,
                        val.tokenAddress,
                        val.askingPrice,
                        val.id,
                        val.owner,
                        val.isCustomToken
                      );
                      if (res.state) {
                        setLoading(false);
                        bought(res.message);

                        setTimeout(() => {
                          setOpen(false);
                          setLoading(true);
                          navigate("/profile");
                        }, 1000);
                      } else {
                        setOpen(false);
                        setLoading(true);
                        boughtError(res.message);
                      }
                    } else {
                      let res = await lazyMint1155(
                        val.uri,
                        val.tokenAddress,
                        val.askingPrice,
                        val.id,
                        val.owner,
                        val.isCustomToken
                      );
                      if (res.state) {
                        setLoading(false);
                        bought(res.message);

                        setTimeout(() => {
                          setOpen(false);
                          setLoading(true);
                          navigate("/profile");
                        }, 1000);
                      } else {
                        setOpen(false);
                        setLoading(true);
                        boughtError(res.message);
                      }
                    }
                  }
                }}
                className="btn btn-sm btn-white"
              >
                Mint Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Response open={open} loading={loading} title={title} message={message} />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
export default CardsMint721;
