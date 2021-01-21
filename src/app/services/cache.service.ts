import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private userDetails: any;
  public organizationDetail: any;

  constructor() { }

  setCache(name, val) {
    localStorage.setItem('googleleads-' + name, JSON.stringify(val));
  }

  getCache(name) {
    const cache = localStorage.getItem('googleleads-' + name);
    return cache ? JSON.parse(cache) : 'null';
  }

  removeCache(name) {
    localStorage.removeItem('googleleads-' + name);
  }

  setUserDetails(val) {
    this.userDetails = val;
  }

  getUserDetails() {
    return this.userDetails;
  }

}
