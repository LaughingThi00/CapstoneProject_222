const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')

async function listenDeposit(chainId, tokenAddress){
    const web3 = Web3.httpProvider(chainId);
    
    const tokenContract = Contract.getTokenContract({chainId, tokenAddress})
    // const lastBlock = await 
}

// async function getConfig
