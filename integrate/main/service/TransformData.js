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

module.exports={findListUserAddress,findListMerchantAddress}
