const URL = {
    apiBlockChainUrl:
        process.env.NODE_ENV !== "production"
            ? "http://localhost:3001/api"
            : "linkDeployBlockChain/api",

    apiBackEndUrl:
        process.env.NODE_ENV !== "production"
            ? "http://localhost:5001/api"
            : "linkDeployBackEnd/api",

    MerchantUrl:
        process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : "linkDeployMerchant",
};

module.exports = URL;
