const Default_Data = require("./../constants/default.json");

const findListUserAddress = (user) => {
  const data = [];
  user.asset.forEach((item) => {
    data.push(item.address);
  });
  return data;
};

const findListMerchantAddress = (userlist, merchant) => {
  const data = [];
  userlist.forEach((item) => {
    if (item.merchant === merchant)
      item.asset.forEach((element) => {
        data.push(element.address);
      });
  });
  return data;
};

const findSupportedNetwork = (token) => {
  const list = JSON.parse(JSON.stringify(Default_Data)).token;
  const result = list.find((item) => item.symbol === token);
  return result ? result.supported_network : null;
};
module.exports = { findListUserAddress, findListMerchantAddress,findSupportedNetwork };
