const Web3 = require('./web3');
const fs = require('fs');
const path = require("path");

class Contract {
    static getContract({
        abi,
        chainId,
        address,
      }) {
        let web3 = Web3.httpProvider(chainId)
        const contract = new web3.eth.Contract(abi, address);
    
        return contract;
      }
    static getTokenContract({chainId,address}){
        let tokenABIPath = path.join(__dirname, '../constants/abis/ERC20.json')
        let tokenABI = fs.readFileSync(tokenABIPath, {
            encoding: 'utf-8'
        });
        let loadTokenABI = JSON.parse(tokenABI);
        const contract = Contract.getContract({
            abi: loadTokenABI,
            chainId,
            address,
        });

        return contract;
    }
    static getRouterContract({chainId,address}){
        let routerABIPath = path.join(__dirname, '../constants/abis/routerContract.json')
        let routerABI = fs.readFileSync(routerABIPath, {
            encoding: 'utf-8'
        });
        let loadRouterABI = JSON.parse(routerABI);
        const contract = Contract.getContract({
            abi: loadRouterABI,
            chainId,
            address,
        });

        return contract;
    }
}

module.exports = Contract