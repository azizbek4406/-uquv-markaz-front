import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guruh } from '../model/guruh';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class GuruhService {
  private api = environment.baseApi + "/api/guruh";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page<Guruh>>{
    return this.http.get<Page<Guruh>>(this.api, {params: params})
  }
  // getAllByActive(value: any): Observable<Page<Guruh>>  {
  //   return this.http.get<Page<Guruh>>(this.api + "/active/" + value)
  // }
  getAllByOqituvchiId(id: any) {
    return this.http.get<Page<Guruh>>(this.api + "/tech/" + id)
  }
  create(guruh: Guruh): Observable<any>{
    return this.http.post<Guruh>(this.api, guruh);
  }
  update(guruh: Guruh): Observable<any>{
    return this.http.put<Guruh>(this.api, guruh);
  }
  deleteByid(guruhId: number): Observable<any>{
    return this.http.delete<Guruh>(this.api + "/" + guruhId);
  }
}
