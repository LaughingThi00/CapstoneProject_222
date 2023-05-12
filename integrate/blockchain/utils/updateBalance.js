const axios=require("axios");
const URL = require("../constants/urlAPI")
const updateBalance = async (userId, merchant, transactionHash, asset, type, amount) =>{
    const assetRes = await axios.put(`${URL.apiBackEndUrl}/user`,
        {
            id: userId,
            merchant: merchant,
            transactionHash: transactionHash,
            transaction_type: "OnChain",
            token: asset,
            type,
            amount
        });
}
module.exports = updateBalance