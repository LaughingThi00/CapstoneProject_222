const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const CrawlDeposit = require('../models/configuration')
const Wallet = require('../models/wallet');

async function listenDeposit(chainId, tokenAddress){
    const web3 = Web3.httpProvider(chainId);
    const user = await Wallet.find();
    console.log('user:', user);


    const tokenContract = Contract.getTokenContract({chainId, tokenAddress})
    const lastBlock = await CrawlDeposit.findOne({
        key: 'lastBlockFetchDeposit',
    }).value;
    
}

// async function getConfig
