import Identities from 'orbit-db-identity-provider';
import { ethers } from "ethers";

import Identity from '..';


// Web3 Identity
export default class Web3Identity extends Identity {
  static async login(options) {
    const wallet = await this.getSigner(options);
    const identity = await Identities.createIdentity({
      type: "ethereum",
      wallet,
    });
    this.saveIdentity(identity);
    this.saveProvider('web3');
    return identity;
  }

  static async getSigner(options) {
    const {web3} = options;   // default: window.ethereum
    const provider = new ethers.providers.Web3Provider(web3);
    return provider.getSigner();
  }
}
