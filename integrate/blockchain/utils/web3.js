const web3 = require('web3')
const RPC = require('../constants/rpc')
class Web3 {
<<<<<<< HEAD
  static httpProvider (chainId) {
    return new web3(
      new web3.providers.HttpProvider(RPC[chainId])
    )
  }
=======
    static httpProvider(chainId) {
        return new web3(new web3.providers.HttpProvider(RPC[chainId]));
    }
>>>>>>> 33e38c1561b00aef39056918d7f521ee13ff6509

  static async getTransactionReceipt (txHash, chainId) {
    const web3 = Web3.httpProvider(chainId)

    try {
      return await web3.eth.getTransactionReceipt(txHash)
    } catch (error) {
      console.log('Error getTransactionReceipt:', error)
      return null
    }
  }

<<<<<<< HEAD
  static async getTransaction (txHash, chainId) {
    try {
      const web3 = Web3.httpProvider(chainId)
      return await web3.eth.getTransaction(txHash)
    } catch (error) {
      console.log('Error getTransaction:', error)
      return null
    }
  }

  static async getBlock (blockNumber, chainId) {
    try {
      const web3 = Web3.httpProvider(chainId)
      return await web3.eth.getBlock(blockNumber)
    } catch (error) {
      console.log('Error getBlock:', error)
      return null
    }
  }

  static async getBlockNumber (chainId) {
    try {
      const web3 = Web3.httpProvider(chainId)
      return await web3.eth.getBlockNumber()
    } catch (error) {
      console.log('Error getBlock:', error)
      return null
    }
  }

  static fromWei (weiNumber) {
    return +web3.utils.fromWei(weiNumber + '')
  }

  static toWei (number) {
    return web3.utils.toWei(number + '')
  }

  static isAddressValid (address) {
    return web3.utils.isAddress(address)
  }

  static decodeParameters (typesArray, hexString, chainId) {
    const web3 = Web3.httpProvider(chainId)
    return web3.eth.abi.decodeParameters(typesArray, hexString)
  }
}
=======
}

module.exports = Web3
>>>>>>> 33e38c1561b00aef39056918d7f521ee13ff6509
