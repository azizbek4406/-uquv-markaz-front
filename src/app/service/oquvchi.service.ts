import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guruh } from '../model/guruh';
import { Oquvchi } from '../model/oquvchi';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class OquvchiService {
  private api = environment.baseApi + "/api/oquvchi";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page<Oquvchi>>{
    return this.http.get<Page<Oquvchi>>(this.api, {params: params})
  }

  // getAllByActive(value: any): Observable<Page<Oquvchi>>  {
  //   return this.http.get<Page<Oquvchi>>(this.api + "/active/" + value)
  // }
  
  getAllByGuruxId(id: any): Observable<Page<Oquvchi>> {
    return this.http.get<Page<Oquvchi>>(this.api + "/gr/" + id)
  } 

  updateMoney(): Observable<Oquvchi> {
    return this.http.get<Oquvchi>(this.api + "/update");
  }
  create(oquvchi: Oquvchi): Observable<Oquvchi>{
    return this.http.post<Oquvchi>(this.api, oquvchi);
  }
  update(oquvchi: Oquvchi): Observable<Oquvchi>{
    return this.http.put<Oquvchi>(this.api, oquvchi);
  }
  deleteByid(oquvchiId: number): Observable<any>{
    return this.http.delete<Oquvchi>(this.api + "/" + oquvchiId);
  }
}
