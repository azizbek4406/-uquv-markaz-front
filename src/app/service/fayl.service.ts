import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaylService {

  baseApi = environment.baseApi + "/api/fayl"
  constructor(private http: HttpClient) { }


  upload(file: File){
    let formData = new FormData();
    formData.append("fayl", file, file.name);
    return this.http.post(this.baseApi + "/upload", formData);
  }
}
