import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class JwtUtilService {

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token)
  }

  clearToken() {
    sessionStorage.removeItem('token')
  }

  getInfo() {
    try {
      let info: any = jwt_decode(this.getToken() ?? '')
      if (info) {
        return {
          username: info.sub,
          role: info.role
        }
      }

    } catch (e: any) {

    }
    return null
  }


}
