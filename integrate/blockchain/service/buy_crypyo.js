const Web3 = require('../utils/web3')
const Contract = require('../utils/contract')
const BuyCrypto = require('../models/buy_crypto')
const ADDRESS = require('../constants/address')
const UpdateBalance = require("../utils/updateBalance")
const abiDecode = require('../utils/helper')
const abiDecodeMulti = require('../utils/helper')
const web3 = require("web3");
const updateBalance = require("../utils/updateBalance");
async function buyCrypto({
    userId,
    merchant,
    amount_VND,
    for_token,
    slippage,
    chainId
}){
    try{
        const routerAddress = process.env.ROUTER_ADDRESS;
        const privateKey = process.env.HOT_WALLET_PRIVATE_KEY;
        const web3 = await Web3.httpProvider(chainId);
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const routerContract = await Contract.getRouterContract({chainId, routerAddress});

        const USDTAddress = '0x57aa96000E6317c846bbce0AF17B41B1cBdd300F';
        const tokenOut=ADDRESS.TOKENS[for_token][chainId];

        var amountIn = amount_VND/23300*10**18;         //convert from amount_VND
        var amountOutMin = '0';                         // calculation by slippage
        if (for_token ==='BNB'){
            var dataSwap = routerContract.methods.swapExactTokensForETH(
                web3.utils.toHex(amountIn),
                web3.utils.toHex(amountOutMin),
                [USDTAddress, tokenOut],
                account.address,
                web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
            )
        }else{
            var dataSwap = routerContract.methods.swapExactTokensForTokens(
                web3.utils.toHex(amountIn),
                web3.utils.toHex(amountOutMin),
                [USDTAddress, tokenOut],
                account.address,
                web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
            )
        }

        // console.log("dataSwap", dataSwap)
        var count = await web3.eth.getTransactionCount(account.address);

        var tx = {
            from:account.address,
            gas: 501064,
            to:routerAddress,
            data:dataSwap.encodeABI(),
            nonce: web3.utils.toHex(count)
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Get transfer log
        const transferLogs = receipt.logs.filter(
            (log) => log.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        );
        // console.log("transferLogs", transferLogs)
        const {valueIn, valueOut} = await handleSwap(transferLogs)


        await UpdateBalance(userId, merchant, for_token, web3.utils.fromWei(valueOut));

        const result = await BuyCrypto.create({
            userId: userId,
            merchant: merchant,
            amount_VND: amount_VND,
            for_token: for_token,
            slippage: slippage,
            chainId: chainId,
            blockNumber: receipt.blockNumber,
            transactionHash: receipt.transactionHash,
            from: receipt.from,
            RouterAddress: receipt.to,
            amountIn: web3.utils.fromWei(valueIn),
            amountOut: web3.utils.fromWei(valueOut),
            tokenIn: USDTAddress,
            tokenOut: tokenOut,
            cumulativeGasUsed: receipt.cumulativeGasUsed,
            effectiveGasPrice: receipt.effectiveGasPrice,
            gasUsed: receipt.gasUsed,
            created_time: new Date(),
            updated_time:  new Date(),
            updated_by: 'core_api',
        })

        return result;
    }
    catch (err){
        console.log("err", err);
        // return {
        //     success: false,
        //     message: "Buy failed!",
        //     data: []
        // }
        return
    }
}

async function handleSwap(logs){
    const valueIn = new web3().eth.abi.decodeParameter('uint256', logs[0].data);
    const valueOut = new web3().eth.abi.decodeParameter('uint256', logs[logs.length-1].data);
    // for (let index = 0; index < logs.length; index++) {
    //     const log = logs[index];
    //     const topics = log.topics;
    //     if (!topics || !topics.length) continue;
    //     const lp = new web3().eth.abi.decodeParameter('address', topics[1]);
    //     const amount = new web3().eth.abi.decodeParameter('uint256', log.data);
    //     const token = log.address;
    //     console.log('lp',lp)
    //     console.log('amount', amount)
    //     console.log('token',token)
    // }
    return {valueIn,valueOut}
}

module.exports = {
    buyCrypto
}