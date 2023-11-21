import NodeRSA from 'node-rsa';
// Hàm tạo cặp public key và private key
function genKey(): { publicKey: string; privateKey: string } {
  const key = new NodeRSA({ b: 2048 });
  const publicKey = key.exportKey('public');
  const privateKey = key.exportKey('private');
  return { publicKey, privateKey };
}

// Hàm mã hóa dữ liệu bằng private key
function encryptData(data: string, privateKey: string): string {
  const key = new NodeRSA();
  key.importKey(privateKey, 'private');
  return key.encryptPrivate(data, 'base64');
}

// Hàm giải mã dữ liệu bằng public key
function decryptData(data: string, publicKey: string): string {
  const key = new NodeRSA();
  key.importKey(publicKey, 'public');
  return key.decryptPublic(data, 'utf8');
}

export { genKey, encryptData, decryptData };

// // Tạo cặp key
// const keys = genKey();
// const pairKey = { publicKey: keys.publicKey, privateKey: keys.privateKey };

// console.log('Public Key:', pairKey.publicKey);
// console.log('Private Key:', pairKey.privateKey);

// // Mã hóa và giải mã dữ liệu
// const originalData = 'Hello, world!';

// const encryptedData = encryptData(originalData, pairKey.privateKey);
// console.log('Encrypted Data:', encryptedData);

// const decryptedData = decryptData(encryptedData, pairKey.publicKey);
// console.log('Decrypted Data:', decryptedData);
