import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oqituvchi } from '../model/oqituvchi';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class OqituvchiService {
  private api = environment.baseApi + "/api/oqituvchi";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page<Oqituvchi>>{
    return this.http.get<Page<Oqituvchi>>(this.api, {params: params})
  }
  create(oqituvchi: Oqituvchi): Observable<any>{
    return this.http.post<Oqituvchi>(this.api, oqituvchi);
  }
  update(oqituvchi: Oqituvchi): Observable<any>{
    return this.http.put<Oqituvchi>(this.api, oqituvchi);
  }
  deleteByid(oqituvchiId: number): Observable<any>{
    return this.http.delete<Oqituvchi>(this.api + "/" + oqituvchiId);
  }
}
