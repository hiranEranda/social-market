import React from "react";
import CircularStatic from "../../components/LoadingAnime";
import ExploreSection from "../pages/ExploreSection";
function ExploreCategory({ loading, data_1, data_2, data, type }) {
  return (
    <>
      {(!loading && data === null) || data === undefined ? (
        <div className="mx-auto max-w-[1280px] flex justify-center">
          <CircularStatic />
        </div>
      ) : !loading && data.length === 0 ? (
        <div className="mx-auto max-w-[1280px]">No Items yet</div>
      ) : (
        <div className="mx-auto">
          {data_1.length > 0 && type === "ERC-721" ? (
            <ExploreSection val={data_1} isMultiple={false} />
          ) : data_2.length > 0 && type === "ERC-1155" ? (
            <ExploreSection val={data_2} isMultiple={true} />
          ) : (
            <div className="flex items-center justify-center">
              No items found
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ExploreCategory;
