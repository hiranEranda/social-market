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
      <div className="row ">
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
          style={{
            width: "280px",
            maxWidth: "280px",
            padding: "0.5em",
          }}
        >
          <div className="card__item four" style={{ border: "1px solid gray" }}>
            <div className="space-y-5 card_body">
              {/* =============== */}
              <div className="space-x-10 creators">
                <div className="space-x-3 avatars">
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
                <Link to={`/view-item`}>
                  <img
                    style={{ width: "20", max: "80" }}
                    src={`${val.image}`}
                    alt={"nftImage"}
                  />
                </Link>
              </div>
              {/* =============== */}
              <h6 className="card_title">{val.name}</h6>
              <div className="space-y-10 card_footer d-block">
                <div className="card_footer justify-content-between">
                  <div className="creators">
                    <p className="txt_sm"> 1 in stock</p>
                  </div>
                  <Link to="#">
                    <p className="txt_sm">
                      Price:
                      <span className="color_green txt_sm">5 ETH</span>
                    </p>
                  </Link>
                </div>
                <div className="hr" />
                <div className="space-x-10 d-flex align-items-center justify-content-between">
                  <div className="space-x-5 d-flex align-items-center">
                    <i className="ri-history-line" />
                  </div>
                  <button className="btn btn-sm btn-white">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsPrice721;
