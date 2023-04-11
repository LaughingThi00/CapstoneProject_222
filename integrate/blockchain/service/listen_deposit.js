const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const BlockchainScan = require("../utils/blockchain_scan");
const CrawlDeposit = require("../models/configuration");
const DepositModel = require('../models/deposit')
const TOKENS = require('../constants/address')
async function listenDeposit(chainId, userAddress){
    let lastBlock = await CrawlDeposit.findOne({
        key: 'lastBlockFetchDeposit',
    });
    if (!lastBlock) lastBlock = 0;
    await nativeDeposit(chainId, userAddress, lastBlock);
    await tokenDeposit(chainId, userAddress, lastBlock);
}
async function  nativeDeposit(chainId, userAddress, lastBlock){
    const transactions = await BlockchainScan.fetTransactions({
        chainId: chainId,
        address: userAddress,
        startBlock: lastBlock
    })
    if (!transactions || !transactions.length) {
        return;
    }
    for (let index=0; index<transactions.length; index++) {
        const transaction = transactions[index];
        if (!transaction || transaction.to.toLowerCase() !== userAddress.toLowerCase()) continue;
        if (!transaction.methodId || transaction.methodId !=='0x') continue;
        const amount = transaction.value/10**18;
        const tx = await DepositModel.findOne({
            transactionHash: transaction.hash
        });
        if (tx) return;
        /*
            Updating balance user

        */
        await saveToDB(chainId,transaction, userAddress);
        // Last block fetched
        const newLastBlock = transactions[transactions.length - 1].blockNumber;
        await CrawlDeposit.create({
            key: 'lastBlockFetchDeposit',
            value: newLastBlock,
            chainId,
        });

    }
}

async function tokenDeposit(chainId, userAddress, lastBlock){
    const transactions = await BlockchainScan.fetTokenERC20Transaction({
        chainId: chainId,
        address: userAddress,
        startBlock: lastBlock
    })
    if (!transactions || !transactions.length) {
        return;
    }
    for (let index=0; index<transactions.length; index++) {
        const transaction = transactions[index];
        console.log("transaction", transaction);
        // if (!transaction.methodId || transaction.methodId !=='0x') continue;
        if (!transaction || transaction.to.toLowerCase() !== userAddress.toLowerCase()) continue;
        // console.log("TOKENS", TOKENS)
        // if (transaction.tokenSymbol)
        const amount = transaction.value/10**18;
        const tx = await DepositModel.findOne({
            transactionHash: transaction.hash
        });
        if (tx) return;
        /*
            Updating balance user

        */
        await saveToDB(chainId,transaction, userAddress);
        // Last block fetched
        const newLastBlock = transactions[transactions.length - 1].blockNumber;
        await CrawlDeposit.create({
            key: 'lastBlockFetchDeposit',
            value: newLastBlock,
            chainId,
        });

    }
}

async function saveToDB(chainId, transaction, userAddress){
    await  DepositModel.create({
        chainId: chainId,
        userAddress: userAddress.toLowerCase(),
        blockNumber: transaction.blockNumber,
        timeStamp: transaction.timeStamp,
        transactionHash: transaction.hash,
        symbol: transaction.tokenSymbol? transaction.tokenSymbol:TOKENS.NATIVECOINS[chainId],
        amount: transaction.value/10**18,
        fromAddress: transaction.from,
        toAddress: transaction.to,
        tokenAddress: transaction.contractAddress,
        methodId: transaction.methodId,
        functionName: transaction.functionName,
        created_time: new Date(),
        updated_time:  new Date(),
        updated_by: 'core_api',
    })
}

// async function getConfig
module.exports = {
    listenDeposit,
    nativeDeposit,
    tokenDeposit
}