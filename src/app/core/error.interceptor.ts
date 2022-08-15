import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, throwError } from "rxjs";
import { JwtUtilService } from "./jwt-util.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private snakBar: MatSnackBar, private jwtUtil: JwtUtilService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = req.headers;

        let token = this.jwtUtil.getToken();
        if(token)
          headers = headers.append('Authorization', 'Bearer '+token);
        req = req.clone({headers});


        return next.handle(req);
    }

    
    
}