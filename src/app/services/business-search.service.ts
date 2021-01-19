import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessSearchService {
  private apiPath: string;
  private searchingLocation: string;
  private businesses: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api;
    this.businesses = 'businesses';
    this.searchingLocation = 'businesses/search';

  }

  searchingData(sendSearchData) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.searchingLocation}/`, sendSearchData)
  }

  importData(dataImport) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.businesses}/`, dataImport)
  }

  getBusinessesData() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.businesses}/`)
  }

}

