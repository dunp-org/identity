import Identities from 'orbit-db-identity-provider';
import { ethers } from "ethers";
import { entropyToMnemonic } from 'bip39';

import Identity from '..';
import digest from './digest';


// Easy Identity (from username and password, entropy or mnemonic)
export default class EasyIdentity extends Identity {
  static async login(options = {}) {
    const wallet = await EasyIdentity.getSigner(options);
    const identity = await Identities.createIdentity({
      type: "ethereum",
      wallet,
    });
    EasyIdentity.saveIdentity(identity);
    EasyIdentity.saveProvider('easy');
    return identity;
  }

  static async getSigner(options = {}) {
    await processOptions(options);
    const {mnemonic, path} = options;
    return ethers.Wallet.fromMnemonic(mnemonic, path);   // default path: m/44'/60'/0'/0/0
  }
}

async function processOptions(options) {
  if (!options.mnemonic) {
    if (!options.entropy) {
      const {username, password} = options;
      if (!username || !password) throw new Error('need to supply either username and password, entropy, or mnemonic in options');
      options.entropy = await digest(`dunp::${username}::${password}::dunp`);
    }
    options.mnemonic = entropyToMnemonic(options.entropy);
  }
}
