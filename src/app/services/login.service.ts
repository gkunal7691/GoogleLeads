import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiPath: string;
  private createUser: string;
  private route: string;
  protected authenticated: boolean;
  constructor(private httpClient: HttpClient, private cacheService: CacheService,) {
    const env: any = environment;
    this.apiPath = env.paths.api
    this.createUser = 'users/login';
    this.authenticated = !!this.cacheService.getCache('user');
    this.route = 'auth';
    console.log("test")
  }

  checkToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token').token}`
      })
    };
    return this.httpClient.get(`${this.apiPath}/${this.route}/check-token`, httpOptions).toPromise();
  }

  // async userLogin(email: string, password: string) {
  //    
  //     const body = {
  //       email: email,
  //       password: password
  //     }
  //     return this.httpClient.post<object>(`${this.apiPath}/${this.createUser}/`, body)
  //   
  // }


  async userLogin(email: string, password: string): Promise<{ success: boolean }> {
    try {
      const res: any = await this.httpClient.post<Object>(`${this.apiPath}/${this.createUser}`, {
        email,
        password
      }).toPromise();

      if (res.data && res.data.token) {

        this.authenticated = true;

        this.cacheService.setCache('token', res.data);

        return of({ success: true, res }).toPromise();
      } else {

        return of({ success: false, ...res }).toPromise();
      }

    } catch (e) {
      return of({ success: false }).toPromise();
    }

  }

}
