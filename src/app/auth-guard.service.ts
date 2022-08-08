import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // RouterStateSnapshot: we can get the url that the user tried to access when this authGuard kicks in
  canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.pipe(map(user =>{
      if(user) return true;

      this.router.navigate(['/login'], {queryParams:{ returnUrl: state.url}});
      return false;

    }))
  }
}
