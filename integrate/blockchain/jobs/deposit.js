const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const CrawlDeposit = require('../models/configuration')
const Wallet = require('../models/wallet');

async function listenDeposit(chainId, tokenAddress){
    // const web3 = Web3.httpProvider(chainId);
    console.log("aaaaaa");
    const user = await Wallet.find();
    console.log('user:', user);


    const tokenContract = Contract.getTokenContract({chainId, tokenAddress})
    const lastBlock = await CrawlDeposit.findOne({
        key: 'lastBlockFetchDeposit',
    }).value;

}


listenDeposit(97,'97')
// async function getConfig