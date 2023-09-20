// import * as ecc from 'tiny-secp256k1';
// import { BIP32Factory } from 'bip32';
// import * as bip39 from 'bip39';
// import * as bitcoin from 'bitcoinjs-lib';
import * as ethers from 'ethers';

// const bip32 = BIP32Factory(ecc)

export function createWalletEther() {
  try {
    const walletEther = ethers.Wallet.createRandom();
    return {
      address: walletEther.address,
      publicKey: walletEther.publicKey,
      privateKey: walletEther.privateKey,
      mnemonic: walletEther.mnemonic.phrase,
    };
  } catch (error) {
    console.log('error:', error);
  }
}

export function createWalletBitcoin() {
  // Define the network
  // const network = bitcoin.networks.bitcoin //use networks.testnet for testnet

  // //Derivation path
  // const path = `m/44'/0'/0'/0'` //Use m/44'/1'/'/0' for testnet

  // let mnemonic = bip39.generateMnemonic()
  // const seed = bip39.mnemonicToSeedSync(mnemonic)
  // let root = bip32.fromSeed(seed, network)

  // let account = root.derivePath(path)
  // let node = account.derive(0).derive(0)

  // let btcAddress = bitcoin.payments.p2pkh({
  //     pubkey: node.publicKey,
  //     network: network,
  // }).address

  // return {
  //     address: btcAddress,
  //     publicKey: "",
  //     privateKey: node.toWIF(),
  //     mnemonic: mnemonic
  // }
  return {
    address: 'btcAddress',
    publicKey: '',
    privateKey: '',
    mnemonic: 'mnemonic',
  };
}
