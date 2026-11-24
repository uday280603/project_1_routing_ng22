import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ILogin, IsignUp } from '../model/Ilogin';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _http = inject(HttpClient);
  _cookie = inject(CookieService);

  isLogInUser = signal(this._cookie.check('token'));
  AUTH_URL = environment.AUTH_URL;

  loginUser(user: ILogin) {
    const LOGIN_URL = `${this.AUTH_URL}/api/auth/login`;
    return this._http.post(LOGIN_URL, user);
  }

  signInUser(user : IsignUp){
    const SIGN_URL = `${this.AUTH_URL}/api/auth/register`;
    return this._http.post(SIGN_URL,user);
  }

  saveToken(token: string) {
    this._cookie.set('token', token);
    this.isLogInUser.set(true);
  }

  saveUserRole(userRole: string) {
    this._cookie.set('userRole', userRole);
  }

  getToken() {
    return this._cookie.get('token');
  }

  getUserRole(){
    return this._cookie.get('userRole');
  }
  logout() {
    this._cookie.delete('token');
    this._cookie.delete('userRole');
    this.isLogInUser.set(false);
  }
}