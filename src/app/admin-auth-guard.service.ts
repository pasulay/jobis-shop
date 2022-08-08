import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService:UserService) { }

  // canActivate(){
    
  //    this.auth.user$.pipe(switchMap(user =>{
  //     // user: is the user object that firebase gives us.
  //     // NOTE: we need to differentiate the one we created and the one firebase gives us
  //     // it does not have the isAdmin property

  //     // we need to get this firebase user object, and then read th actual application user object
  //     // from our db

  //    return this.userService.get(user.uid);
      

  //   }))
  //   .subscribe(x => console.log(x))

   
  // }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
   .pipe(map(appUser=> appUser.isAdmin));
  }

}
