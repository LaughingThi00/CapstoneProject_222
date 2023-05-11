const Web3 = require('../utils/web3')
const axios = require("axios");
const Contract = require('../utils/contract')
const BlockchainScan = require("../utils/blockchain_scan");
const CrawlDeposit = require("../models/configuration");
const DepositModel = require('../models/deposit')
const TOKENS = require('../constants/address')
const NATIVECOINS = require('../constants/address')
const UpdateBalance = require("../utils/updateBalance")
const Url = require("../constants/urlAPI")

async function listenDeposit(chainId, userAddress){
    await nativeDeposit(chainId, userAddress);
    await tokenDeposit(chainId, userAddress);
}
async function  nativeDeposit(chainId, userAddress){
    let lastBlock = await CrawlDeposit.findOne({
        key: 'lastBlockFetchNativeDeposit',
        chainId
    });
    if (!lastBlock) {
        lastBlock = 0;
        await CrawlDeposit.create({
            key: 'lastBlockFetchNativeDeposit',
            value: lastBlock,
            chainId
        });
    }
    const transactions = await BlockchainScan.fetTransactions({
        chainId: chainId,
        address: userAddress,
        startBlock: lastBlock
    })
    // console.log("transactions: ", transactions)
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

        // Updating balance user
        const userInfo = await axios.get(`${Url.apiBackEndUrl}/user`);

        await UpdateBalance(userInfo.data.users.id, userInfo.data.users.merchant, NATIVECOINS[chainId], amount);

        await saveToDB(userInfo.data.users, chainId,transaction, userAddress);

        // Last block fetched
        const newLastBlock = transactions[transactions.length - 1].blockNumber;
        await CrawlDeposit.findOneAndUpdate({
            key: 'lastBlockFetchNativeDeposit',
            chainId,
        },
            {
                key: 'lastBlockFetchNativeDeposit',
                value: newLastBlock,
                chainId,

            });

    }
}

async function tokenDeposit(chainId, userAddress){
    let lastBlock = await CrawlDeposit.findOne({
        key: 'lastBlockFetchTokenDeposit',
        chainId
    });
    if (!lastBlock) {
        lastBlock = 0;
        await CrawlDeposit.create({
            key: 'lastBlockFetchTokenDeposit',
            value: lastBlock,
            chainId
        });
    }
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
        // Updating balance user
        console.log("userAddress", userAddress)
        // const userInfo = await axios.get(`${Url.apiBackEndUrl}/user/find-user`,{ address: userAddress });
        console.log("userInfo", userInfo.data)
        // await UpdateBalance(userInfo.data.users.id, userInfo.data.users.merchant, transaction.tokenSymbol, amount);

        await saveToDB(userInfo.data.users, chainId,transaction, userAddress);
        // Last block fetched
        const newLastBlock = transactions[transactions.length - 1].blockNumber;
        await CrawlDeposit.findOneAndUpdate({
                key: 'lastBlockFetchTokenDeposit',
                chainId,
            },
            {
                key: 'lastBlockFetchTokenDeposit',
                value: newLastBlock,
                chainId,
            });
    }
}

async function saveToDB(userInfo, chainId, transaction, userAddress){
    await  DepositModel.create({
        userId: userInfo.userId,
        merchant: userInfo.merchant,
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