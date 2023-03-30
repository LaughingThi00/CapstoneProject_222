export const apiBlockChainUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001/api"
    : "linkDeployBlockChain/api";

export const apiBackEndUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "linkDeployBackEnd/api";

export const MerchantUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "linkDeployMerchant";
