import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtUtilService } from '../core/jwt-util.service';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class AuthoService {
  api = environment.baseApi + "/api/account"
  constructor(private http: HttpClient, private jwtUtil: JwtUtilService) { }


  signin(loginParol: any): Observable<any>{
    return this.http.post(this.api+"/signin", loginParol).pipe(
      map((data: any)=>{
          this.jwtUtil.setToken(data.token);
          return this.jwtUtil.getInfo();
      })
    )
  }

  getAll(): Observable<Page<any>> {
    return this.http.get<Page<any>>(this.api)
  }

  update(value: any): Observable<any>{
    return this.http.put<any>(this.api, value);
  }
}
