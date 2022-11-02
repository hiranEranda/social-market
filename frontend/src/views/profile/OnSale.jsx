import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "reactjs-popup/dist/index.css";
import { useMoralis } from "react-moralis";
import CardsPrice721 from "../../components/cards/CardsPrice721";

const Moralis = require("moralis-v1");

function OnSale({ isMultiple }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isInitialized } = useMoralis();

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
      {loading ? //   <CircularProgress color="inherit" /> // > //   open //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} // <Backdrop
      // </Backdrop>
      null : (!loading && data === null) || data === undefined ? (
        <div>Check your connectivity</div>
      ) : !loading && data.length === 0 ? (
        <div>No Items yet</div>
      ) : (
        <>
          {isMultiple ? (
            //       <div className="grid gap-4 mx-auto  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1350px] ">
            //         {data[1].map((val, i) => (
            //           <div
            //             className="mx-auto"
            //             style={{
            //               // width: "260px",
            //               maxWidth: "260px",
            //               // padding: "0.5em",
            //             }}
            //             key={i}
            //           >
            //             <div
            //               className="card__item four"
            //               style={{ border: "1px solid gray" }}
            //             >
            //               <div className="space-y-10 card_body">
            //                 {/* =============== */}
            //                 <div className="space-x-10 creators">
            //                   <div className="space-x-3 avatars">
            //                     <Link to="#">
            //                       <img
            //                         // src={`/images/avatar.png`}
            //                         src={
            //                           !val.sellerAvatar ||
            //                           val.sellerAvatar === undefined ||
            //                           val.sellerAvatar === null
            //                             ? `/images/avatar.png`
            //                             : val.sellerAvatar._url
            //                         }
            //                         alt="Avatar"
            //                         className="avatar avatar-sm"
            //                       />
            //                     </Link>
            //                     <Link to={`#`}>
            //                       <p className="avatars_name txt_xs">
            //                         {val.sellerUsername.length > 10
            //                           ? `@${val.sellerUsername.substring(0, 10)}....`
            //                           : `@${val.sellerUsername}....`}
            //                       </p>
            //                     </Link>
            //                   </div>
            //                 </div>
            //                 <div className="card_head">
            //                   {isMultiple ? (
            //                     <Link
            //                       to={`/view-item/${val.tokenAddress}/${val.tokenId}/${val.uid}`}
            //                     >
            //                       <img
            //                         width="10"
            //                         height="80"
            //                         src={`${val.image}`}
            //                         alt={"nftImage"}
            //                       />
            //                     </Link>
            //                   ) : (
            //                     <Link
            //                       to={`/view-item/${val.tokenAddress}/${val.tokenId}`}
            //                     >
            //                       <img
            //                         width="10"
            //                         height="80"
            //                         src={`${val.image}`}
            //                         alt={"nftImage"}
            //                       />
            //                     </Link>
            //                   )}
            //                 </div>
            //                 {/* =============== */}
            //                 <h6 className="card_title">{val.name}</h6>

            //                 <div className="space-y-10 card_footer d-block">
            //                   <div className="card_footer justify-content-between">
            //                     <div className="creators">
            //                       {isMultiple ? (
            //                         <p className="txt_sm"> {val.amount} in stock</p>
            //                       ) : (
            //                         <p className="txt_sm"> 1 in stock</p>
            //                       )}
            //                     </div>
            //                     <Link to="#">
            //                       <p className="txt_sm">
            //                         Price:
            //                         <span className="color_green txt_sm">
            //                           {Moralis.Units.FromWei(val.askingPrice, 18)} ETH
            //                         </span>
            //                       </p>
            //                     </Link>
            //                   </div>
            //                   <div className="hr" />
            //                   <div className="space-x-10 d-flex align-items-center justify-content-between">
            //                     <div className="space-x-5 d-flex align-items-center">
            //                       <i className="ri-history-line" />
            //                       {/* <Popup
            //                   className="custom"
            //                   trigger={
            //                     <button className="popup_btn">
            //                       <p
            //                         className="color_text txt_sm view_history"
            //                         style={{ width: "auto" }}
            //                       >
            //                         View History
            //                       </p>
            //                     </button>
            //                   }
            //                   position="bottom center"
            //                 >
            //                   <div>
            //                     <div
            //                       className="popup"
            //                       id="popup_bid"
            //                       tabIndex={-1}
            //                       role="dialog"
            //                       aria-hidden="true"
            //                     >
            //                       <div>
            //                         <button
            //                           type="button"
            //                           className="button close"
            //                           data-dismiss="modal"
            //                           aria-label="Close"
            //                           onClick={closeTooltip}
            //                         >
            //                           <span aria-hidden="true">×</span>
            //                         </button>
            //                         <div className="space-y-20">
            //                           <h4> History </h4>
            //                           <div
            //                             style={{
            //                               overflowY: "auto",
            //                               overflowX: "hidden",
            //                               maxHeight: "300px",
            //                             }}
            //                             className="space-x-10 creator_item creator_card"
            //                           >
            //                             {val[0].history.state === true ? (
            //                               <div
            //                                 key={i}
            //                                 className="space-x-10 creator_item creator_card"
            //                               >
            //                                 <div className="space-x-10 avatars">
            //                                   <div className="media">
            //                                     <div className="badge">
            //                                       <img
            //                                         src="/img/icons/Badge.svg"
            //                                         alt="ImgPreview"
            //                                       />
            //                                     </div>
            //                                     <Link
            //                                       to={`/ExternalProfile/${val.history.data[0].buyerEthAddress}`}

            //                                       // to="#"
            //                                     >
            //                                       <img
            //                                         src={
            //                                           val.history.data[0]
            //                                             .buyerAvatar !== null &&
            //                                           val.history.data[0]
            //                                             .buyerAvatar !== undefined
            //                                             ? val.history.data[0]
            //                                                 .buyerAvatar._url
            //                                             : `/img/avatars/avatar_8.png`
            //                                         }
            //                                         alt="Avatar"
            //                                         className="avatar avatar-md"
            //                                       />
            //                                     </Link>
            //                                   </div>
            //                                   <div>
            //                                     <p className="color_black">
            //                                       <Link
            //                                         className="color_black txt _bold"
            //                                         to={`/ExternalProfile/${val.history.data[0].buyerEthAddress}`}
            //                                       >
            //                                         {
            //                                           val.history.data[0]
            //                                             .buyerUsername
            //                                         }
            //                                       </Link>
            //                                     </p>
            //                                     Bought At:5 ETH
            //                                   </div>
            //                                 </div>
            //                               </div>
            //                             ) : (
            //                               <div className="d-flex justify-content-center">
            //                                 <div>{val.history.data}</div>
            //                               </div>
            //                             )}
            //                           </div>
            //                         </div>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </Popup> */}
            //                     </div>
            //                     <button
            //                       // onClick={async () => {
            //                       //   const user = await Moralis.User.current();
            //                       //   if (!user) {
            //                       //     navigate("/connect-wallet");
            //                       //   } else {
            //                       //     setOpen(true);
            //                       //     setTitle("Buy Item");
            //                       //     setMessage("Sign the transaction to buy item");
            //                       //     let res = await contract.buyItem(val, authenticate);
            //                       //     if (res.status) {
            //                       //       setLoading(false);
            //                       //       bought(res.message);

            //                       //       setTimeout(() => {
            //                       //         setOpen(false);
            //                       //         setLoading(true);
            //                       //         navigate("/profile");
            //                       //       }, 1000);
            //                       //     } else {
            //                       //       setOpen(false);
            //                       //       setLoading(true);
            //                       //       boughtError(res.message);
            //                       //     }
            //                       //   }
            //                       // }}
            //                       className="btn btn-sm btn-white"
            //                     >
            //                       Buy Now
            //                     </button>
            //                   </div>
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         ))}
            //         {/* <ToastContainer position="bottom-right" />
            // <Response open={open} loading={loading} title={title} message={message} /> */}
            //       </div>
            <CardsPrice721 val={data[1]} isMultiple={isMultiple} />
          ) : (
            //       <div className="grid gap-4 mx-auto  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1350px] ">
            //         {data[0].map((val, i) => (
            //           <div
            //             className="mx-auto"
            //             style={{
            //               // width: "260px",
            //               maxWidth: "260px",
            //               // padding: "0.5em",
            //             }}
            //             key={i}
            //           >
            //             <div
            //               className="card__item four"
            //               style={{ border: "1px solid gray" }}
            //             >
            //               <div className="space-y-10 card_body">
            //                 {/* =============== */}
            //                 <div className="space-x-10 creators">
            //                   <div className="space-x-3 avatars">
            //                     <Link to="#">
            //                       <img
            //                         // src={`/images/avatar.png`}
            //                         src={
            //                           !val.sellerAvatar ||
            //                           val.sellerAvatar === undefined ||
            //                           val.sellerAvatar === null
            //                             ? `/images/avatar.png`
            //                             : val.sellerAvatar._url
            //                         }
            //                         alt="Avatar"
            //                         className="avatar avatar-sm"
            //                       />
            //                     </Link>
            //                     <Link to={`#`}>
            //                       <p className="avatars_name txt_xs">
            //                         {val.sellerUsername.length > 10
            //                           ? `@${val.sellerUsername.substring(0, 10)}....`
            //                           : `@${val.sellerUsername}....`}
            //                       </p>
            //                     </Link>
            //                   </div>
            //                 </div>
            //                 <div className="card_head">
            //                   {isMultiple ? (
            //                     <Link
            //                       to={`/view-item/${val.tokenAddress}/${val.tokenId}/${val.uid}`}
            //                     >
            //                       <img
            //                         width="10"
            //                         height="80"
            //                         src={`${val.image}`}
            //                         alt={"nftImage"}
            //                       />
            //                     </Link>
            //                   ) : (
            //                     <Link
            //                       to={`/view-item/${val.tokenAddress}/${val.tokenId}`}
            //                     >
            //                       <img
            //                         width="10"
            //                         height="80"
            //                         src={`${val.image}`}
            //                         alt={"nftImage"}
            //                       />
            //                     </Link>
            //                   )}
            //                 </div>
            //                 {/* =============== */}
            //                 <h6 className="card_title">{val.name}</h6>

            //                 <div className="space-y-10 card_footer d-block">
            //                   <div className="card_footer justify-content-between">
            //                     <div className="creators">
            //                       {isMultiple ? (
            //                         <p className="txt_sm"> {val.amount} in stock</p>
            //                       ) : (
            //                         <p className="txt_sm"> 1 in stock</p>
            //                       )}
            //                     </div>
            //                     <Link to="#">
            //                       <p className="txt_sm">
            //                         Price:
            //                         <span className="color_green txt_sm">
            //                           {Moralis.Units.FromWei(val.askingPrice, 18)} ETH
            //                         </span>
            //                       </p>
            //                     </Link>
            //                   </div>
            //                   <div className="hr" />
            //                   <div className="space-x-10 d-flex align-items-center justify-content-between">
            //                     <div className="space-x-5 d-flex align-items-center">
            //                       <i className="ri-history-line" />
            //                       {/* <Popup
            //                   className="custom"
            //                   trigger={
            //                     <button className="popup_btn">
            //                       <p
            //                         className="color_text txt_sm view_history"
            //                         style={{ width: "auto" }}
            //                       >
            //                         View History
            //                       </p>
            //                     </button>
            //                   }
            //                   position="bottom center"
            //                 >
            //                   <div>
            //                     <div
            //                       className="popup"
            //                       id="popup_bid"
            //                       tabIndex={-1}
            //                       role="dialog"
            //                       aria-hidden="true"
            //                     >
            //                       <div>
            //                         <button
            //                           type="button"
            //                           className="button close"
            //                           data-dismiss="modal"
            //                           aria-label="Close"
            //                           onClick={closeTooltip}
            //                         >
            //                           <span aria-hidden="true">×</span>
            //                         </button>
            //                         <div className="space-y-20">
            //                           <h4> History </h4>
            //                           <div
            //                             style={{
            //                               overflowY: "auto",
            //                               overflowX: "hidden",
            //                               maxHeight: "300px",
            //                             }}
            //                             className="space-x-10 creator_item creator_card"
            //                           >
            //                             {val[0].history.state === true ? (
            //                               <div
            //                                 key={i}
            //                                 className="space-x-10 creator_item creator_card"
            //                               >
            //                                 <div className="space-x-10 avatars">
            //                                   <div className="media">
            //                                     <div className="badge">
            //                                       <img
            //                                         src="/img/icons/Badge.svg"
            //                                         alt="ImgPreview"
            //                                       />
            //                                     </div>
            //                                     <Link
            //                                       to={`/ExternalProfile/${val.history.data[0].buyerEthAddress}`}

            //                                       // to="#"
            //                                     >
            //                                       <img
            //                                         src={
            //                                           val.history.data[0]
            //                                             .buyerAvatar !== null &&
            //                                           val.history.data[0]
            //                                             .buyerAvatar !== undefined
            //                                             ? val.history.data[0]
            //                                                 .buyerAvatar._url
            //                                             : `/img/avatars/avatar_8.png`
            //                                         }
            //                                         alt="Avatar"
            //                                         className="avatar avatar-md"
            //                                       />
            //                                     </Link>
            //                                   </div>
            //                                   <div>
            //                                     <p className="color_black">
            //                                       <Link
            //                                         className="color_black txt _bold"
            //                                         to={`/ExternalProfile/${val.history.data[0].buyerEthAddress}`}
            //                                       >
            //                                         {
            //                                           val.history.data[0]
            //                                             .buyerUsername
            //                                         }
            //                                       </Link>
            //                                     </p>
            //                                     Bought At:5 ETH
            //                                   </div>
            //                                 </div>
            //                               </div>
            //                             ) : (
            //                               <div className="d-flex justify-content-center">
            //                                 <div>{val.history.data}</div>
            //                               </div>
            //                             )}
            //                           </div>
            //                         </div>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </Popup> */}
            //                     </div>
            //                     <button
            //                       // onClick={async () => {
            //                       //   const user = await Moralis.User.current();
            //                       //   if (!user) {
            //                       //     navigate("/connect-wallet");
            //                       //   } else {
            //                       //     setOpen(true);
            //                       //     setTitle("Buy Item");
            //                       //     setMessage("Sign the transaction to buy item");
            //                       //     let res = await contract.buyItem(val, authenticate);
            //                       //     if (res.status) {
            //                       //       setLoading(false);
            //                       //       bought(res.message);

            //                       //       setTimeout(() => {
            //                       //         setOpen(false);
            //                       //         setLoading(true);
            //                       //         navigate("/profile");
            //                       //       }, 1000);
            //                       //     } else {
            //                       //       setOpen(false);
            //                       //       setLoading(true);
            //                       //       boughtError(res.message);
            //                       //     }
            //                       //   }
            //                       // }}
            //                       className="btn btn-sm btn-white"
            //                     >
            //                       Buy Now
            //                     </button>
            //                   </div>
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         ))}
            //         {/* <ToastContainer position="bottom-right" />
            // <Response open={open} loading={loading} title={title} message={message} /> */}
            //       </div>
            <CardsPrice721 val={data[0]} isMultiple={isMultiple} />
          )}
        </>
      )}
    </>
  );
}

export default OnSale;
