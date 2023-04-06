
const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const Transaction = require('../models/transfer')

async function transfer({
    userId,
    chainId, 
    toAddress, 
    amount, 
    tokenAddress}){
        try {
            const privateKey = process.env.HOT_WALLET_PRIVATE_KEY;
            const web3 = await Web3.httpProvider(chainId);
            const account = web3.eth.accounts.privateKeyToAccount(privateKey);            
            const tokenContract = await Contract.getTokenContract({chainId, address: tokenAddress})
            
            var dataTransfer = tokenContract.methods.transfer(
                toAddress,
                web3.utils.toWei(amount.toString(), 'ether')
            );
            
            var count = await web3.eth.getTransactionCount(account.address);

            var tx = {
                from:account.address,
                gas: 501064,
                to:tokenAddress,
                data:dataTransfer.encodeABI(),
                nonce: web3.utils.toHex(count)
            };
            
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            const result = await Transaction.create({
                userId: userId,
                blockNumber: receipt.blockNumber,
                transactionHash: receipt.transactionHash,
                amount: amount,
                toAddress: toAddress,
                tokenAddress: tokenAddress,
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