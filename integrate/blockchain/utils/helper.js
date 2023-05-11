const web3 = require('web3');

function abiDecode(type, value){
    return new web3().eth.abi.decodeParameter(type, value);
}

function abiDecodeMulti(types, value){
    return new web3().eth.abi.decodeParameters(types, value);
}

module.exports ={
    abiDecode,
    abiDecodeMulti
}