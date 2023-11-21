const NodeRSA = require("node-rsa");
const express = require("express");
const router = express.Router();

const MerchantInfo = {
  partner_code: "M001",
  name_: "BK-ROBOTIC",
  privateKey:
    "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAt//bvBoHqpQKoHgCHZ6UZ9AyTYT5FVUJgIcNIh01Mu5N+LVu\n7KEto+4Mb1WSNaPQ2fYR+kvCD4ZpX2xYt0t0ROFJUlp6gG/ZPmHo+bVS3jH4aG7q\nOasjy6wzAjgUkcb4hjPs3S6gB6jsppZ27PN7STUDaf1a3ma/SK97DmqnmwKCKbqU\nloY1QU2v0PpDIzTD0YY1E4PndhrEI1nfk2TwVNRPKUkBO27LbvBZ704QmJWwVuVg\nV+l99vzxPkZNIPv+j3Cps0H9u10Y2l+YaFlWwK6HRHzca+hqFgXsrjouWPHNC+gb\ny47yAU8TutZOCsqhq0J8ykaR2KQhKe41DuY31wIDAQABAoIBAHShDGI1yag5AGdo\nykaGDyGimVADunLoHQbIE+4Mv3zSCsBcGLyLCcgACwfDINM5TBfsXsbdoFuA4mfm\n4HEGteM3PeeijEW/H9/n5enqImXPHNrtezAkp6LhOs/sRjWE/mDqpvgoJq3USHTr\nqORXDU2A+fID8sZIMHVdLc4ckrKwmBlmNevjo/+u/kRstFTpxzFgNyB1RaB+YwXd\nuN6jXJWE6CJhM3VrP2PRzHD5+i34YtlMiSYWb2gfeHMgjHVOhqG7aEG6lCrCBA5/\ndICJC6Vp37I6W8CBAZdeixLAoArqpwdIfkQ9w2Rlo8YlN64M/vvLT/cO93oeugIL\n3fPGw5kCgYEA32Wz5v/HUz2qj8Le45+zHNUmYGflhTDweXEvZecSRdaoK2TFOub7\nQ7hKvOVtHydpYNU3mwYsboMvRdbGM/oC9lrvUXtI7DF2sHb+lThHo6Vloze6QJ7l\nzwkqblXSn755vTu7Hk9SHONd1cS5STro88DRZJ3tc8uEgNSSn+N1o90CgYEA0to4\nyLpvlVmBuWu6px6AQLLCfZt9HiHEaKHa6Wky101AM3lr65wWRdwSNw++LdRf+pNj\nQAGiNPkQXRreXrEWuUkRztqPu2iFt8o6t9gTjBteKEAkvE8vGVTlrwi69OL8bBFH\nvqc4sxxe5eY7gAGzsBFc44e3DOZ24a7SHruu2UMCgYAhgRpTKcdWN6ht+Tb+goQV\nbe5chRiKOkXGoPAP43D9Im2EXI+r/tpuVKR44hvUkU+fozq8uFdPl8MuQUDmqLdr\nBUZhPRE5w01et+oErTUpWPP+X6xCZtJmk6RWee6l4KZXeC7fI9xX0s3O8rsrPXeU\nnzWIVps3Q62yuK7o5e9NzQKBgQC1cxHWu4n2znXyaSDRXFAmXS8+BKbhXVG2cUMA\nBoW3/kS3h1A2C7anG8GZHLUen1qROnD4ze8XAxbv6IVgm6jgfl8S0cdLEaGxDhkF\nyK7ZrVuT688xNjtj40ldHXg18XgkT6KcES+cA1gvI7gkalKFvAthypLeSR4ZDObJ\nh93qHQKBgHn1Pzu8XoVgl1dfVJjHeZAOEJVbAF5S072ZcrBNwhHkI6KWMzMdgr7B\nt2Qqb1fYVRTtD1qW/wMOMH6EcXv1DPnzRKHnaPW7Jw4ysBbgu9zMrB6+ck/D1lUr\nOScAl1J5+Ead0B9uBXRn8s7yZcWibdXyWPklwmJm0dIlwfQ+K2eK\n-----END RSA PRIVATE KEY-----",
  publicKey:
    "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt//bvBoHqpQKoHgCHZ6U\nZ9AyTYT5FVUJgIcNIh01Mu5N+LVu7KEto+4Mb1WSNaPQ2fYR+kvCD4ZpX2xYt0t0\nROFJUlp6gG/ZPmHo+bVS3jH4aG7qOasjy6wzAjgUkcb4hjPs3S6gB6jsppZ27PN7\nSTUDaf1a3ma/SK97DmqnmwKCKbqUloY1QU2v0PpDIzTD0YY1E4PndhrEI1nfk2Tw\nVNRPKUkBO27LbvBZ704QmJWwVuVgV+l99vzxPkZNIPv+j3Cps0H9u10Y2l+YaFlW\nwK6HRHzca+hqFgXsrjouWPHNC+gby47yAU8TutZOCsqhq0J8ykaR2KQhKe41DuY3\n1wIDAQAB\n-----END PUBLIC KEY-----",
};

// Hàm mã hóa dữ liệu bằng private key
function encryptData(data, privateKey) {
  const key = new NodeRSA();
  key.importKey(privateKey, "private");
  return key.encryptPrivate(data, "base64");
}

// @route POST api/rsa
// @desc create one rsa encrypt
// @access Public
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "Missing information. Try again!" });
  }

  try {
    const EncyptData = encryptData(data, MerchantInfo.privateKey);

    return res.json({
      success: true,
      message: "Encryption successfully",
      EncyptData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
