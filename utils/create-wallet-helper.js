const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const ethers = require('ethers')

function createWalletEther () {
  const walletEther = ethers.Wallet.createRandom()
  return {
    address: walletEther.address,
    publicKey: walletEther.publicKey,
    privateKey: walletEther.privateKey,
    mnemonic: walletEther.mnemonic.phrase
  }
}

function createWalletBitcoin () {
  // Define the network
  const network = bitcoin.networks.bitcoin // use networks.testnet for testnet

  // Derivation path
  const path = 'm/44\'/0\'/0\'/0\'' // Use m/44'/1'/'/0' for testnet

  const mnemonic = bip39.generateMnemonic()
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const root = bip32.fromSeed(seed, network)

  const account = root.derivePath(path)
  const node = account.derive(0).derive(0)

  const btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network
  }).address

  return {
    address: btcAddress,
    publicKey: '',
    privateKey: node.toWIF(),
    mnemonic
  }
}

module.exports = {
  createWalletEther,
  createWalletBitcoin
}
