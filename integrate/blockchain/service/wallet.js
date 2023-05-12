
const Wallet = require("../models/wallet")
const {createWalletEther, createWalletBitcoin} = require("../utils/create-wallet-helper")

async function createWallet(userId, merchant){

    const walletEther = createWalletEther();
    const bitcoinWallet = createWalletBitcoin()
    await Wallet.create({
        userId: userId,
        merchant: merchant,
        key: {
            bitcoin: {
                networkId: 1,
                networkName: "Bitcoin",
                address: bitcoinWallet.address.toLowerCase(),
                publicKey: bitcoinWallet.publicKey,
                privateKey: bitcoinWallet.privateKey,
                mnemonic: bitcoinWallet.mnemonic
            },
            evm:{
                networkId: 2,
                networkName: "EVM",
                address: walletEther.address.toLowerCase(),
                publicKey: walletEther.publicKey,
                privateKey: walletEther.privateKey,
                mnemonic: walletEther.mnemonic
            }

        },
        created_time: new Date(),
        updated_time:  new Date(),
        updated_by: 'core_api',
    })
    
    return {
        addressBitcoin: bitcoinWallet.address.toLowerCase(),
        addressEther: walletEther.address.toLowerCase()
    }
}
module.exports = {
    createWallet
}