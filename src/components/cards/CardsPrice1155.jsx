import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "reactjs-popup/dist/index.css";
import Response from "./Response";
import { useMoralis } from "react-moralis";
const Moralis = require("moralis");
const contract = require("../../../contract/functions/erc1155/contract");

function CardsPrice1155(props) {
  const bought = (msg) => toast.success(msg);
  const boughtError = (msg) => toast.error(msg);
  const { authenticate } = useMoralis();
  let navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Response open={open} loading={loading} title={title} message={message} />
      <div className="row mb-30_reset">
        {props.val.map((val, i) => (
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
            style={{ width: "350px", maxWidth: "350px" }}
            key={i}
          >
            <div className="card__item four">
              <div className="card_body space-y-10">
                {/* =============== */}
                <div className="creators space-x-10">
                  <div className="avatars space-x-3">
                    <Link to={`/ExternalProfile/${val.ownerOf}`}>
                      <img
                        src={
                          val.sellerAvatar !== null &&
                          val.sellerAvatar !== undefined
                            ? val.sellerAvatar._url
                            : `/images/avatar.png`
                        }
                        alt="Avatar"
                        className="avatar avatar-sm"
                      />
                    </Link>
                    <Link to={`/ExternalProfile/${val.ownerOf}`}>
                      <p className="avatars_name txt_xs">
                        {val.sellerUsername.length > 10
                          ? `@${val.sellerUsername.substring(0, 10)}....`
                          : `@${val.sellerUsername}....`}
                      </p>
                    </Link>
                  </div>

                  {/* <div className="avatars space-x-3">
                    <Link
                      to={{
                        pathname: "/ExternalProfile",
                        state: {
                          ethAddress: val.ownerOf,
                        },
                      }}
                    >
                      <img
                        src={`/img/avatars/avatar_11.png`}
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
                        {val.sellerUsername.length > 10
                          ? `@${val.sellerUsername.substring(0, 10)}....`
                          : `@${val.sellerUsername}....`}
                      </p>
                    </Link>
                  </div> */}
                </div>
                <div className="card_head">
                  <Link
                    to={`/Item-details-batch/assets/${val.tokenId}/${val.tokenAddress}/${val.uid}`}
                  >
                    <img
                      width="10"
                      height="80"
                      src={`${val.image}`}
                      alt={"nftImage"}
                    />
                  </Link>
                </div>
                {/* =============== */}
                <h6 className="card_title">{val.name}</h6>

                <div className="card_footer d-block space-y-10">
                  <div className="card_footer justify-content-between">
                    <div className="creators">
                      <p className="txt_sm"> {val.amount} in stock</p>
                    </div>
                    <Link to="#">
                      <p className="txt_sm">
                        Price:
                        <span
                          className="color_green
                                                  txt_sm"
                        >
                          {" "}
                          {Moralis.Units.FromWei(val.askingPrice, 18)} ETH
                        </span>
                      </p>
                    </Link>
                  </div>
                  {/* <div className="hr" />
                  <div
                    className="d-flex
                                  align-items-center
                                  space-x-10
                                  justify-content-between"
                  >
                    <div
                      className="d-flex align-items-center
                                      space-x-5"
                    >
                      <i className="ri-history-line" />
                      <Popup
                        className="custom"
                        ref={ref}
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
                                <div className="creator_item creator_card space-x-10">
                                  <div className="avatars space-x-10">
                                    <div className="media">
                                      <div className="badge">
                                        <img
                                          src={`img/icons/Badge.svg`}
                                          alt="Badge"
                                        />
                                      </div>
                                      <Link
                                        to={{
                                          pathname: "/ExternalProfile",
                                          state: {
                                            ethAddress: val.ownerOf,
                                          },
                                        }}
                                      >
                                        <img
                                          src={`/img/avatars/avatar_1.png`}
                                          alt="Avatar"
                                          className="avatar avatar-md"
                                        />
                                      </Link>
                                    </div>
                                    <div>
                                      <p className="color_black">
                                        Bid accepted
                                        <span className="color_brand">
                                          1 ETH
                                        </span>
                                        by
                                        <Link
                                          className="color_black txt_bold"
                                          to={{
                                            pathname: "/ExternalProfile",
                                            state: {
                                              ethAddress: val.ownerOf,
                                            },
                                          }}
                                        >
                                          ayoub
                                        </Link>
                                      </p>
                                      <span className="date color_text">
                                        28/06/2021, 12:08
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </div>
                    
                  </div> */}
                  <button
                    onClick={async () => {
                      const user = await Moralis.User.current();
                      if (!user) {
                        navigate("/connect-wallet");
                      } else {
                        setOpen(true);
                        setTitle("Buy Item");
                        setMessage("Sign the transaction to buy item");
                        let res = await contract.buyItem(val, authenticate);
                        if (res.status) {
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
                    }}
                    className="btn btn-sm btn-grad"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsPrice1155;
