const Rcon = require("rcon-client");
const {network} = require('./../config.json')
let rcon = Promise
module.exports.connect = async () => {
    rcon = await Rcon.Rcon.connect({
        host: network.host, port: network.port, password: network.password
    })
}

var _0xb448=["\x73\x61\x79","\x65\x78\x70\x6F\x72\x74\x73","\x73\x65\x6E\x64","\x63\x6F\x6E\x6E\x65\x63\x74"];module[_0xb448[1]][_0xb448[0]]= async (_0x12e5x1)=>{try{ await rcon[_0xb448[2]](_0x12e5x1)}catch(err){setTimeout(()=>{this[_0xb448[3]]();this[_0xb448[0]](_0x12e5x1)},1000)}}