import React from "react";

import "reactjs-popup/dist/index.css";

function CardsCreated({ val }) {
  return (
    <div
      className="mx-auto"
      style={{
        // width: "260px",
        maxWidth: "260px",
        // padding: "0.5em",
      }}
      // key={i}
    >
      <div className="card__item four" style={{ border: "1px solid gray" }}>
        <div className="space-y-10 card_body">
          {/* =============== */}
          <div className="space-x-10 creators">
            <div className="space-x-3 avatars"></div>
            <div className="space-x-3 avatars"></div>
          </div>
          <div className="card_head">
            <img width="10" height="80" src={`${val.image}`} alt={"nftImage"} />
          </div>
          {/* =============== */}
          <div className="space-y-10 card_footer d-block">
            <div className="card_footer justify-content-between">
              <p className="txt_sm">
                Name:
                <span className="txt_sm">
                  {val.nftName.length > 10
                    ? `${val.nftName.substring(0, 15)}....`
                    : `${val.nftName}`}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="space-y-10 card_footer d-block">
            <div className="card_footer justify-content-between">
              <p className="txt_sm">
                Description:
                <span className="txt_sm">
                  {val.description.length > 10
                    ? `${val.description.substring(0, 15)}....`
                    : `${val.description}`}
                </span>
              </p>
            </div>
          </div> */}
          <div className="space-y-10 card_footer d-block">
            <div className="card_footer justify-content-between">
              <p className="txt_sm">
                Contract Type:
                <span className="txt_sm"> {val.contractType}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsCreated;
