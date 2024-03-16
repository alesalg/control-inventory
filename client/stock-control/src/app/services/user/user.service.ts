import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { UserRegistrationRequest, UserRegistrationResponse } from '../../models/interfaces/users/userRegistration.models';
import { Observable } from 'rxjs';
import { UserAuthRequest, UserAuthResponse } from '../../models/interfaces/users/authUser.models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environments.API_URL

  constructor(private http: HttpClient, private cookie: CookieService) {  }

  userResgistration(requestDatas: UserRegistrationRequest): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(`${this.API_URL}/user`, requestDatas)
  }
  
  authUser(requestDatas: UserAuthRequest): Observable<UserAuthResponse>{
    return this.http.post<UserAuthResponse>(`${this.API_URL}/auth`, requestDatas)

  }

  isLoginIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO')
    return JWT_TOKEN ? true : false
  }
}
