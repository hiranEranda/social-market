import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function CardsPrice721({ val }) {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  return (
    <div style={{ padding: "0.5em" }}>
      {/* <ToastContainer position="bottom-right" />
      <Response open={open} loading={loading} title={title} message={message} /> */}
      <div className="row ">
        {/* {val.map((val, i) => ( */}
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
          style={{
            width: "280px",
            maxWidth: "280px",
            padding: "0.5em",
          }}
          // key={i}
        >
          <div className="card__item four" style={{ border: "1px solid gray" }}>
            <div className="card_body space-y-5">
              {/* =============== */}
              <div className="creators space-x-10">
                <div className="avatars space-x-3">
                  <Link to="#">
                    <img
                      src={`/images/avatar.png`}
                      alt="Avatar"
                      className="avatar avatar-sm"
                    />
                  </Link>
                  <Link to={`#`}>
                    <p className="avatars_name txt_xs">
                      {val.sellerUsername.length > 10
                        ? `@${val.sellerUsername.substring(0, 10)}....`
                        : `@${val.sellerUsername}....`}
                    </p>
                  </Link>
                </div>
              </div>

              <div className="card_head">
                <Link to={`#`}>
                  <img
                    style={{ width: "20", max: "80" }}
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
                    <p className="txt_sm"> 1 in stock</p>
                  </div>
                  <Link to="#">
                    <p className="txt_sm">
                      Price:
                      <span
                        className="color_green
                                                  txt_sm"
                      >
                        5 ETH
                      </span>
                    </p>
                  </Link>
                </div>
                <div className="hr" />
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
                                  className="creator_item creator_card space-x-10"
                                >
                                  {val[0].history.state === true ? (
                                    <div
                                      key={i}
                                      className="creator_item creator_card space-x-10"
                                    >
                                      <div className="avatars space-x-10">
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
                    // onClick={async () => {
                    //   const user = await Moralis.User.current();
                    //   if (!user) {
                    //     navigate("/connect-wallet");
                    //   } else {
                    //     setOpen(true);
                    //     setTitle("Buy Item");
                    //     setMessage("Sign the transaction to buy item");
                    //     let res = await contract.buyItem(val, authenticate);
                    //     if (res.status) {
                    //       setLoading(false);
                    //       bought(res.message);

                    //       setTimeout(() => {
                    //         setOpen(false);
                    //         setLoading(true);
                    //         navigate("/profile");
                    //       }, 1000);
                    //     } else {
                    //       setOpen(false);
                    //       setLoading(true);
                    //       boughtError(res.message);
                    //     }
                    //   }
                    // }}
                    className="btn btn-sm btn-white"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default CardsPrice721;
