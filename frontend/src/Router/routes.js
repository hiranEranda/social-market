import React from "react";

import Home1 from "../views/homes/Home1";
import SingleItem from "../views/pages/SingleItem";
import Profile from "../views/pages/Profile";
import EditProfile from "../views/pages/EditProfile";

// Route Specific
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "../views/pages/create/Create";
import Erc1155 from "../views/pages/create/Erc1155";
import Erc721 from "../views/pages/create/Erc721";
import BatchItem from "../views/pages/BatchItem";
import Collections from "../views/pages/Collections";
import ConnectWallet from "../views/pages/ConnectWallet";
import SingleItemMint from "../views/pages/SingleItemMint";
import BatchItemMint from "../views/pages/BatchItemMint";
import Marketplace from "../views/pages/Marketplace";
import ExternalProfile from "../views/pages/ExternalProfile";
import ItemInfo from "../views/pages/ItemInfo";
import ItemInfoBatch from "../views/pages/ItemInfoBatch";

const ROUTES = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home1 />} />
          <Route path="/view-item/:tokenAddress/:tokenId" element={<SingleItem />} />
          <Route path="/view-item/lazy721/:objectId" element={<SingleItemMint />} />
          <Route path="/view-item/lazy1155/:objectId" element={<BatchItemMint />} />
          <Route path="/view-item/:tokenAddress/:tokenId/:uid" element={<BatchItem />} />
          <Route path="/item-info/assets/:tokenId/:tokenAddress/:created/:removed/:bought" element={<ItemInfo />} />
          <Route path="/item-info-batch/assets/:tokenId/:tokenAddress/:uid/:created" element={<ItemInfoBatch />} />

          <Route path="/profile/:ethAddress" element={<ExternalProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/create" element={<Create />} />
          <Route path="/create/erc-1155" element={<Erc1155 />} />
          <Route path="/create/erc-721" element={<Erc721 />} />

          <Route path="/all-collections" element={<Collections />} />
          <Route path="/marketplace" element={<Marketplace />} />

          <Route path="/connect-wallet" element={<ConnectWallet />} />
          {/* <Route path="/upload-type" element={<UploadType />} />
       
          <Route path="/about-us" element={<AboutUs />} />


          <Route path="/contact" element={<Contact />} />
          <Route element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
};
export default ROUTES;
