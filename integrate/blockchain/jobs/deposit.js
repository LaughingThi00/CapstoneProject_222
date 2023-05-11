const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const CrawlDeposit = require('../models/configuration')
const Wallet = require('../models/wallet');
const mongoose = require("mongoose");
const getMongoUrl = require("../utils/get-mongo-url");
const BlockchainScan = require('../utils/blockchain_scan')
const MonitorEth = require('../utils/monitor')
const DepositModel = require('../models/deposit')
const DepositHelper = require('../service/listen_deposit')
async function listenDeposit(){
    try{
        const listChainId=[97];
        const user = await Wallet.find();
        // console.log('user:', user);
        const listUserAddress = user.map(item=>item.key.evm.address)
        // console.log("listUserAddress", listUserAddress);
        for (let i=0;i<listUserAddress.length; i++){
            for (let j =0; j< listChainId.length; j++){
                await DepositHelper.listenDeposit(listChainId[j],listUserAddress[i])
            }
        }
    }
    catch (err){
        console.log("err", err)
    }


}
module.exports = listenDeposit