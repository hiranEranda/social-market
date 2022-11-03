import React from "react";
import { useERC20Balances } from "react-moralis";
import { useChain } from "react-moralis";

function Created() {
  const { fetchERC20Balances, data, isLoading, isFetching, error } =
    useERC20Balances();

  const { chainId } = useChain();
  React.useEffect(() => {
    async function getBal() {
      const data = fetchERC20Balances({ params: { chain: "0x5" } });
      return data;
    }
    getBal().then((data) => {
      console.log(data);
      data.map((val) => {
        if (
          val.token_address === "0xc75a66d4b7a742cccbf848ba153db67eda7aa981"
        ) {
          console.log(val.balance);
        }
      });
    });
  }, []);

  return <div>Created</div>;
}

export default Created;
