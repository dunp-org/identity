// Use browser or node crypto for SHA-256 digest entropy

const digest_browser =  async function (data) {
  const crypto = window.crypto || window.msCrypto;                              // for IE 11
  const msgUint8 = new TextEncoder().encode(data);                              // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

const digest_node = async function (data) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

let digest;

if (typeof window === 'undefined' || window === null) {
  digest = digest_node;
} else {
  digest = digest_browser;
}

export default digest;
