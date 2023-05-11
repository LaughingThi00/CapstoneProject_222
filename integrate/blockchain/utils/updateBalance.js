const axios=require("axios");
const URL = require("../constants/urlAPI")
const updateBalance = async (userId, merchant, asset, amount) =>{
    const assetRes = await axios.put(`${URL.apiBackEndUrl}/user`,
        {
            id: userId,
            merchant: merchant,
            token: asset,
            type: "+",
            amount
        });
}
module.exports = updateBalance