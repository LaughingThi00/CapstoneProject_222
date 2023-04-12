const axios = require('axios');
const API_KEY = require('../constants/blockchain_scan');
const BSC_API_KEY = require('../constants/network')

const FetchTransactionParams = new Object({
    chainId: Number,
    address: String,
    startBlock: String,
});
const TransactionListResponse = new Object({
    blockNumber: String,
    blockHash: String,
    timeStamp: String,
    hash: String,
    nonce: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    input: String,
    methodId: String,
    functionName: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    txreceipt_status: String,
    gasUsed: String,
    confirmations: String,
    isError: String,  
})
class BlockchainScan {
    static async fetTransactions({
        chainId,
        address,
        startBlock,
    }){
        const url = API_KEY[chainId].url;
        try {
            const response = await axios.get(url, {
              params: {
                module: 'account',
                address,
                apikey: API_KEY[chainId].key,
                action: 'txlist',
                sort: 'asc',
                startblock: startBlock,
              },
            });
      
            if (response.data.status == 1) {
              return response.data.result;
            } else {
              return [];
            }
          } catch (error) {
            console.log('Fetch API BSC error:', error);
            return [];
          }
    }
    static async fetTokenERC20Transaction({
        chainId, 
        address,
        startBlock
    }){
        const url = API_KEY[chainId].url;
        try {
            const response = await axios.get(url, {
              params: {
                module: 'account',
                action: 'tokentx',
                address,
                apikey: API_KEY[chainId].key,
                sort: 'asc',
                startblock: startBlock,
              },
            });
      
            if (response.data.status == 1) {
              return response.data.result;
            } else {
              // console.log('Error fetchTransactions:', response.data)
              return [];
            }
          } catch (error) {
            console.log('Request error:', error);
            return [];
          }
    }

}
module.exports = BlockchainScan