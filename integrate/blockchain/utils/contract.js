const { Web3 } = require('./web3')
const fs = require('fs')
const path = require('path')

class Contract {
  static getContract ({
    abi,
    chainId,
    address,
    withRandom
  }) {
    let web3 = Web3.httpProvider(chainId)
    if (withRandom) {
      web3 = Web.randomProvider(chainId)
    }
    // providerType == ProviderType.WS
    //   ? Web3.wsProvider(chainId)
    //   : Web3.httpProvider(chainId);

    const contract = new web3.eth.Contract(abi, address)

    return contract
  }

  static getTokenContract ({
    chainId,
    address
  }) {
    const tokenABIPath = path.join(__dirname, '../constants/abis/ERC20.json')
    const tokenABI = fs.readFileSync(tokenABIPath, {
      encoding: 'utf-8'
    })
    const loadTokenABI = JSON.parse(tokenABI)
    const contract = Contract.getContract({
      abi: loadTokenABI,
      chainId,
      address
    })

    return contract
  }
}
