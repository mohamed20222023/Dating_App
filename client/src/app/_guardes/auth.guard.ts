import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private accounService:AccountService , private toaster:ToastrService) { }

  canActivate(): Observable<boolean>{
    return this.accounService.currentUser$.pipe(
      map(user => {
        if(user) return true;
        else{
          this.toaster.error("You shall not pass !");
          return false;
        }
      })
    )
  }
  
}
