import Identities from 'orbit-db-identity-provider';
import { ethers } from "ethers";

import Identity from '..';


// Web3 Identity
export default class Web3Identity extends Identity {
  static async login(options = {}) {
    const wallet = await Web3Identity.getSigner(options);
    const identity = await Identities.createIdentity({
      type: "ethereum",
      wallet,
    });
    Web3Identity.saveIdentity(identity);
    Web3Identity.saveProvider('web3');
    return identity;
  }

  static async getSigner(options = {}) {
    const {web3} = options;   // default: window.ethereum
    const provider = new ethers.providers.Web3Provider(web3 || window.ethereum);
    return provider.getSigner();
  }
}
