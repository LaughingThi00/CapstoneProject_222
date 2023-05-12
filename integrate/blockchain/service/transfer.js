
const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const Transaction = require('../models/transfer')
const ADDRESS = require('../constants/address')
const UpdateBalance = require("../utils/updateBalance");
async function transfer({
    userId,
    merchant,
    chainId, 
    toAddress, 
    amount,
    asset}){
        try {
            const privateKey = process.env.HOT_WALLET_PRIVATE_KEY;
            const web3 = await Web3.httpProvider(chainId);
            const account = web3.eth.accounts.privateKeyToAccount(privateKey);
            const tokenAddress = ADDRESS.TOKENS[asset][chainId];
            const tokenContract = await Contract.getTokenContract({chainId, address: tokenAddress})
            
            var dataTransfer = tokenContract.methods.transfer(
                toAddress.toLowerCase(),
                web3.utils.toWei(amount.toString(), 'ether')
            );
            
            var count = await web3.eth.getTransactionCount(account.address);

            var tx = {
                from:account.address,
                gas: 501064,
                to:tokenAddress.toLowerCase(),
                data:dataTransfer.encodeABI(),
                nonce: web3.utils.toHex(count)
            };
            
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            // console.log("receipt", receipt)

            await UpdateBalance(userId, merchant, receipt.transactionHash, asset, "-", amount);

            const result = await Transaction.create({
                userId: userId,
                merchant: merchant,
                blockNumber: receipt.blockNumber,
                timeStamp: (await Web3.getBlock(receipt.blockNumber, chainId)).timestamp,
                transactionHash: receipt.transactionHash.toLowerCase(),
                amount: amount,
                asset: asset,
                toAddress: toAddress.toLowerCase(),
                tokenAddress: tokenAddress.toLowerCase(),
                effectiveGasPrice: receipt.effectiveGasPrice,
                gasUsed: receipt.gasUsed,
                created_time: new Date(),
                updated_time:  new Date(),
                updated_by: 'core_api',
            })
            return result
        }
        catch(err){
            console.log("err", err);
            return
        }
}

module.exports = {
    transfer
}