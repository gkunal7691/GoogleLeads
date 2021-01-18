import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessSearchService {
  private apiPath: string;
  private searchingLocation: string;
  private importDatas:string;

  constructor(private httpClient: HttpClient) { 
    const env: any = environment;
    this.apiPath = env.paths.api;
    this.importDatas = 'businesses';
    this.searchingLocation = 'businesses/search';

  }

  searchingData( sendSearchData ){
    return this.httpClient.post<object>(`${this.apiPath}/${this.searchingLocation}/`, sendSearchData)
  }

  importData( dataImport ){
    return this.httpClient.post<object>(`${this.apiPath}/${this.importDatas}/`, dataImport)
  }

}

