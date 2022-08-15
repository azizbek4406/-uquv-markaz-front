import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { Tulov } from '../model/tulov';

@Injectable({
  providedIn: 'root'
})
export class TulovService {
  private api = environment.baseApi + "/api/tulov"
  constructor(
    private http: HttpClient
  ) { }

  getAll(params: any): Observable<Page<Tulov>> {
    return this.http.get<Page<Tulov>>(this.api, {params: params})
  }

  create(tulov: Tulov): Observable<Tulov>{
    return this.http.post<Tulov>(this.api, tulov);
  }
  update(tulov: Tulov): Observable<Tulov>{
    return this.http.put<Tulov>(this.api, tulov);
  }
  // deleteByid(tulovID: number): Observable<any>{
  //   return this.http.delete<Tulov>(this.api + "/" + tulovID);
  // }


}

