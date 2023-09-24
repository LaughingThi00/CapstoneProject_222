import crypto from 'crypto';

export const genKey = () => {
  let { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  // console.log(privateKey,publicKey)
  return { privateKey, publicKey };
};

export const encryptData = (data, publicKey: string) => {
  let encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(data),
  );
  //   console.log(encryptedData)
  // console.log("encypted data: ", encryptedData.toString("base64"));
  // return encryptedData.toString("base64");
  return encryptedData;
};

export const decryptData = (encryptedData, privateKey: string) => {
  let decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    encryptedData,
  );

  //   console.log("decrypted data: ", decryptedData.toString());
  // return decryptedData;
  return decryptedData.toString();
};
