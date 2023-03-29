
const Wallet = require("../models/wallet")
const {createWalletEther, createWalletBitcoin} = require("../utils/create-wallet-helper")

async function createWallet(userId){

    const walletEther = createWalletEther();
    const bitcoinWallet = createWalletBitcoin()
    await Wallet.create({
        userId: userId,
        key: {
            bitcoin: {
                networkId: 1,
                networkName: "Bitcoin",
                address: bitcoinWallet.address,
                publicKey: bitcoinWallet.publicKey,
                privateKey: bitcoinWallet.privateKey,
                mnemonic: bitcoinWallet.mnemonic
            },
            evm:{
                networkId: 2,
                networkName: "EVM",
                address: walletEther.address,
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
        addressBitcoin: bitcoinWallet.address,
        addressEther: walletEther.address
    }
}
module.exports = {
    createWallet
}