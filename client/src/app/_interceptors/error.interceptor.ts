import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router , private toaster:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error){
          switch(error.status){
            case 400 : 
            if(error.error.errors){
              const modelStateError = [];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelStateError.push(error.error.errors[key])
                }
              }
              throw modelStateError.flat();
            } else {
              this.toaster.error(error.error , error.status.toString())
            }
              break;

            case 401 : 
            this.toaster.error("Unautharized", error.status.toString());
              break;

            case 404 :
              this.router.navigateByUrl("/not-found");
              break;

            case 500 : 
            const NavigationEtras:NavigationExtras = {state : {error : error.error}};
            this.router.navigateByUrl("/server-error" ,NavigationEtras);
              break;

            default:
              this.toaster.error("Something unexpected went wrong ");
              console.log(error);
              break;

          }
        }
        throw error;
      })
    )
  }
}
