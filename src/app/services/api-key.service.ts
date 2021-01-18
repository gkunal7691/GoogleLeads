import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  private apiPath: string;
  private apikeys: string;

  constructor(private httpClient: HttpClient) { 
    const env: any = environment;
    this.apiPath = env.paths.api;
    this.apikeys = 'apikey';
  }

  newApiKey( sendApiKey ){
    return this.httpClient.put<object>(`${this.apiPath}/${this.apikeys}/`, sendApiKey)
  }

  getApiKey( ){
    return this.httpClient.get<object>(`${this.apiPath}/${this.apikeys}/`)
  }
}
