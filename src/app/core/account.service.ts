import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtUtilService } from './jwt-util.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private api = environment.baseApi + "/api/account";
  private currentUser: any = null;

  constructor(private http: HttpClient, private jwtUtil: JwtUtilService,
    private router: Router) { }

  hasRole(role: string){
    let info = this.jwtUtil.getInfo();
    return this.isAuthinticated() && !!info && info.role == role;
  }


  isAuthinticated() {
    return this.currentUser != null;
  }

  identity(force?: boolean): Observable<any> {
    if(this.jwtUtil.getToken()){
      let req = this.http.get(this.api + "/current").pipe(
      map(user => {
        if (user) {
          this.currentUser = user;
        }
        return user;
      })
    )
    if (force) {
      return req;
    } else {
      return req.pipe(
        shareReplay(1)
      );
    }
    }
    return of(null);
  }

  logout() {
    this.currentUser = null;
    this.jwtUtil.clearToken();
    this.router.navigate(['/'])
  }
}
