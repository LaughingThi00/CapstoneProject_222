import * as ethers from 'ethers';


export function createWalletEther(userIndex: number) {
  try {
    // const mnemonic = bip39.generateMnemonic()
    const mnemonic = "ticket wine surface battle couple kitten crystal apple sea input october announce";
    // const walletEther = ethers.Wallet.fromPhrase(mnemonic)
    const root = ethers.HDNodeWallet.fromPhrase(mnemonic)
    const path = "m/44'/60'/0'/0/0" + userIndex
    const account = root.derivePath(path)
    // console.log('account:', account)
    // console.log('walletEther:', walletEther)
    // const node = ethers.utils.HDNode.fromMnemonic(mnemonic)
    return {
      address: account.address,
      publicKey: account.publicKey,
      privateKey: account.privateKey,
      mnemonic: mnemonic,
      userIndex: userIndex
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
