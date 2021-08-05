import Identities from 'orbit-db-identity-provider';

import storage from './common/storage';


// Storage keys
const PROVIDER_KEY = 'ip';
const IDENTITY_KEY = 'id';


// Common Identity interface
export default class Identity {
  static isLoggedIn() {
    return !!storage.getItem(IDENTITY_KEY);
  }

  static logout() {
    storage.removeItem(IDENTITY_KEY);
  }

  static async login() {
    error();
  }

  static async getSigner() {
    error();
  }

  static async getIdentity() {
    const id = storage.getItem(IDENTITY_KEY);
    if (!id) {
      this.logout();
      return;
    }

    let identity;
    try {
      identity = JSON.parse(id);
    }
    catch (e) {
      console.log('error parsing identity');
      return;
    }
    const valid = await Identities.verifyIdentity(identity);
    if (valid) {
      return identity;
    }
  }

  static getProvider() {
    return storage.getItem(PROVIDER_KEY);
  }

  static saveIdentity(identity) {
    storage.setItem(IDENTITY_KEY, JSON.stringify(identity));
  }

  static saveProvider(provider) {
    storage.setItem(PROVIDER_KEY, provider);
  }
}


const error = () => {
  throw new Error('please import @dunp/identity/<provider>: easy, web3, ...');
};
