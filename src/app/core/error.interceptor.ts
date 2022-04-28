import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private snakBar: MatSnackBar){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(e => {
                let msg = `Xatolik ro'y berdi`
                if(e && e.error && e.error.error){
                    msg = e.error.error;
                } 
                this.snakBar.open(msg, 'Ok');
                return throwError(e);
        }))
    }
    
}